import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Adjust according to your backend

export const getPresignedUrl = async (filename) => {
  const response = await axios.get(`${API_BASE_URL}/presigned-url`, { params: { filename } });
  return response.data;
};

export const uploadImage = async (url, file) => {
  await axios.put(url, file, { headers: { "Content-Type": file.type } });
};

export const fetchImages = async () => {
  const response = await axios.get(`${API_BASE_URL}/images`);
  return response.data;
};
