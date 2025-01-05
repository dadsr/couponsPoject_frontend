import {AxiosError} from "axios";
import {useState} from "react";

/**
 * Custom hook to handle errors, particularly Axios-related errors.
 *
 * @returns {Object} An object containing:
 * - `error`: The current error state (show, status, message).
 * - `handleError`: A function to process and set error based on the type of error.
 * - `closeError`: A function to reset/clear the error state.
 */
export const useErrorHandler = () => {
    const [error, setError] = useState({show: false, status: 0, message: ""});

    /**
     * Function to handle errors and update the error state accordingly.
     *
     * @param {unknown} error - The error object to handle. Expected to be an AxiosError or other types.
     */
    const handleError = (error: unknown ) => {
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
    /**
     * Function to reset/clear the current error state.
     */
    const closeError = () => setError({show: false, status: 0, message: ""});

    return {error, handleError, closeError};
};
