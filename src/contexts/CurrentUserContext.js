import React, { createContext, useState } from "react";

export const CurrentUserContext = createContext(null);

// Create a provider component
export const CurrentUserProvider = ({ children }) => {
  // Initialize state to hold the current user
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
