import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINT } from "../constant/api";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(API_ENDPOINT.AUTH.SIGNUP, userData);

      return response.data;
    },
    onSuccess: (data) => {
      if (data.statusCode === 201) {
        navigate("/login");
      }
      console.log("Signup Success: ", data);
    },
    onError: (error) => {
      console.error("Signup Error: ", error.response.data.message);
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post(API_ENDPOINT.AUTH.LOGIN, {
        email,
        password,
      });

      return response.data;
    },
    onSuccess: (data) => {
      console.log("success Login");
      alert("Success Login");
      navigate("/");
    },
    onError: (error) => {
      console.error("Login Error: ", error.response.data.message);
    },
  });
};
