export const successResponse = (res, statuseCode = 200, message = 'successful', payload = {}) => {
    res.status(statuseCode).send({
        success: true,
        message: message,
        payload: payload,
    });
}
export const errorResponse = (res, statuseCode = 500, message = 'server error') => {
    res.status(statuseCode).send({
        success: false,
        message: message,
    });
}