import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

// 🔹 Fetch function
const fetchAdmins = async () => {
  const { data } = await api.get("/admin/admins");
  return data.admins; 
};

// 🔹 Custom hook
export const useAdmins = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: fetchAdmins,
  });
};
