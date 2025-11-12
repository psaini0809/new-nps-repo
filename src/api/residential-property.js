import api from "@/api/axios";

// 🏠 Create a new Residential Property
export const createResidentialProperty = async (propertyData) => {
  const { data } = await api.post("/residential/create", propertyData);
  return data;
};

// 📋 Fetch all Residential Properties
export const getAllResidentialProperties = async () => {
  const { data } = await api.get("/residential/all");
  return data.data;
};

// 🔍 Fetch a Single Property by ID
export const getResidentialPropertyById = async (id) => {
  const { data } = await api.get(`/residential/${id}`);
  return data;
};

// ✏️ Update Property by ID
export const updateResidentialProperty = async (id, updatedData) => {
  const { data } = await api.put(`/residential/${id}`, updatedData);
  return data;
};

// 🗑 Delete Property by ID
export const deleteResidentialProperty = async (id) => {
  const { data } = await api.delete(`/residential/${id}`);
  return data;
};
