import apiClient from "./interceptors";
import { handleApiError } from "./handleApiError";

export const getCurrentUser = async (url) => {
  try {
    const response = await apiClient.get(url);

    if (response.status !== 200) {
      throw new Error(response.data.data.message);
    } else {
      return response.data.data;
    }
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getUsers = async (url, filter) => {
  try {
    const response = await apiClient.get(url, {
      params: {
        filter,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.data.message);
    }
  } catch (error) {
    throw handleApiError(error);
  }
};
export const updateCredentials = async (url, data) => {
  try {
    const response = await apiClient.put(url, {
      data,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.data.message);
    }
  } catch (error) {
    throw handleApiError(error);
  }
};

export const sendMoney = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    if (response.status !== 201) {
      throw new Error(response.data.data.message);
    } else {
      return response.data;
    }
  } catch (error) {
    throw handleApiError(error);
  }
};

export const signup = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);

    if (!response.status) {
      throw new Error(response.data.data.message);
    } else {
      return response.data;
    }
  } catch (error) {
    throw handleApiError(error);
  }
};

export const signin = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);

    if (response.status === 200) {
      localStorage.setItem("token", response.data.data);
      return response.data;
    } else {
      throw new Error(response.data.data.message);
    }
  } catch (error) {
    throw handleApiError(error);
  }
};
