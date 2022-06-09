import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { message } from 'antd';
import ErrorHandle from './error-handler';
import { Result } from './http.service';

const axiosInstance: AxiosInstance = axios.create({
  timeout: 30000,
});

axiosInstance.interceptors.response.use(
  (data: AxiosResponse<Result>) => {
    const result = data;
    if (data.headers['content-type'].includes('application/json')) {
      return result.data;
    }
    if (result.status !== 200) {
      ErrorHandle.serverError(result.status);
      Promise.reject(`请求错误${result.status}`);
    }
    const { code } = result.data;
    if (code !== 0) {
      switch (code) {
        case 1004:
          ErrorHandle.loginOut(code);
          break;
        default:
          ErrorHandle.serverError(code);
          break;
      }
      Promise.reject(result.data.message);
    }
  },
  error => {
    message.error('连接错误，尝试刷新或联系技术人员');
    Promise.reject(error);
  },
);

export default axiosInstance;
