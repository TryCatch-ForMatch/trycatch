import axios from 'axios';

const axiosTryCatch = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  timeout: 60000, //tempo maximo de requisicao 1min
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosTryCatch;
