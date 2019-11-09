import Axios, { AxiosResponse } from 'axios';

Axios.interceptors.response.use((response: AxiosResponse<any>) => {
  if (Math.floor(response.status / 100) !== 2) {
    throw new Error(`axios error: ${response.status}: ${response.statusText}`);
  }

  return response.data;
});

export { Axios };
