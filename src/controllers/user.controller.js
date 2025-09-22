import asyncHandler from "../utils/asyncHandler.js";
import { handleError, handleSucess } from "../utils/responseHandler.js";
import { createJwtToken } from "../middlewares/jwt.js";
import { validationResult } from "express-validator";
import parseValidations from "../utils/parseValidations.js";
import sendSms from "../utils/twilio.js";
import User from "../models/user.model.js";
import Verification from "../models/verification.model.js";

const sendOtp = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation error",
      400,
      parseValidations(errors.array())
    );
  }
  const { phonenumber } = req.body;
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const expiryTime = new Date(Date.now() + 2 * 60 * 1000);

  const createOtp = await Verification.create({
    code,
    expiryAt: expiryTime,
    phonenumber,
  });

  const sendOtp = await sendSms(phonenumber, code);
  if (!sendOtp) {
    return handleError(res, "unable to send sms", 500);
  }
  handleSucess(res, "Otp sent successfully", 200, createOtp);
});

const verifyOtp = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation error",
      400,
      parseValidations(errors.array())
    );
  }
  const { phonenumber, code } = req.body;
  const checkOtpValidity = await Verification.findOne({ phonenumber, code });
  if (!checkOtpValidity) {
    return handleError(res, "Otp is not valid", 401, null);
  }
  const user = await User.findOne({ phonenumber });
  if (!user) {
    user = await User.create({ phonenumber });
  }

  const token = createJwtToken(user);
  handleSucess(res, "otp verified", 200, { token, user });
});
export { sendOtp, verifyOtp };
