import { getUserDetail } from "./auth"; // Make sure the path to auth.js is correct

const baseUrl = "http://localhost:3001";

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
  console.log("Fetching items...");
  return request(`${baseUrl}/items/`);
}

// POST /items
export function postItem(item) {
  const token = getToken();
  console.log("Token used for POST /items: ", token);
  console.log("Item payload: ", item);

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
  console.log("Deleting item with ID: ", _id);
  const response = await request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  console.log("Response object for DELETE /items/:id: ", response);
}

// Function to update profile
export const updateProfile = async (userData) => {
  const transformedData = {
    ...userData,
    avatar: userData.avatarUrl,
    name: userData.name,
  };
  delete transformedData.avatarUrl;

  console.log("Updating profile with data: ", transformedData);

  const response = await request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(transformedData),
  });

  console.log("Response object for PATCH /users/me: ", response);
};

// PUT /items/:id/like
export function addCardLike(id) {
  console.log("Adding like to card with ID: ", id);
  return request(`${baseUrl}/items/${id}/like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

// DELETE /items/:id/like
export function removeCardLike(id) {
  console.log("Removing like from card with ID: ", id);
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
      setLoggedInCallback(true); // Call the passed-in callback to update state

      const userDetailData = await getUserDetail(data.token);
      setCurrentUserCallback(userDetailData); // Call the passed-in callback to update state

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
      setClothingItemsCallback(itemsData); // Call the passed-in callback to update state
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
    setLoggedInCallback(true); // Call the passed-in callback to update state
    setCurrentUserCallback(data); // Call the passed-in callback to update state
  } catch (error) {
    console.error("Error occurred while creating user:", error);
  }
};
