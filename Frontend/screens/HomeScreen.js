import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  LogBox,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, SearchBar, Text } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { YellowBox } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { findTopHotelsAPI, getNearHotelsAPI, getSuggestedHotelsAPI } from "../api/hotel";
import { SafeAreaView } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { getCityByCoordinates } from "../api/location";
const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;
const HomeScreen = () => {
  const navigator = useNavigation();
  const [value, setValue] = useState("");
  const [location, setLocation] = useState();
  const [nearHotels, setNearHotels] = useState([]);
  const [topHotels, setTopHotels] = useState([]);
  const [text, setText] = useState("aaa");
  const [suggestedHotels, setSuggestedHotels] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const getNearHotel = async (city) => {
    try {
      const response = await getNearHotelsAPI(city);
      if (response.success) {
        setNearHotels(response.listHotel);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async (text) => {
    try {
      setValue(text);
      if (text != "") {
        const response = await getSuggestedHotelsAPI(text);
        if (response.success) {
          setSuggestedHotels(response.listHotel.slice(0, 7));
        }
      } else {
        setSuggestedHotels([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: "#ecebed" }}>
        <Button
          title={item.name}
          type="outline"
          buttonStyle={{
            backgroundColor: "rgba(111, 202, 186, 1)",
            borderRadius: 5,
          }}
          titleStyle={{ fontSize: 20, color: "white" }}
          containerStyle={{ marginVertical: 5 }}
          onPress={() => {
            setValue("");
            setSuggestedHotels([]);
            navigator.navigate("DetailHotelScreen", {
              hotel: item,
            });
          }}
          style={{ padding: 10, backgroundColor: COLORS.primary }}
        />
      </View>
    );
  };
  const renderSuggestedHotels = () => {
    if (suggestedHotels.length > 0) {
      return (
        <View>
          <FlatList
            style={{ color: "black" }}
            data={suggestedHotels}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
        </View>
      );
    } else {
      return null;
    }
  };
  const getCityLocation = async (lat, lon) => {
    try {
      const response = await getCityByCoordinates(lat, lon);
      return response[0].local_names.gl.split("-")[1].trim();
    } catch (error) {
      console.log(error);
    }
  };
  const findTopHotels = async () => {
    try {
      const response = await findTopHotelsAPI();
      if(response.success) {
        setTopHotels(response.listHotel);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      const city = await getCityLocation(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      await getNearHotel(city);
      await findTopHotels();
    };
    getPermissions();
    
  }, []);
  const TopHotelCard = ({ hotel }) => {
    return (
      <TouchableOpacity
      key={hotel._id}
        style={style.topHotelCard}
        onPress={() => {
          navigator.navigate("DetailHotelScreen", {
            hotel: hotel,
          });
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: "row",
          }}
        >
          <Icon name="star" size={20} color={COLORS.orange} />
          <Text
            style={{ color: COLORS.white, fontWeight: "bold", fontSize: 20 }}
          >
            {hotel.rating}
          </Text>
        </View>
        <Image
          style={style.topHotelCardImage}
          source={{
            uri: hotel.url_picture,
          }}
        />
        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{hotel.name}</Text>
          <Text
            style={{ fontSize: 10, fontWeight: "bold", color: COLORS.grey }}
          >
            {hotel.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView>
      <View style={style.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            Tìm kiếm khách sạn
          </Text>
        </View>
      </View>
      <View style={{ flex: showResults ? 1.4 : 0.2 }}>
        <SearchBar
          placeholder="Nhập tên khách sạn muốn tìm kiếm"
          onChangeText={handleSearch}
          value={value}
          platform="ios"
          containerStyle={{
            backgroundColor: "#fff",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          inputContainerStyle={{
            backgroundColor: "#f2f2f2",
            borderRadius: 10,
            height: 40,
          }}
          inputStyle={{ fontSize: 16 }}
          onClear={() => {
            setSuggestedHotels([]);
            setShowResults(false);
          }}
          onFocus={() => {
            setShowResults(true);
          }}
          onCancel={() => {
            setShowResults(false);
          }}
        />
        {showResults && renderSuggestedHotels()}
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontWeight: "bold", color: COLORS.dark, fontSize: 20 }}
          >
            Khách sạn gần bạn
          </Text>
        </View>
        <View>
          <FlatList
            data={nearHotels}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 20,
              paddingBottom: 30,
            }}
            renderItem={({ item }) => <TopHotelCard hotel={item} />}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontWeight: "bold", color: COLORS.dark, fontSize: 20 }}
          >
            Top 3 khách sạn được đánh giá cao nhất
          </Text>
        </View>
        <View>
          <FlatList
            data={topHotels}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 20,
              paddingBottom: 30,
            }}
            renderItem={({ item }) => <TopHotelCard hotel={item} />}
          />
        </View>
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
const style = StyleSheet.create({
  header: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: "absolute",
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    height: 300,
    width: 350,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 250,
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    resizeMode: "cover",
  },
});
export default HomeScreen;
