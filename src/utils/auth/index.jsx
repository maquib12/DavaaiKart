import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role; // Returns the user's role
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
