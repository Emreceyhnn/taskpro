import Cookies from "js-cookie";

const TOKEN = "accessToken";

export const setAccessToken = (token: string) => {
  Cookies.set(TOKEN, token, {
    sameSite: "lax",
    secure: true,
  });
};

export const getAccessToken = () => {
  return Cookies.get(TOKEN) || null;
};

export const clearAccessToken = () => {
  Cookies.remove(TOKEN);
};
