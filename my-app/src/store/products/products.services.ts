import apiClient from "../../apiClient";

export const getProductsService = ()=>{
    return apiClient.get(`products`)
}