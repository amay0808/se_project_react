const baseUrl = "https://my-json-server.typicode.com/amay0808/se_project_react";

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
  console.log("Posting item:", item); // Log the item that is being posted
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      console.log("Response received:", response); // Log the response received
      return response.json();
    })
    .then((data) => {
      console.log("Data after posting:", data); // Log the data after the post
      return data;
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
