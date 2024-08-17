import axios from "axios";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
};

// Get token from cookie
const token = getCookie("token");

// Configure can exchange cookie
axios.defaults.withCredentials = true;

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// Create instance Axios for global config
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
