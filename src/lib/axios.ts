import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/landing`,
    headers: {
        "Content-Type": "application/json",
        
        'Access-Control-Allow-Origin': 'true' // incorrect

    },
});

export default axiosInstance;
