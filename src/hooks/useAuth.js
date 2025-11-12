import api from "@/api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

 const registerUser = async ({ fullName, phone, email, password }) => {
    const { data } = await api.post("/auth/register", {
      fullName,
      phone,
      email,
      password,
    });
    return data;
  };
  
 const loginUser = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  };
  
  
const logoutUser = async () => {
    const { data } = await api.post("/auth/logout");
    return data;
  };
  




export const useAuth = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data.user;
    },
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => queryClient.invalidateQueries(["authUser"]),
  });
};


export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => queryClient.invalidateQueries(["authUser"]),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => queryClient.invalidateQueries(["authUser"]),
  });
};
