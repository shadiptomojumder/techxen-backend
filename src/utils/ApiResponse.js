const ApiResponse = (
    res,
    { statusCode, success, message = null, meta = null, data = null }
) => {
    const responseData = {
        statusCode: statusCode || 200,
        success: success !== undefined ? success : true,
        message: message,
        meta: meta,
        data: data,
    };

    res.status(statusCode || 200).json(responseData);
};

export default ApiResponse;
