import { constant } from "./constant";

const axios = require('axios');
const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
    async (config: any) => {
        config.headers = {
            'Authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json'
        }
        return config;
    },
    (error: any) => {
        Promise.reject(error)
    });

axiosApiInstance.interceptors.response.use((response: any) => {
    return response
}, async function (error: any) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        fetch(`${constant.baseAPIurl}api/token`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload: localStorage.getItem('payload') })
        }).then(r => r.json()).then(x => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + x.token;
            return axiosApiInstance(originalRequest);
        });
    }
    return Promise.reject(error);
});

export default axiosApiInstance;