import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getHotelByCityAndDistrictAPI } from "../api/hotel";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
const ListHotelScreen = ({ route }) => {
  const navigator = useNavigation();
  const { district_id, city_id } = route.params;
  const [listHotel, setListHotel] = useState([]);
  const getHotelByCityAndDistrict = async (city_id, district_id) => {
    try {
      const response = await getHotelByCityAndDistrictAPI(city_id, district_id);
      if (response.success) {
        setListHotel(response.listHotel);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHotelByCityAndDistrict(city_id, district_id);
  }, []);
  return (
    <View>
      <View style={tailwind`w-full`}>
        {listHotel.map((hotel) => {
          return (
            <TouchableOpacity
              style={tailwind`mr-3 ml-3`}
              key={hotel._id}
              onPress={() =>
                navigator.navigate("DetailHotelScreen", {
                  hotel: hotel,
                })
              }
            >
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={{
                    uri: hotel.url_picture,
                  }}
                />

                <View style={styles.textContainer}>
                  <Text style={styles.text_name}>{hotel.name}</Text>
                  <Text style={styles.text_address}>{hotel.address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
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
    alignItems: "center",
    justifyContent: "center",
  },

  text_name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  text_address: {
    fontWeight: "bold",
    fontSize: 13,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
});
export default ListHotelScreen;
