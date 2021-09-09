import History from "models/history.js";

const addHistoryRecord = async (
  assignedEmployee,
  action,
  description,
  application
) => {
  try {
    const historyRecord = await new History({
      assignedEmployee: assignedEmployee,
      action: action,
      description: description,
      application: application,
    });
    historyRecord.save();
  } catch (error) {
    next(error);
  }
};
export default addHistoryRecord;
