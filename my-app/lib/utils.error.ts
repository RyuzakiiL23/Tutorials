export const parseError = (error: any) => {
  const errorString = error.message;

  // Define a regular expression pattern to match key-value pairs
  const pattern = /(\w+): Path `([^`]+)` is required/g;

  // Initialize an empty object to store key-value pairs
  const errorObject: Record<string, string> = {};

  // Iterate over matches in the error string
  let match;
  while ((match = pattern.exec(errorString)) !== null) {
    const [, key, value] = match;
    errorObject[key] = value + " is required";
  }

  console.log(errorObject);
  return errorObject;
};

export const getErrorMessage = (error: unknown): string => {
    let message: string;

    if (error instanceof Error) {
        message = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
        message = String(error.message);
    } else if (typeof error === "string") {
        message = error;
    } else {
        message = "An unexpected error occurred";
    }

    return message;
}