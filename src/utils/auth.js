const baseUrl = "http://localhost:3001";

export const getUserDetail = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return response.json();
  });
};

