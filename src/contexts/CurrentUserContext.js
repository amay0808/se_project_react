import React, { createContext, useState, useEffect } from "react";
import { getUserDetail } from "../utils/auth";
export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && currentUser == null) {
      getUserDetail(token)
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
export const baseUrl = "https://localhost:3001";
