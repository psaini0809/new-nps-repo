import api from "./axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


const fetchCareers = async () => {
  const { data } = await api.get("/careers/fetch");
  return data.jobs;
};

const createCareer = async (careerData) => {
  const { data } = await api.post("/careers/create", careerData);
  return data.job;
};


const updateCareer = async ({ id, updatedData }) => {
  const { data } = await api.put(`/careers/update/${id}`, updatedData);
  return data.job;
};


const deleteCareer = async (id) => {
  const { data } = await api.delete(`/careers/delete/${id}`);
  return data.message;
};


export const useCareers = () => {
  return useQuery({
    queryKey: ["careers"],
    queryFn: fetchCareers,
  });
};
export const useCreateCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCareer,
    onSuccess: () => {
      queryClient.invalidateQueries(["careers"]);
    },
  });
};

export const useUpdateCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCareer,
    onSuccess: () => {
      queryClient.invalidateQueries(["careers"]);
    },
  });
};

export const useDeleteCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCareer,
    onSuccess: () => {
      queryClient.invalidateQueries(["careers"]);
    },
  });
};
