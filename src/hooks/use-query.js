import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchQueries,
  createQuery,
  updateQuery,
  deleteQuery,
  fetchQueryCount,
} from "@/api/query";

export const useQueryCount = () => {
    return useQuery({
      queryKey: ["queryCount"],
      queryFn: fetchQueryCount,
      staleTime: 1000 * 60, 
      refetchOnWindowFocus: false,
    });
  };
// ✅ Fetch all queries
export const useQueries = () => {
  return useQuery({
    queryKey: ["queries"],
    queryFn: fetchQueries,
  });
};

// ✅ Create new query (for users)
export const useCreateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuery,
    onSuccess: () => {
      queryClient.invalidateQueries(["queries"]);
    },
  });
};

// ✅ Update query (admin marks as addressed)
export const useUpdateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedQuery }) => updateQuery(id, updatedQuery),
    onSuccess: () => {
      queryClient.invalidateQueries(["queries"]);
    },
  });
};

// ✅ Delete query (admin removes)
export const useDeleteQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuery,
    onSuccess: () => {
      queryClient.invalidateQueries(["queries"]);
    },
  });
};
