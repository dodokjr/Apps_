import axios from "axios";


const axiosJwt = axios.create()


axiosJwt.interceptors.request.use(async (config) =>
{
    {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime())
        {
            const response = await axios.get('http://localhost:3100/token', { withCredentials: true })
            config.headers.Authorization = `Barer  ${response.data.accesstToken}`;
            setToken(response.data.accesstToken)
            const decode = jwtDecode(response.data.accesstToken)
            setName(decode.name)
            setExpire(decode.exp)
        }
        return config;
    } (error) =>
    {
        return Promises.reject(error);
    }
})

