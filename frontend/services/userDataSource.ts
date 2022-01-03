import API from "./api";

export const createUser = (username: string) => {
  const path = "/users";

  const body = {
    username: username,
  };

  return API.post(path, body);
};

export const getUserByUsername = (username: string) => {};
