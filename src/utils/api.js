// const baseUrl = "https://my-json-server.typicode.com/amay0808/se_project_react";
const baseUrl = "http://localhost:3001";

function getToken() {
  return localStorage.getItem("jwt");
}
// GET /items
export function getItems() {
  return fetch(`${baseUrl}/items/`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    return response.json();
  });
}

// POST /items
export function postItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`, // Add token here
    },
    body: JSON.stringify(item),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to add item");
    }
    return response.json();
  });
}

// DELETE /items/:id
export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`, // Add token here
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
  });
}
// Function to update profile
export const updateProfile = async (userData) => {
  const response = await fetch("http://localhost:3001/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`, // Add token here
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return await response.json();
};
// PUT /items/:id/like
export function addCardLike(id) {
  return fetch(`${baseUrl}/items/${id}/like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`, // Add token here
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to like item");
    }
    return response.json();
  });
}
// DELETE /items/:id/like
export function removeCardLike(id) {
  return fetch(`${baseUrl}/items/${id}/like`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`, // Add token here
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to dislike item");
    }
    return response.json();
  });
}
