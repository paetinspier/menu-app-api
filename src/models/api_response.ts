export class ApiResponse {
    success: boolean;
    error?: any;
    data?: any;

    static success(): ApiResponse {
        const response = new ApiResponse();
        response.success = true;
        return response;
    }

    static data(data: any): ApiResponse {
        const response = new ApiResponse();
        response.success = true;
        response.data = data;
        return response;
    }

    static failure(error: any): ApiResponse {
        const response = new ApiResponse();
        response.success = false;
        response.error = error;
        return response;
    }
}