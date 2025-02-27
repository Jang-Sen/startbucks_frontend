import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT as API_ENDPOINTS } from "../constant/api";

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        const width = 500;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        const loginWindow = window.open(
          API_ENDPOINTS.SOCIAL.GOOGLE,
          "Google Login",
          `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
        );
        const messageListener = (event) => {
          console.log(event);

          if (event.origin !== "http://localhost") return;

          const { user, accessToken } = event.data;

          if (accessToken) {
            console.log(user);

            if (loginWindow) {
              loginWindow.close();
              resolve(user);
            }
          } else {
            reject(new Error("Google Login Fail."));
          }

          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", user);
        };
        window.addEventListener("message", messageListener);

        // 창이 닫히면 이벤트 리스너 제거
        const checkPopupClosed = setInterval(() => {
          if (loginWindow?.closed) {
            clearInterval(checkPopupClosed);
            window.removeEventListener("message", messageListener);
            reject(new Error("Google login window closed"));
          }
        }, 500);
      });
    },
    onError: (error) => {
      console.error("Google Login Error: ", error.response.data.message);
    },
  });
};

export const useKakaoLogin = () => {
  return useMutation({
    mutationFn: async () => {},
    onError: () => {},
  });
};

export const useNaverLogin = () => {
  return useMutation({
    mutationFn: async () => {},
    onError: () => {},
  });
};
