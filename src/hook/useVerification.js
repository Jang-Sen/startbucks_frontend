import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINT } from "../constant/api";

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async ({ email }) => {
      const response = await axios.post(API_ENDPOINT.AUTH.SEND_EMAIL, {
        email,
      });

      return response.data;
    },
    onError: (error) => {
      console.error("Send Email Error: ", error.response.data.message);
    },
  });
};

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: async ({ email, code }) => {
      const response = await axios.post(API_ENDPOINT.AUTH.CHECK_EMAIL, {
        email,
        code,
      });

      return response.data;
    },
    onError: (error) => {
      console.error("Check Email Error: ", error.response.data.message);
    },
  });
};
