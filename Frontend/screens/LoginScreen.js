import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import tailwind from "twrnc";
import { loginAPI } from "../api/auth";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
const LoginScreen = () => {
  const [dataInput, setDataInput] = useState({ email: "", password: "" });
  const navigator = useNavigation();
  const handleLogin = async () => {
    try {
      const response = await loginAPI(dataInput);
      if (response.success) {
        await SecureStore.setItemAsync("token", response.token);
        await SecureStore.setItemAsync(
          "userFirstName",
          response.user.firstName
        );
        await SecureStore.setItemAsync("userLastName", response.user.lastName);
        await SecureStore.setItemAsync("userEmail", response.user.email);
        navigator.navigate("Navigation");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={tailwind`flex-1 items-center justify-center bg-slate-50`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <Text style={tailwind`text-5xl font-bold mb-6 text-slate-900`}>
          Login
        </Text>

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter email address"
          onChange={(e) => {
            setDataInput({ ...dataInput, email: e.nativeEvent.text });
          }}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter password"
          secureTextEntry={true}
          onChange={(e) => {
            setDataInput({ ...dataInput, password: e.nativeEvent.text });
          }}
        />
        <Pressable
          style={tailwind`h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-6 mb-5`}
          onPress={handleLogin}
        >
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-medium`}>
              Login
            </Text>
          </View>
        </Pressable>
        
      </View>
    </View>
  );
};

export default LoginScreen;
