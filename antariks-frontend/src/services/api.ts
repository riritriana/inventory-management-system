import axios from "axios";
// Pastikan import type tetap ada
import type { Product, ApiResponse } from "../types/index";

const API_URL = 'http://localhost:5000';

// 1. GET (Ambil Data)
export const getProducts = async () => {
  const response = await axios.get<ApiResponse<Product[]>>(`${API_URL}/products`);
  return response.data.data;
};

// 2. CREATE (Tambah Data) - INI YANG TADI KURANG
export const createProduct = async (data: { product_name: string; amount: number; qty: number }) => {
  const response = await axios.post<ApiResponse<Product>>(`${API_URL}/products`, data);
  return response.data.data;
};

// 3. DELETE (Hapus Data)
export const deleteProduct = async (id: number) => {
  await axios.delete(`${API_URL}/products/${id}`);
};
// 4. UPDATE (Edit Data) - INI YANG BARU
export const updateProduct = async (id: number, data: { product_name: string; amount: number; qty: number }) => {
  const response = await axios.put<ApiResponse<Product>>(`${API_URL}/products/${id}`, data);
  return response.data.data;
};