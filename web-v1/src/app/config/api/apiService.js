import axios from 'axios';
import { getItem } from '@/resource/utility/localStorageControl';
import Cookies from 'js-cookie';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/api`;

const authHeader = () => ({
    Authorization: `Bearer ${getItem('access_token')}`,
  });

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_ENDPOINT,
      headers: {
        Authorization: `Bearer ${getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    });


    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Modify the request config before sending
        const modifiedConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${getItem('access_token')}`,
          },
        };
        return modifiedConfig;
      },
      (error) => {
        // Handle request error
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Handle successful responses
        return response;
      },
      (error) => {
        // Handle errors in responses
        const { response } = error;
        if (response && response.status === 401) {
          Cookies.remove('logedIn');

        } else if (response && response.status === 500) {
          // Handle specific error cases, e.g., 500 server error
          // You can add specific logic here

        }
        return Promise.reject(error);
      }
    );
  }
  

  get(path = '') {
    return this.client.get(path);
  }

  post(path = '', data = {}, optionalHeader = {}) {
    return this.client.post(path, data, {
      headers: { ...this.client.defaults.headers.common, ...optionalHeader },
    });
  }

  patch(path = '', data = {}) {
    return this.client.patch(path, data);
  }

  put(path = '', data = {}) {
    return this.client.put(path, data);
  }

  delete(path = '') {
    return this.client.delete(path);
  }
}

export default ApiService;
