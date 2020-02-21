import axios from 'axios'
import qs from 'qs'
import { ApiBaseUrl } from './baseApiUrl'
let _ajax = axios.create({
    baseURL: ApiBaseUrl.path,
    timeout: 20000
});
// 添加请求拦截器
_ajax.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
 // 添加响应拦截器
_ajax.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
export let ajax = _ajax