import api from "./axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ✅ Fetch contact info
const fetchContactInfo = async () => {
  const { data } = await api.get("/contact/getContact");
  return data.contact;
};

// ✅ Update contact info
const updateContactInfo = async (updatedData) => {
  const { data } = await api.put("/contact/update", updatedData);
  return data.contact;
};

// ✅ Hook: Fetch contact info
export const useContactInfo = () => {
  return useQuery({
    queryKey: ["contactInfo"],
    queryFn: fetchContactInfo,
  });
};

// ✅ Hook: Update contact info
export const useUpdateContactInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateContactInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(["contactInfo"]); // Refresh data after update
    },
  });
};
