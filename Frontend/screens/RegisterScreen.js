import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import tailwind from "twrnc";
import { registerAPI } from "../api/auth";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [dataInput, setDataInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigator = useNavigation();
  const handleRegister = async () => {
    try {
      const response = await registerAPI(dataInput);
      console.log(response);
      if (response.success) {
        navigator.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={tailwind`flex-1 items-center justify-center bg-slate-50`}>
      {error ? (
        <View
          style={tailwind`absolute top-8 w-full bg-red-400 mx-8 max-w-sm p-4 rounded-md`}
        >
          <Text style={tailwind`text-white font-bold`}>
            Email addresses don't match
          </Text>
        </View>
      ) : null}
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <Text style={tailwind`text-5xl font-bold mb-6 text-slate-900`}>
          Sign up
        </Text>

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter your first name"
          autoCapitalize="none"
          onChange={(e) => {
            setDataInput({ ...dataInput, firstName: e.nativeEvent.text });
          }}
        />
        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter your last name"
          autoCapitalize="none"
          onChange={(e) => {
            setDataInput({ ...dataInput, lastName: e.nativeEvent.text });
          }}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter email address"
          autoCapitalize="none"
          keyboardType="email-address"
          onChange={(e) => {
            setDataInput({ ...dataInput, email: e.nativeEvent.text });
          }}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          onChange={(e) => {
            setDataInput({ ...dataInput, password: e.nativeEvent.text });
          }}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#000"
          placeholder="Confirm password"
          secureTextEntry={!showPassword}
        />

        <View style={tailwind`flex-row items-center my-8`}>
          <Pressable
            style={tailwind`flex items-center justify-center bg-white border border-slate-200 h-6 w-6 rounded-sm mr-3`}
          >
            <View style={tailwind`bg-green-400 h-4 w-4 rounded-sm`} />
          </Pressable>
          <Text style={tailwind`text-slate-900`}>
            I've read and agree to the terms and conditions and the privacy
            policy
          </Text>
        </View>

        <Pressable
          style={tailwind`h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-6`}
          onPress={handleRegister}
        >
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-medium`}>
              Sign up
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
