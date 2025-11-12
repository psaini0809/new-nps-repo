import api from "./axios";
import { useQuery } from "@tanstack/react-query";

const fetchUserRoleCounts = async () => {
  const { data } = await api.get("/admin/role-counts");
  return data.data; 
};

export const useUserRoleCounts = () => {
  return useQuery({
    queryKey: ["userRoleCounts"],
    queryFn: fetchUserRoleCounts,
  });
};
