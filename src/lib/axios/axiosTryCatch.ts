import axios from 'axios';

export const apiTryCatch = axios.create({
  baseURL: '/api',
  timeout: 60000, //tempo maximo de requisicao 1min
});
