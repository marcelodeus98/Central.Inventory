import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.101.8:3030/',
})//BASE DO NODE

export default api;