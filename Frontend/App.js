import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-web";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Navigation from "./screens/Navigation";
import SelectLocationScreen from "./screens/SelectLocationScreen";
import ListHotelScreen from "./screens/ListHotelScreen";
import DetailHotelScreen from "./screens/DetailHotelScreen";
import ListRoomTypeScreen from "./screens/ListRoomTypeScreen";
import BookingScreen from "./screens/BookingScreen";
import DetailBookingScreen from "./screens/DetailBookingScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        <Stack.Screen
            name="Navigation"
            component={Navigation}
            options={{ headerShown: false }}
          />
          
          

          <Stack.Screen
            name="SelectLocationScreen"
            component={SelectLocationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ListHotelScreen"
            component={ListHotelScreen}
            options={{
              title: "Danh sách khách sạn",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="DetailHotelScreen"
            component={DetailHotelScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Signup"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ListRoomTypeScreen"
            component={ListRoomTypeScreen}
            options={{
              title: "Danh sách phòng",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="BookingScreen"
            component={BookingScreen}
            options={{
              title: "Xác nhận đặt phòng",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="DetailBookingScreen"
            component={DetailBookingScreen}
            options={{
              title: "Thông tin đặt phòng",
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
