import { getUserDetail } from "./auth";
// import { baseUrl } from "../contexts/CurrentUserContext";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.styledcomputing.com"
    : "http://localhost:3001";

function getToken() {
  return localStorage.getItem("jwt");
}

export function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error ${response.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getItems() {
  return request(`${baseUrl}/items/`);
}

export function postItem(item) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(item),
  });
}

export function deleteItem(_id) {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export const updateProfile = (userData) => {
  const { name, avatarUrl } = userData;
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, avatar: avatarUrl }),
  });
};

export function addCardLike(id) {
  return request(`${baseUrl}/items/${id}/like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function removeCardLike(id) {
  return request(`${baseUrl}/items/${id}/like`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export const handleLogin = async (
  userData,
  setLoggedInCallback,
  setCurrentUserCallback,
  setClothingItemsCallback
) => {
  try {
    const data = await request(`${baseUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    localStorage.setItem("jwt", data.token);
    setLoggedInCallback(true);

    const userDetailData = await getUserDetail(data.token);
    setCurrentUserCallback(userDetailData);

    const itemsData = await getItems();
    setClothingItemsCallback(itemsData);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
export const handleRegister = async (
  //return promise
  userData,
  setLoggedInCallback,
  setCurrentUserCallback
) => {
  try {
    const data = await request(`${baseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    setLoggedInCallback(true);
    setCurrentUserCallback(data);
    return Promise.resolve(data); // Return a resolved Promise
  } catch (error) {
    console.error("Error occurred while creating user:", error);
    return Promise.reject(error); // Return a rejected Promise
  }
};
