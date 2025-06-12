import axios from "axios";

const api = axios.create({
    // baseURL: "http://54.233.45.164:5000",
    baseURL: "http://localhost:5000",
});

export default api;
