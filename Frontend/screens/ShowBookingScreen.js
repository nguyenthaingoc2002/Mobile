import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllBookingAPI } from "../api/booking";
import tailwind from "twrnc";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getFormatedDate } from "react-native-modern-datepicker";
const ShowBookingScreen = () => {
    const navigator = useNavigation();
  const [listBooking, setListBooking] = useState([]);
  const isFocused = useIsFocused()
  const getAllBooking = async () => {
    try {
      const response = await getAllBookingAPI();
      if (response.success) {
        return response.listBooking.reverse();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const begin = async () => {
      const listBooking = await getAllBooking();
      setListBooking(listBooking);
    };
    begin().catch(console.error);
  }, [isFocused]);
  return (
    <ScrollView>
      <View style={tailwind`w-full`}>
        {listBooking.map((booking) => {
          return (
            <TouchableOpacity style={styles.container} key={booking._id} onPress={()=> {
                navigator.navigate("DetailBookingScreen", {booking: booking});
            }}>
              <Image
                style={styles.image}
                source={{
                  uri: booking.room_id.hotel_id.url_picture,
                }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text_hotel_name}>{booking.room_id.hotel_id.name}</Text>
                <Text style={styles.text_roomType_name}>{booking.room_id.roomType_id.name}</Text>
                <Text style={styles.text_address}>{getFormatedDate(booking.start_day, "DD-MM-YYYY")} ~ {getFormatedDate(booking.end_day, "DD-MM-YYYY")}</Text>
                <Text style={styles.text_address}>{booking.amount.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Text>
              </View>
            </TouchableOpacity>
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
      height: 150,
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
export default ShowBookingScreen;
