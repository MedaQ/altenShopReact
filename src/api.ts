import axios from "axios";
import { Product } from "./types";

const API_URL = "/api/products";

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(API_URL);
        return response.data;
    } catch {
        const fallbackResponse = await axios.get("assets/products.json");
        return fallbackResponse.data;
    }
};