export const BASE_URL = "http://localhost:82/api/v1";

export const API_ENDPOINT = {
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
    SEND_EMAIL: `${BASE_URL}/auth/email/send`,
    CHECK_EMAIL: `${BASE_URL}/auth/email/check`,
    FIND_PASSWORD: `${BASE_URL}/auth/find/password`,
    CHANGE_PASSWORD: `${BASE_URL}/auth/change/password`,
  },
  SOCIAL: {
    GOOGLE: `${BASE_URL}/auth/google`,
    KAKAO: `${BASE_URL}/auth/kakao`,
    NAVER: `${BASE_URL}/auth/naver`,
  },
};
