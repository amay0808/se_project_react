const baseUrl = "http://localhost:3001";

// GET /items
export function getItems() {
  return fetch(`${baseUrl}/items`).then((response) => {
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
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
  });
}
