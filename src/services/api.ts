import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.pandascore.co',
});

api.interceptors.request.use(
  config => {
    config['headers'][
      'Authorization'
    ] = `Bearer ${process.env.PANDASCORE_API_KEY}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
