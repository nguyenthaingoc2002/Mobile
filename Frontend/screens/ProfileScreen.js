import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default ProfileScreen = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const navigator = useNavigation();
  useEffect(() => {
    const prepare = async () => {
      setFirstName(await SecureStore.getItemAsync("userFirstName"));
      setLastName(await SecureStore.getItemAsync("userLastName"));
      setEmail(await SecureStore.getItemAsync("userEmail"));
    };
    prepare();
    console.log(firstName, lastName, email);
  }, []);
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
            }}
          />

          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.userInfo}>{email}</Text>
        </View>
      </View>

      <View style={styles.btn_review}>
        <TouchableOpacity onPress={() => {}}>
          <Text
            style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
          >
            Chỉnh sửa thông tin cá nhân
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btn_review}>
        <TouchableOpacity onPress={() => {}}>
          <Text
            style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
          >
            Thay đổi mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btn_logout}>
        <TouchableOpacity
          onPress={() => {
            navigator.navigate("Login");
          }}
        >
          <Text
            style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
          >
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const COLORS = {
  white: "#FFF",
  dark: "#000",
  primary: "#52c0b4",
  secondary: "#e0f4f1",
  light: "#f9f9f9",
  grey: "#908e8c",
  orange: "#f5a623",
};
const styles = StyleSheet.create({
  btn_review: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btn_logout: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#FF6347",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  header: {
    backgroundColor: COLORS.secondary,
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
  },
  body: {
    backgroundColor: COLORS.light,
    height: 500,
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
});
