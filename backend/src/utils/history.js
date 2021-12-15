import History from "@models/history.js";

const addHistoryRecord = async (
  assignedEmployee,
  action,
  description,
  application
) => {
  const historyRecord = await new History({
    employee_id: assignedEmployee,
    action: action,
    description: description,
    application: application,
  });
  historyRecord.save();
};
export default addHistoryRecord;
