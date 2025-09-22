import jsonwebtoken from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { handleError } from "../utils/responseHandler.js";

const createJwtToken = (user) => {
  return jsonwebtoken.sign(
    { phonenumber: user.phonenumber },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const verifyjwt = asyncHandler(async (req, res, next) => {
  const AuthHeader = req.headers.authorization;
  if (!AuthHeader) {
    return handleError(
      res,
      "Token is  not provided to verify the user access",
      401,
      null
    );
  }

  const token = AuthHeader.split("")[1];
  if (!token) {
    return handleError(res, "Unauthorized", 401, null);
  }
  try {
    const decodeToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    return handleError(
      res,
      error?.message || "unable to verify the token",
      401
    );
  }
});

export { createJwtToken, verifyjwt };
