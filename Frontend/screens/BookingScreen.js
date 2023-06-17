import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import tailwind from "twrnc";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import { getPriceAPI } from "../api/roomType";
import { createBookingAPI } from "../api/booking";
import { getFormatedDate } from "react-native-modern-datepicker";
const BookingScreen = ({ route }) => {
  const navigator = useNavigation();
  let { hotel, startDate, endDate, roomType } = route.params;
  const [numberOfRentalDay, setNumberOfRentalDay] = useState(-1);
  const [amount, setAmount] = useState(-1);
  const [price, setPrice] = useState(-1);
  startDate = startDate.replace("/", "-");
  startDate = startDate.replace("/", "-");
  endDate = endDate.replace("/", "-");
  endDate = endDate.replace("/", "-");
  const calculateNumberOfRentalDay = (startDate, endDate) => {
    console.log(startDate, endDate);
    let start, end;
    if (startDate.includes("-")) {
      start = startDate.split("-");
      end = endDate.split("-");
    } else {
      start = startDate.split("/");
      end = endDate.split("/");
    }
    return parseInt(end[end.length - 1]) - parseInt(start[start.length - 1]);
  };
  const getPrice = async (roomType_id, hotel_id) => {
    try {
      const data = { roomType_id: roomType_id, hotel_id: hotel_id };
      const response = await getPriceAPI(data);
      if (response.success) {
        return response.price;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const calculateAmount = async (numberOfRentalDay, price) => {
    return numberOfRentalDay * price;
  };
  const createBooking = async (
    start_day,
    end_day,
    amount,
    hotel_id,
    roomType_id
  ) => {
    try {
      const data = {
        start_day: start_day,
        end_day: end_day,
        amount: amount,
        hotel_id: hotel_id,
        roomType_id: roomType_id,
      };
      const response = await createBookingAPI(data);
      if (response.success) {
        console.log(response);
        return response.newBooking;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const begin = async () => {
      const numberOfRentalDay = calculateNumberOfRentalDay(startDate, endDate);
      console.log(numberOfRentalDay);
      setNumberOfRentalDay(numberOfRentalDay);
      const price = await getPrice(roomType._id, hotel._id);
      setPrice(price);
      const amount = await calculateAmount(numberOfRentalDay, price);
      setAmount(amount);
    };
    begin().catch(console.error);
  }, []);
  return (
    <ScrollView style={tailwind`mr-3 ml-3`}>
      <View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            Thông tin đặt phòng
          </Text>
        </View>

        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: hotel.url_picture }}
          />

          <View style={styles.textContainer}>
            <Text style={styles.text_hotel_name}>{hotel.name}</Text>
            <Text style={styles.text_roomType_name}>{roomType.name}</Text>
            <Text style={styles.text_address}>{hotel.address}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../assets/check_in_image.png")}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text_hotel_name}>Nhận phòng</Text>
            <Text style={styles.text_time}>
              Từ 12:00 - 14:00{" "}
              {getFormatedDate(startDate, "DD-MM-YYYY")}
            </Text>
            <Text style={styles.text_hotel_name}>Trả Phòng</Text>
            <Text style={styles.text_time}>
              Trước 12:00 {getFormatedDate(endDate, "DD-MM-YYYY")}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Thông tin thanh toán
          </Text>
        </View>
        <View style={styles.container_payment}>
          <View style={styles.container_1}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Icon name="calendar-today" size={35} style={styles.icon} />
              <Text style={{ paddingLeft: 5, paddingTop: 5, fontSize: 20 }}>
                Số ngày thuê
              </Text>
            </View>
            <View>
              <Text style={styles.text_payment}>{numberOfRentalDay} ngày</Text>
            </View>
          </View>
          <View style={styles.container_1}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Icon name="money" size={35} style={styles.icon} />
              <Text style={{ paddingLeft: 5, paddingTop: 5, fontSize: 20 }}>
                Tiền phòng mỗi ngày
              </Text>
            </View>
            <View>
              <Text style={styles.text_payment}>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Text>
            </View>
          </View>
          <View style={styles.container_1}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Icon name="attach-money" size={35} style={styles.icon} />
              <Text style={{ paddingLeft: 5, paddingTop: 5, fontSize: 20 }}>
                Tổng tiền phòng
              </Text>
            </View>
            <View>
              <Text style={styles.text_payment}>{amount.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          onPress={() => {
            createBooking(
              startDate,
              endDate,
              amount,
              hotel._id,
              roomType._id
            ).then(() => {
              navigator.navigate("Navigation");
            });
          }}
        >
          <Text
            style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
          >
            Xác nhận
          </Text>
        </TouchableOpacity>
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
    height: 200,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "center",
  },

  container_payment: {
    width: "100%",
    height: 150,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  container_1: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    borderRadius: 15,
    resizeMode: "cover",
    width: "40%",
    height: "90%",
  },

  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
  },
  icon: {
    paddingLeft: 10,
  },
  text_hotel_name: {
    fontSize: 18,
  },
  text_payment: {
    fontSize: 18,
    fontWeight: "bold",
    paddingRight: 20,
    paddingTop: 5,
  },
  text_roomType_name: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
  },
  text_time: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
  },
  text_address: {
    fontSize: 13,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  btn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
});
export default BookingScreen;
