import columns from "../../../models/columnsSchema/columnsSchema.js";
import UserColumns from "../../../models/userColumnsSchema/userColumnsSchema.js";

const getColumns = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const userCols = await UserColumns.findOne({ userId });
    if (!userCols) {
      return next(new Error(`kanban  was not found`));
    }

    const { userColumns } = userCols;

    const cols = await columns.find({ id: { $in: userColumns } });

    return res.status(200).json(cols);
  } catch (error) {
    next(error);
  }
};

export default getColumns;
