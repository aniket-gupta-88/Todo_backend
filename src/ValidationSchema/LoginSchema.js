import { check } from "express-validator";

export const LoginSchema= [
    check('username')
    .isAlphanumeric()
    .withMessage('username should be alphanumeric character only')
    .notEmpty()
    .withMessage('username is required')
    .trim().isLength({min:6, max:32}), 

    check('password', 'password is required')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:6, max:100})
    .withMessage('password length should be more than 6')
    .trim(),
]