export const handleApiError = (error) => {
  let errorMessage = "An unexpected error occurred";

  if (error.response) {
    const { status, data } = error.response;

    if (status === 400) {
      errorMessage = data.message || "Bad request";
    } else if (status === 401) {
      errorMessage = "Unauthorized - Please log in again";
    } else if (status === 403) {
      errorMessage = "Forbidden - You do not have access to this resource";
    } else if (status === 404) {
      errorMessage = "Resource not found";
    } else if (status === 500) {
      errorMessage = "Server error - Please try again later";
    }
  } else if (error.request) {
    errorMessage = "Network error - Please check your connection";
  } else {
    errorMessage = error.message;
  }

  console.error("API Error:", errorMessage);
  return errorMessage;
};
