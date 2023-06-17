import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getRoomTypeAPI } from "../api/roomType";
import tailwind from "twrnc";
import { calculateEmptyRoomAPI } from "../api/room";

const ListRoomTypeScreen = ({ route }) => {
  const navigator = useNavigation();
  const [listRoomType, setListRoomType] = useState([]);
  const { hotel, startDate, endDate } = route.params;
  const [numberEmptyRoom, setNumberEmptyRoom] = useState([]);
  const getListRoomType = async () => {
    try {
      const response = await getRoomTypeAPI();
      if (response.success) {
        setListRoomType(response.listRoomType);
      }
      return response.listRoomType;
    } catch (error) {
      console.log(error);
    }
  };
  const calculateEmptyRoom = async (data) => {
    try {
      const response = await calculateEmptyRoomAPI(data);
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addObjectToNumberEmptyRoom = (obj) => {
    setNumberEmptyRoom((current) => [...current, obj]);
  };
  const findNumberEmptyRoom = (roomType_id) => {
    for (const element of numberEmptyRoom) {
      if (element.roomType_id == roomType_id) return element.number;
    }
  };
  useEffect(() => {
    getListRoomType().then((listRoomType) => {
      for (const roomType of listRoomType) {
        const data = {
          hotel_id: hotel._id,
          roomType_id: roomType._id,
          start_day: startDate,
        };
        calculateEmptyRoom(data).then((result) => {
          addObjectToNumberEmptyRoom({
            roomType_id: roomType._id,
            number: result.numberEmptyRoom,
          });
        });
      }
    });
  }, []);
  return (
    <ScrollView>
      <View style={tailwind`w-full`}>
        {listRoomType.map((roomType) => {
          return (
            <View style={tailwind`mr-3 ml-3`} key={roomType._id}>
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={{ uri: roomType.url_picture }}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",

                    marginTop: 20,
                  }}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.text_name}>{roomType.name}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Icon name="person" size={20} />
                      <Text style={styles.text_detail}>
                        {roomType.number_person} người lớn
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Icon name="hotel" size={20} />
                      <Text style={styles.text_detail}>{roomType.bed}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Icon name="home" size={20} />
                      <Text style={styles.text_detail}>
                        {roomType.room_size} m2
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ flexDirection: "column", alignItems: "flex-end" }}
                  >
                    <View>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          navigator.navigate("BookingScreen", {
                            hotel: hotel,
                            startDate: startDate,
                            endDate: endDate,
                            roomType: roomType,
                          });
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                          }}
                        >
                          Đặt
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginRight: 15, marginTop: 10 }}>
                      <Text style={{ color: "red" }}>
                        Còn thừa {findNumberEmptyRoom(roomType._id)} phòng
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
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
  container: {
    width: "100%",
    height: 500,
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "70%",
  },

  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 15,
    width: "70%",
  },
  btn: {
    height: 55,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  text_name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  text_detail: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
});

export default ListRoomTypeScreen;
