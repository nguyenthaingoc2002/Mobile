import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import tailwind from "twrnc";
import { getAllCityAPI } from "../api/city";
import { getDistrictByCityAPI } from "../api/district";
import { useNavigation } from "@react-navigation/native";
const SelectLocationScreen = () => {
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const navigator = useNavigation();
  const getAllCity = async () => {
    try {
      const response = await getAllCityAPI();
      if (response.success) {
        setListCity(response.listCity);
      }
      return response.listCity
    } catch (error) {
      console.log(error);
    }
  };
  const getDistrictByCity = async (city_id) => {
    try {
      const response = await getDistrictByCityAPI(city_id);
      if (response.success) {
        setListDistrict(response.listDistrict);
      }
    } catch (error) {
      console.log("getDistrictByCity");
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCity().then((data) => {
      getDistrictByCity(data[0]._id);
    });
  }, []);
  return (
    <View style={tailwind`flex flex-col`}>
      <View style={tailwind`mt-10 mb-10 w-full`}>
        <Text style={tailwind`text-center font-black text-xl`}>
          Vui lòng chọn khu vực
        </Text>
      </View>

      <View style={tailwind`flex flex-row w-full`}>
        <ScrollView style={tailwind`w-1/3`}>
          {listCity.map((city) => {
            return (
              <Pressable
                key={city._id}
                style={tailwind`bg-white py-3 px-4 rounded-l-md border-r border-t border-b border-slate-200 `}
                onPress={() => {
                  getDistrictByCity(city._id);
                }}
              >
                <Text style={tailwind`font-medium text-black`}>
                  {city.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView style={tailwind`w-2/3`}>
          {listDistrict.map((district) => {
            return (
              <Pressable
                key={district._id}
                style={tailwind`bg-slate-900 py-3 px-4 rounded-l-md border-r border-t border-b border-slate-200`}
                onPress={() => {
                  navigator.navigate("ListHotelScreen", {district_id: district._id, city_id: district.city_id});
                }}
              >
                <Text style={tailwind`text-white font-medium`}>
                  {district.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectLocationScreen;
