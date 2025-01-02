import {AxiosError} from "axios";

export const errorHandler = (error: any)=>{
    if(error instanceof AxiosError) {
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    throw new Error("Resource not found");
                case 403:
                    throw new Error("Access denied. You do not have permission.");
                case 500:
                    throw new Error("Internal server error. Please try again later.");
                default:
                    throw new Error(error.response.data || "An unexpected error occurred");
            }
        } else if (error.request) {
            // Request was made but no response was received
            throw new Error("No response from the server. Please check your connection.");
        } else
            // Something else caused the error
            throw new Error("An unexpected error occurred.");
    }
    //todo
    //     else
    //        toast.error(error.message);
    //
    // else if(typeof(error) === 'string')
    //   //  toast.error(error);
    // else
    //   //  toast.error(error.message);
}
