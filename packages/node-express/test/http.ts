import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export const get = async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await axios.get(url, {
    validateStatus: () => true,
    ...config,
  });
};

export const post = async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await axios.post(url, data, {
    validateStatus: () => true,
    ...config,
  });
};

export const put = async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await axios.put(url, data, {
    validateStatus: () => true,
    ...config,
  });
};

export const del = async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await axios.delete(url, {
    validateStatus: () => true,
    ...config,
  });
};

export const patch = async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await axios.patch(url, data, {
    validateStatus: () => true,
    ...config,
  });
};

export const head = async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await axios.head(url, {
    validateStatus: () => true,
    ...config,
  });
};

export const options = async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await axios.options(url, {
    validateStatus: () => true,
    ...config,
  });
};
