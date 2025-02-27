import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINT } from "../constant/api";
import { useNavigate } from "react-router-dom";

export const useFindPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email }) => {
      const response = await axios.post(API_ENDPOINT.AUTH.FIND_PASSWORD, {
        email,
      });

      return response.data;
    },
    onSuccess: (data) => {
      console.log("Find Password Success", data);
      alert("Find Password Success");
      navigate("/");
    },
    onError: (error) => {
      console.error("Find Password Error: ", error.response.data.message);
    },
  });
};

export const useChangePassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ token, password }) => {
      const response = await axios.post(API_ENDPOINT.AUTH.CHANGE_PASSWORD, {
        token,
        newPassword: password,
      });

      return response.data;
    },
    onSuccess: (data) => {
      console.log("Change Password Success: ", data);
      alert("Change Password Success");
      navigate("/");
    },
    onError: (error) => {
      console.error("Change Password Error: ", error.response.data.message);
    },
  });
};
