import React, { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && currentUser == null) {
      fetch("http://localhost:3001/users/me", {
        // Replace with your actual API endpoint
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
          return response.json();
        })
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [currentUser]); // The dependency array includes 'currentUser' to avoid making multiple requests

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
