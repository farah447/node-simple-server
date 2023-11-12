import { check } from 'express-validator';

export const createProductValidation = [
    check("title")
        .trim()
        .notEmpty()
        .withMessage("Title is missing")
        .isLength({ min: 3 })
        .withMessage("title must have al least 3 characters"),
    check("price")
        .trim()
        .notEmpty()
        .withMessage("price is missing")
        .isFloat({ min: 1 })
        .withMessage("price must be a positive number"),
];

export const updateProductValidation = [
    check("title")
        //.optional()
        .trim()
        .notEmpty()
        .withMessage("Title is missing")
        .isLength({ min: 3 })
        .withMessage("title must have al least 3 characters"),
    check("price")
        .trim()
        .notEmpty()
        .withMessage("price is missing")
        .isFloat({ min: 1 })
        .withMessage("price must be a positive number"),
];

/*export const createProductValidation = (req, res, next) => {
    if (!req.body.title) {
        return res.statues(404).json({ message: 'title is missing' });
    }
    if (!req.body.title.length <= 2) {
        return res.statues(404).json({ message: 'title needs at least 3 charachters' });
    }
    if (!req.body.price) {
        return res.statues(404).json({ message: 'price is missing' });
    }
    next();
}*/