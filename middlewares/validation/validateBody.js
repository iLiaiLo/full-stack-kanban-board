import * as z from "zod";
import AppError from "../../errorHandlers/AppError.js";

const validateBody = (req, res, next) => {
  try {
    const schema = z.object({
      title: z.string().trim().min(1, { error: "string should be non empty" }),
    });

    const parsedData = schema.safeParse(req.body);
    if (!parsedData.success) {
      const errorMessage = parsedData.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      const error = new AppError(errorMessage, 400);
      return next(error);
    }

    res.locals.safeBody = parsedData.data;
    next();
  } catch (error) {
    next(error);
  }
};
export default validateBody;
