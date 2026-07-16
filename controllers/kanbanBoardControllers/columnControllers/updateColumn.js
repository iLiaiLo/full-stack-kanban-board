import columns from "../../../models/columnsSchema/columnsSchema.js";
import AppError from "../../../errorHandlers/AppError.js";
const updateColumn = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { columnId } = res.locals.safeParams;
    const { title } = res.locals.safeBody;

    const columnToUpdate = await columns.findOneAndUpdate(
      { id: columnId, userId },
      { title },
      { returnDocument: "after" },
    );
    if (!columnToUpdate) {
      return next(new Error(`column with id ${columnId} was not found`));
    }
    return res
      .status(200)
      .json({ message: "column has been updated successfully" });
  } catch (error) {
    next(error);
  }
};

export default updateColumn;
