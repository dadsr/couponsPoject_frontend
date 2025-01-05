import {AxiosError} from "axios";
import {useState} from "react";

export const useErrorHandler = () => {
    const [error, setError] = useState({show: false, status: 0, message: ""});

    const handleError = (error: any) => {
        if (error instanceof AxiosError) {
            if (error.response) {
                switch (error.response.status) {
                    case 404:
                        setError({show: true, status: 404, message: "Resource not found"});
                        break;
                    case 403:
                        setError({show: true, status: 403, message: "Access denied. You do not have permission."});
                        break;
                    case 500:
                        setError({show: true, status: 500, message: "Internal server error. Please try again later."});
                        break;
                    default:
                        setError({
                            show: true,
                            status: error.response.status,
                            message: error.response.data || "An unexpected error occurred"
                        });
                }
            } else if (error.request) {
                setError({
                    show: true,
                    status: 0,
                    message: "No response from the server. Please check your connection."
                });
            } else {
                setError({show: true, status: 0, message: "An unexpected error occurred."});
            }
        }
    };

    const closeError = () => setError({show: false, status: 0, message: ""});

    return {error, handleError, closeError};
};
