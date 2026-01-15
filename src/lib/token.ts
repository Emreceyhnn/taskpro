const TOKEN = "accessToken";

export const setAccessToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN);
};

export const clearAccessToken = () => {
  localStorage.removeItem(TOKEN);
};
