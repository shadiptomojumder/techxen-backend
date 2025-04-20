const handleZodError = (error) => {
  const errors = error.issues.map((issue) => {
    return {
      path: issue.path.join('.'), // gets "user.email" instead of just "email"
      message: issue.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;