import { handleError } from "./responseHandler.js";

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      handleError(
        res,
        err && err.message ? err.message : "An unexpected error occured",
        500,
        null,
        err
      );
    });
  };
};
export default asyncHandler;
