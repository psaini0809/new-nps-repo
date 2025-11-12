import api from "@/api/axios";

export const registerUser = async ({ fullName, phone, email, password }) => {
  const { data } = await api.post("/auth/register", {
    fullName,
    phone,
    email,
    password,
  });
  return data;
};

export const loginUser = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};


export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data.user;
};
