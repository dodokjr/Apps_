import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

const instance = axios.create()
const cookie = new Cookies()

instance.interceptors.request.use(async (config) =>
{
    const exp = localStorage.getItem("usersExpToken")
    const currentDate = new Date();
    const refreshToken = cookie.get("refreshToken")
    const rt = localStorage.getItem("refreshToken")
    if (86400 * 1000 < currentDate.getTime())
    {
        const response = await axios.get('http://localhost:3100/v1/f/token', { headers: { "Authorization": `Barer ${rt}` } }, { withCredentials: true })
        localStorage.setItem("ctx.UsersAcessToken.true", response.data.acessToken)
        cookie.set("refreshToken", response.data.refreshToken)
    }
    return config;
}, (error) =>
{
    return Promises.reject(error);
})

export default instance;