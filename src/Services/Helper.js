import axios from "axios"

// export const BASE_URL = "https://db-alumni-backend-production.up.railway.app";
export const BASE_URL = "http://localhost:8080";

export const axiosService = axios.create({
    baseURL: BASE_URL,
});