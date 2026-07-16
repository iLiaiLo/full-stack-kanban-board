import AppError from "../../../errorHandlers/AppError.js";
import columns from "../../../models/columnsSchema/columnsSchema.js";
import UserColumns from "../../../models/userColumnsSchema/userColumnsSchema.js";

const getColumns = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const userCols = await UserColumns.findOne({ userId });
    if (!userCols) {
      const error = new AppError("kanbnan not found", 404);
      return next(error);
    }

    const { userColumns } = userCols;

    const cols = await columns.find({ id: { $in: userColumns } });

    return res.status(200).json(cols);
  } catch (error) {
    next(error);
  }
};

export default getColumns;
