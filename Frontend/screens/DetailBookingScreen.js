import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SliderComponent,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import tailwind from "twrnc";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFormatedDate } from "react-native-modern-datepicker";
import { cancelBookingAPI, createBookingAPI } from "../api/booking";
import Slider from "@react-native-community/slider";
import { Input } from "react-native-elements";
import { createRatingAPI, findRatingAPI } from "../api/rating";
const DetailBookingScreen = ({ route }) => {
  const { booking } = route.params;
  const navigator = useNavigation();
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [ratingNumber, setRatingNumber] = useState(1);
  const [rating, setRating] = useState(null);
  const [ratingText, setRatingText] = useState("");
  const [canCancel, setCanCancel] = useState(null);
  const [arrayStar, setArrayStar] = useState([]);
  const checkCanCancel = () => {
    var dateNow = new Date().getDate(); //Current Date
    var monthNow = new Date().getMonth() + 1; //Current Month
    var yearNow = new Date().getFullYear(); //Current Year
    var date = parseInt(getFormatedDate(booking.start_day, "DD"));
    var month = parseInt(getFormatedDate(booking.start_day, "MM"));
    var year = parseInt(getFormatedDate(booking.start_day, "YYYY"));
    if (
      yearNow > year ||
      (yearNow == year && monthNow > month) ||
      (yearNow == year && monthNow == month && dateNow > date)
    ) {
      setCanCancel(true);
    } else setCanCancel(false);
  };
  const cancelBooking = async (booking_id) => {
    try {
      const response = await cancelBookingAPI(booking_id);
      if (response.success) {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createRating = async (rating_score, comment, booking_id) => {
    try {
      const data = {
        rating_score: rating_score,
        comment: comment,
        booking_id: booking_id,
      };
      console.log(data);
      const response = await createRatingAPI(data);
      if (response.success) {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const findRating = async (booking_id) => {
    try {
      const response = await findRatingAPI(booking_id);
      if (response.success) {
        setRating(response.rating);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const prepare = async () => {
      checkCanCancel();
      await findRating(booking._id);
    };
    prepare();
  }, []);
  return (
    <ScrollView style={tailwind`mr-3 ml-3`}>
      <View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Thông tin đặt phòng
          </Text>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: booking.room_id.hotel_id.url_picture }}
          />

          <View style={styles.textContainer}>
            <Text style={styles.text_hotel_name}>
              {booking.room_id.hotel_id.name}
            </Text>
            <Text style={styles.text_roomType_name}>
              {booking.room_id.roomType_id.name}
            </Text>
            <Text style={styles.text_roomType_name}>
              {booking.room_id.name}
            </Text>
            <Text style={styles.text_address}>
              {booking.room_id.hotel_id.address}
            </Text>
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
              {getFormatedDate(booking.start_day, "DD-MM-YYYY")}
            </Text>
            <Text style={styles.text_hotel_name}>Trả Phòng</Text>
            <Text style={styles.text_time}>
              Trước 12:00 {getFormatedDate(booking.end_day, "DD-MM-YYYY")}
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
              <Icon name="attach-money" size={35} style={styles.icon} />
              <Text style={{ paddingLeft: 5, paddingTop: 5, fontSize: 20 }}>
                Tổng tiền phòng
              </Text>
            </View>
            <View>
              <Text style={styles.text_payment}>
                {booking.amount.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
            </View>
          </View>
        </View>
      </View>

      

      {!booking.isCancel && !canCancel && (
        <View style={styles.btn_cancel}>
          <TouchableOpacity
            onPress={() => {
              setOpenCancelModal(true);
            }}
          >
            <Text
              style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
            >
              Hủy đặt phòng
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {booking.isCancel && (
        <View style={styles.btn_IScancel}>
          <TouchableOpacity>
            <Text
              style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
            >
              Đã hủy đặt phòng
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {booking.isRating && (
        <View style={styles.btn_IScancel}>
          <TouchableOpacity>
            <Text
              style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
            >
              Đã đánh giá
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {!booking.isRating && canCancel && (
        <View style={styles.btn_review}>
          <TouchableOpacity
            onPress={() => {
              setOpenRatingModal(true);
            }}
          >
            <Text
              style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
            >
              Đánh giá
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={openCancelModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={{ fontSize: 15 }}>
                Bạn có chắc chắn muốn hủy phòng không?
              </Text>
            </View>
            <View style={styles.group_button}>
              <TouchableOpacity
                style={styles.btn_modal}
                onPress={() => {
                  cancelBooking(booking._id);
                  navigator.navigate("Navigation", { screen: "Trang Chủ" });
                }}
              >
                <Text style={{ color: "white" }}>Chấp nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn_modal}
                onPress={() => {
                  setOpenCancelModal(false);
                }}
              >
                <Text style={{ color: "white" }}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={openRatingModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={{ fontSize: 15 }}>
                Bạn hãy đánh giá trải nghiệm của mình
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 23 }}>{ratingNumber}</Text>
              <Icon name="star" color={COLORS.orange} size={28} />
            </View>
            <Slider
              minimumValue={1}
              maximumValue={5}
              style={{ width: 300, height: 100 }}
              value={ratingNumber}
              step={1}
              onValueChange={(value) => {
                setRatingNumber(value);
              }}
            />
            <TextInput
              style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
              placeholderTextColor="#000"
              placeholder="Nhập bình luận của bạn"
              onChange={(e) => {
                setRatingText(e.nativeEvent.text);
              }}
            />
            <View style={styles.group_button}>
              <TouchableOpacity
                style={styles.btn_modal}
                onPress={() => {
                  createRating(ratingNumber, ratingText, booking._id);
                  navigator.navigate("Navigation", { screen: "Trang Chủ" });
                }}
              >
                <Text style={{ color: "white" }}>Chấp nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn_modal}
                onPress={() => {
                  setOpenRatingModal(false);
                }}
              >
                <Text style={{ color: "white" }}>Hủy</Text>
              </TouchableOpacity>
            </View>
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
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    height: 200,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "center",
  },

  container_payment: {
    width: "100%",
    height: 50,
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
    width: "48%",
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
    fontSize: 17,
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
  btn_cancel: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "red",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btn_IScancel: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: COLORS.grey,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btn_review: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btn_modal: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "black",
    marginHorizontal: 20,
    borderRadius: 10,
    width: 80,
  },
  centeredView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#C7C2C2",
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
  },
  group_button: {
    flexDirection: "row",
  },
});
export default DetailBookingScreen;
