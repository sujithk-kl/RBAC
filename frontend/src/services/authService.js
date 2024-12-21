import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

const registerUser = async (userData) => {
  return await API.post("/api/auth/register", userData);
};

export default {
  registerUser,
};
