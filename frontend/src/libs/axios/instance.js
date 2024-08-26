import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

const instance = axios.create()

instance.interceptors.request.use(async (config) =>
{
    const exp = localStorage.getItem("usersExpToken")
    const currentDate = new Date();
    if (exp * 1000 < currentDate.getTime())
    {
        const response = await axios.get('http://localhost:3100/token', { withCredentials: true })
        config.headers.Authorization = `Barer  ${response.data.data.accesstToken}`;
        localStorage.setItem("UsersRefreshToken", response.data.data.accesstToken)
        const decode = jwtDecode(response.data.data.accesstToken)
        localStorage.setItem("usersExpToken", decode.exp)
    }
    return config;
}, (error) =>
{
    return Promises.reject(error);
})

export default instance;