const baseUrl = "http://localhost:3001";

export const getUserDetail = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/users/me`, {
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
