// Client-side auth.js
export const getUserDetail = async (token) => {
  try {
    const response = await fetch("http://localhost:3001/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const userDetail = await response.json();
    return userDetail;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};
