import axios from "axios";

const api = axios.create({
    baseURL: "http://52.67.200.227:5000",
});

export default api;
