import * as z from "zod";
import AppError from "../../errorHandlers/AppError.js";
const validateColumnId = (req, res, next) => {
  try {
    const validColumnId = z.object({
      columnId: z.uuid({ error: "invalid UUID" }),
    });

    const parsedData = validColumnId.safeParse(req.params);
    if (!parsedData.success) {
      const errorMessage = parsedData.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      const error = new AppError(errorMessage, 400);
      return next(error);
    }

    res.locals.safeParams = parsedData.data;
    next();
  } catch (error) {
    next(error);
  }
};
export default validateColumnId;
