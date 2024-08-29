import axios from 'axios';

const server = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 5000,
});

// server.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('auth')}`;
//   return config;
// });

// server.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status == 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         // const response = await axios.get<IAuthResponse>(
//         //   `${import.meta.env.VITE_BASE_URL}/user/refresh`,
//         //   {
//         //     withCredentials: true,
//         //   }
//         // );
//         // localStorage.setItem('auth', response.data.accessToken);
//         // console.log('Токен обновлен');
//         // // console.log(server.request(originalRequest))
//         // return server.request(originalRequest);
//       } catch (e) {
//         //START ERROR BLOCK
//         // const error = useErrorStore();
//         // error.setError({
//         //   message:
//         //     'Вы не авторизованны. Пожалуйста, авторизуйтесь. Или обновите страницу.',
//         //   critical: false,
//         // });
//       }
//     }
//     throw error;
//   }
// );

export default server;
