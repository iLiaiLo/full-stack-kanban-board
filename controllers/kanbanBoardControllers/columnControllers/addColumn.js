import columns from "../../../models/columnsSchema/columnsSchema.js";
import UserColumns from "../../../models/userColumnsSchema/userColumnsSchema.js";
import AppError from "../../../errorHandlers/AppError.js";
const addColumn = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const columnId = crypto.randomUUID();
    const { title } = res.locals.safeBody;

    const kanbanToUpdate = await UserColumns.findOneAndUpdate(
      { userId },
      { $push: { userColumns: columnId } },
      { returnDocument: "after" },
    );
    if (!kanbanToUpdate) {
      const error = new AppError(
        "Cannot update 'userColumns' because the specified user does not exist.",
        404,
      );
      return next(error);
    }

    await columns.create({ id: columnId, userId, title });

    return res
      .status(201)
      .json({ message: "column has been added successfully", columnId });
  } catch (error) {
    next(error);
  }
};

export default addColumn;
