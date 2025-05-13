import ip from "@/ip";
import axios from "axios";

const api = axios.create({
  baseURL: `http://${ip}:5000`,
});

export default api;