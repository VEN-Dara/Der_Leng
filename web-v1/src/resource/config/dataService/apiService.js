import axios from 'axios';
import { getItem } from '../../utility/localStorageControl';

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
