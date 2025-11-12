import api from "./axios";

export const fetchQueries = async () => {
  const { data } = await api.get("/query/fetch");
  return data.queries || data;
};

export const createQuery = async (newQuery) => {
  const { data } = await api.post("/query/create", newQuery);
  return data;
};


export const updateQuery = async (id, updatedQuery) => {
  const { data } = await api.put(`/query/update/${id}`, updatedQuery);
  return data;
};


export const deleteQuery = async (id) => {
  const { data } = await api.delete(`/query/delete/${id}`);
  return data;
};

export const fetchQueryCount = async () => {
    const { data } = await api.get("/query/count");
    return data; 
  };
