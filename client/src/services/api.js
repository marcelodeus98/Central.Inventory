import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.10.169:3030/',
})//BASE DO NODE

export default api;