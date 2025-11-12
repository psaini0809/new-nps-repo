import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createResidentialProperty,
  getAllResidentialProperties,
  getResidentialPropertyById,
  updateResidentialProperty,
  deleteResidentialProperty,
} from "@/api/residential-property"

// 🏘️ Fetch all residential properties
export const useResidentialProperties = () => {
  return useQuery({
    queryKey: ["residentialProperties"],
    queryFn: getAllResidentialProperties,
  });
};

// 🏠 Fetch single property by ID
export const useResidentialProperty = (id) => {
  return useQuery({
    queryKey: ["residentialProperty", id],
    queryFn: () => getResidentialPropertyById(id),
    enabled: !!id, // only run if id exists
  });
};

// ➕ Create new property
export const useCreateResidentialProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createResidentialProperty,
    onSuccess: () => {
      // refetch all after creation
      queryClient.invalidateQueries(["residentialProperties"]);
    },
  });
};

// ✏️ Update property
export const useUpdateResidentialProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) =>
      updateResidentialProperty(id, updatedData),
    onSuccess: (_, { id }) => {
      // invalidate both all + specific property
      queryClient.invalidateQueries(["residentialProperties"]);
      queryClient.invalidateQueries(["residentialProperty", id]);
    },
  });
};

// 🗑 Delete property
export const useDeleteResidentialProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResidentialProperty,
    onSuccess: () => {
      queryClient.invalidateQueries(["residentialProperties"]);
    },
  });
};
