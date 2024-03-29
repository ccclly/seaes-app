import axios from 'axios';
import url from '@/constant/url';

const instance = axios.create({
  baseURL: url,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const rowToken = localStorage.getItem('token');
    if (rowToken) {
      config.headers['token'] = JSON.parse(rowToken)
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response;
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

export default instance;
