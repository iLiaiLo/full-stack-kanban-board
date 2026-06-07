import * as z from "zod";

const validateSignup = (req, res, next) => {
  try {
    const signUpSchema = z.object({
      username: z
        .string()
        .trim()
        .min(1, { error: "string should be non empty" }),
      email: z
        .string()
        .trim()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
          error: "invalid email format",
        }),
      password: z.string().trim().min(6, {
        error: "password should be at least 6 characters long",
      }),
    });

    const parsedData = signUpSchema.safeParse(req.body);
    if (!parsedData.success) {
      const error = parsedData.error;
      return next(error);
    }

    res.locals.signupInput = parsedData.data;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateSignup;
