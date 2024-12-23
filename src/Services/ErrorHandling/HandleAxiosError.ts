
const handleAxiosError = (error: any): never => {
    if (error.response) {
        // Backend responded with an error status code
        switch (error.response.status) {
            case 404:
                throw new Error("Resource not found"); // Handle 404 errors
            case 403:
                throw new Error("Access denied. You do not have permission."); // Handle 403 errors
            case 500:
                throw new Error("Internal server error. Please try again later."); // Handle server errors
            default:
                throw new Error(error.response.data || "An unexpected error occurred");
        }
    } else if (error.request) {
        // Request was made but no response was received
        throw new Error("No response from the server. Please check your connection.");
    } else {
        // Something else caused the error
        throw new Error("An unexpected error occurred.");
    }
};

export default handleAxiosError;
