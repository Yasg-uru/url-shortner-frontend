import axios from "axios";
 const axiosInstance = axios.create({
    baseURL:'https://url-shortner-aeg8.onrender.com'
    // baseURL:'http://localhost:8000'
    
});
export default axiosInstance;

