import { paginate } from "../../Types/Queries";

export const fetchProducts = async (queries?: paginate): Promise<products> => {
  const skip = queries?.skip || 0;
  const limit = queries?.limit || 15;
  const resp = await fetch(
    "https://dummyjson.com/products?" + `skip=${skip}&limit=${limit}`
  );
  const data = await resp.json();
  return data;
};

export interface product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface products {
  products: product[];
  total: number;
  skip: number;
  limit: number;
}
