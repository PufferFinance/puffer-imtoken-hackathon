import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class ApiClient {
  protected client: AxiosInstance;

  constructor(baseURL: string, config: AxiosRequestConfig = {}) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });

    // Add more interceptors or common logic if needed
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Errors are logged for all implementations of APIClient
        console.error('API Error:', error.response?.data || error.message);
        throw error;
      },
    );
  }
}
