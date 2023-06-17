import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
const DetailsScreen = ({ route }) => {
  const navigator = useNavigation();

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY-MM-DD"
  );
  const endDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY-MM-DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [startedDate, setStartedDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [endedDate, setEndedDate] = useState(endDate);

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }
  function handleChangeEndDate(propDate) {
    setEndedDate(propDate);
  }
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  const handleOnPressEndDate = () => {
    setOpenEndDatePicker(!openEndDatePicker);
  };

  const { hotel } = route.params;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}
    >
      <ImageBackground
        style={style.headerImage}
        source={{
          uri: hotel.url_picture,
        }}
      >
        <View style={style.header}>
          <Icon
            name="arrow-back"
            size={28}
            color={COLORS.white}
            onPress={() => {
              navigator.goBack();
            }}
          />
        </View>
      </ImageBackground>
      <View>
        <View style={style.iconContainer}>
          <Icon name="place" color={COLORS.white} size={28} />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{hotel.name}</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: COLORS.grey,
              marginTop: 5,
            }}
          >
            {hotel.address}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="star" size={20} color={COLORS.orange} />
              </View>
              <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}>
                {hotel.rating}
              </Text>
            </View>
            <Text style={{ fontSize: 13, color: COLORS.grey }}>{hotel.numberRating} reviews</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ lineHeight: 20, color: COLORS.grey }}>
              {hotel.description}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "column",
            paddingLeft: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tiện nghi</Text>
          {hotel.facilities.map((facilities) => {
            return (
              <View
                style={{ flexDirection: "row", fontSize: 10 }}
                key={facilities._id}
              >
                <Text>{"\u2022"}</Text>
                <Text style={{ marginLeft: 10 }}>{facilities.name}</Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Giá qua đêm</Text>
          <View style={style.priceTag}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: COLORS.grey,
                marginLeft: 5,
              }}
            >
              {hotel.price_min.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
              ~
              {hotel.price_max.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: COLORS.grey,
                marginLeft: 5,
              }}
            ></Text>
          </View>
        </View>
        <View style={style.container_two_buttons}>
          <TouchableOpacity
            style={style.two_button}
            onPress={handleOnPressStartDate}
          >
            <Text
              style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
            >
              {selectedStartDate}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.two_button}
            onPress={handleOnPressEndDate}
          >
            <Text
              style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
            >
              {selectedEndDate}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.btn}>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("ListRoomTypeScreen", {
                hotel: hotel,
                startDate: selectedStartDate,
                endDate: selectedEndDate,
              });
            }}
          >
            <Text
              style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
            >
              Chọn phòng
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              //current={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => {
                setSelectedStartDate(date);
              }}
              options={{
                backgroundColor: "#080516",
                textHeaderColor: "#469ab6",
                textDefaultColor: "#FFFFFF",
                selectedTextColor: "#FFF",
                mainColor: "#469ab6",
                textSecondaryColor: "#FFFFFF",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openEndDatePicker}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <DatePicker
              mode="calendar"
              minimumDate={endDate}
              selected={endedDate}
              onDateChanged={handleChangeEndDate}
              onSelectedChange={(date) => {
                setSelectedEndDate(date);
              }}
              options={{
                backgroundColor: "#080516",
                textHeaderColor: "#469ab6",
                textDefaultColor: "#FFFFFF",
                selectedTextColor: "#FFF",
                mainColor: "#469ab6",
                textSecondaryColor: "#FFFFFF",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
            />

            <TouchableOpacity onPress={handleOnPressEndDate}>
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
const style = StyleSheet.create({
  container_two_buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  two_button: {
    backgroundColor: "green",
    width: "50%",
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: "center",
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
  },
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: "hidden",
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DetailsScreen;
