import { body } from "express-validator";
const userValidator = [
  body("phonenumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage("Phone number must be 10 digits"),
];

export default userValidator;
