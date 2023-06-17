import axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;
const url = `http://${manifest.debuggerHost.split(":").shift()}:3002/api`;

export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
