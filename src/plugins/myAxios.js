import axios from "axios";

const isDev = process.env.NODE_ENV === 'development';

const myAxios = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api' : 'http://xxxxxxxx:8080/api',
});

// 向後端發送請求時，會攜帶 cookie
myAxios.defaults.withCredentials=true;

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log('發送請求', config)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log('收到請求', response)
    // 未登入轉跳到登入畫面
    if(response?.data?.code === 40100){
        const redirectUrl = window.location.href
        window.location.href = `/user/login?redirect=${encodeURIComponent(
            redirectUrl
        )}&showToast=true`;
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;

