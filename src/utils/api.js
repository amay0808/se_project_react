const baseUrl = "http://localhost:3001";

function getToken() {
  return localStorage.getItem("jwt");
}

// GET /items
export function getItems() {
  console.log("Fetching items...");
  return fetch(`${baseUrl}/items/`).then((response) => {
    console.log("GET /items response: ", response);
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    return response.json();
  });
}

// POST /items
export function postItem(item) {
  const token = getToken();
  console.log("Token used for POST /items: ", token);
  console.log("Item payload: ", item);

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  })
    .then((response) => {
      console.log("Response object for POST /items: ", response);
      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      return response.json().then((data) => {
        console.log("Response JSON for POST /items: ", data);
        return data;
      });
    })
    .catch((error) => {
      console.error("Error in POST /items: ", error);
      throw error;
    });
}

// DELETE /items/:id
export function deleteItem(id) {
  console.log("Deleting item with ID: ", id);
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((response) => {
    console.log("Response object for DELETE /items/:id: ", response);
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
  });
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

  const response = await fetch("http://localhost:3001/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(transformedData),
  });

  console.log("Response object for PATCH /users/me: ", response);

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return await response.json();
};

// PUT /items/:id/like
export function addCardLike(id) {
  console.log("Adding like to card with ID: ", id);
  return fetch(`${baseUrl}/items/${id}/like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((response) => {
    console.log("Response object for PUT /items/:id/like: ", response);
    if (!response.ok) {
      throw new Error("Failed to like item");
    }
    return response.json();
  });
}

// DELETE /items/:id/like
export function removeCardLike(id) {
  console.log("Removing like from card with ID: ", id);
  return fetch(`${baseUrl}/items/${id}/like`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((response) => {
    console.log("Response object for DELETE /items/:id/like: ", response);
    if (!response.ok) {
      throw new Error("Failed to dislike item");
    }
    return response.json();
  });
}
