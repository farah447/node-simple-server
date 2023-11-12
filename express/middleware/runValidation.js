import { validationResult } from "express-validator";

export const runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('runValidation: ', errors);
        let errorList = errors.array().map((error) => error.msg);
        console.log(errorList);
        return res.status(400).send({ error: errorList });
    }
    next();
}