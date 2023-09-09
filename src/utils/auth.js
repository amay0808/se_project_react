import { checkResponse } from "./api"; // Import checkResponse from api.js

const baseUrl = "http://localhost:3001";

export const getUserDetail = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
