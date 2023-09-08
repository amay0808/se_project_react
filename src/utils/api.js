import { getUserDetail } from "./auth";
import { baseUrl } from "../contexts/CurrentUserContext";

function getToken() {
  return localStorage.getItem("jwt");
}

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error ${response.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// GET /items
export function getItems() {
  return request(`${baseUrl}/items/`);
}

// POST /items
export function postItem(item) {
  const token = getToken();

  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

// DELETE /items/:id
export async function deleteItem(_id) {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

// update Profile
export const updateProfile = async (userData) => {
  const { name, avatarUrl } = userData;
  const transformedData = { name, avatar: avatarUrl };

  try {
    const response = await fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(transformedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// PUT /items/:id/like
export function addCardLike(id) {
  return request(`${baseUrl}/items/${id}/like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

// DELETE /items/:id/like
export function removeCardLike(id) {
  return request(`${baseUrl}/items/${id}/like`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

// handleLogin with a callback to update state in App.js
export const handleLogin = async (
  userData,
  setLoggedInCallback,
  setCurrentUserCallback,
  setClothingItemsCallback
) => {
  try {
    const response = await fetch(`${baseUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to log in");
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("jwt", data.token);
      setLoggedInCallback(true);

      const userDetailData = await getUserDetail(data.token);
      setCurrentUserCallback(userDetailData);

      const itemsResponse = await fetch(`${baseUrl}/items`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (!itemsResponse.ok) {
        throw new Error("Failed to fetch items");
      }

      const itemsData = await itemsResponse.json();
      setClothingItemsCallback(itemsData);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// handleRegister with a callback
export const handleRegister = async (
  userData,
  setLoggedInCallback,
  setCurrentUserCallback
) => {
  try {
    const response = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      if (response.status === 409) {
        alert("Username or Email already exists");
      } else {
        throw new Error("Network response was not ok");
      }
    }

    const data = await response.json();
    setLoggedInCallback(true);
    setCurrentUserCallback(data);
  } catch (error) {
    console.error("Error occurred while creating user:", error);
  }
};
