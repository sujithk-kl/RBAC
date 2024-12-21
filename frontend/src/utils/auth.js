import jwt_decode from "jwt-decode";

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

// Function to decode JWT token and get user role
export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwt_decode(token);
    return decoded.role; // Assuming the role is stored in the JWT payload
  }
  return null;
};

// Function to set the JWT token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

// Function to log out the user
export const logout = () => {
  localStorage.removeItem("token");
};
