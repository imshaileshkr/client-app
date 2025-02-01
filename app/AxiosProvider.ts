import axios from "axios";

// Ensure the environment variable is loaded correctly
console.log("Backend API endpoint:", process.env.backend_api_endpoint);

export const AxiosProvider = axios.create({
    baseURL: process.env.backend_api_endpoint, // This will use the environment variable
    headers: {
        "Content-Type": "application/json", // Ensure headers are set correctly
    },
});

// Optionally, you can add interceptors to handle requests or responses globally
AxiosProvider.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally, maybe log them or show a toast
        console.error("Axios error:", error);
        return Promise.reject(error);
    }
);

