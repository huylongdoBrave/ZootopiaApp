import axios from "axios";

// === Prize Exchange API ===
export interface ApiPrizeExchange {
  id: number;
  name: string;
  price: number;
  quantity: number;
  notiImg?: string;
}

export const getApiPrizeExchange = async (): Promise<ApiPrizeExchange[]> => {
    try {
      const response = await axios.get(`https://api-dev.estuary.solutions:8443/ovaltine-web-api-dev/v1/store-products`);
      return response.data; 
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quà:", error);
      throw error;
    }
};
// ====
