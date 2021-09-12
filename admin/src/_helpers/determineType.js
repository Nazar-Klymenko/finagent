import {
  addLabelsBorder,
  addLabelsCash,
  addLabelsEstate,
  addLabelsHealth,
  addLabelsMortgage,
  addLabelsSpecialist,
  addLabelsTransport,
  addLabelsTravel,
} from "./labels";

export default function determineType(type, object) {
  let appDataCopy = JSON.parse(JSON.stringify(object));

  delete appDataCopy.status;
  delete appDataCopy.feedback;
  delete appDataCopy.category;
  delete appDataCopy.createdAt;
  delete appDataCopy.updatedAt;
  delete appDataCopy.type;
  delete appDataCopy.applicationType;
  delete appDataCopy.assignedEmployee;
  delete appDataCopy.user_id;
  delete appDataCopy.documents;
  delete appDataCopy.attachments;
  delete appDataCopy.files;
  delete appDataCopy.documentPictures;
  delete appDataCopy.appendedImages;
  delete appDataCopy.insuredLabels;
  delete appDataCopy.userDocuments;
  delete appDataCopy.archived;
  delete appDataCopy.InsuranceData?.clauseOne;
  delete appDataCopy.InsuranceData?.clauseTwo;
  delete appDataCopy.InsuranceData?.clauseThree;
  delete appDataCopy.LoanData?.conditions;
  delete appDataCopy.AppendedImages;
  delete appDataCopy.attachmentsFront;
  delete appDataCopy._id;
  delete appDataCopy.id;
  delete appDataCopy.__v;
  delete appDataCopy.employee_id;
  delete appDataCopy.user;

  const appDataCopyArray = Object.entries(appDataCopy);

  const appDataCopyArrayFiltered = appDataCopyArray.filter((elem) => {
    return elem[1] != null || undefined;
  });

  if (type === "OC") {
    return addLabelsTransport(appDataCopyArrayFiltered);
  } else if (type === "HealthSpecialist") {
    return addLabelsSpecialist(appDataCopyArrayFiltered);
  } else if (type === "HealthMedical") {
    return addLabelsHealth(appDataCopyArrayFiltered);
  } else if (type === "Cash") {
    return addLabelsCash(appDataCopyArrayFiltered);
  } else if (type === "Mortgage") {
    return addLabelsMortgage(appDataCopyArrayFiltered);
  } else if (type === "Travel") {
    return addLabelsTravel(appDataCopyArrayFiltered);
  } else if (type === "Estate") {
    return addLabelsEstate(appDataCopyArrayFiltered);
  } else if (type === "Border") {
    return addLabelsBorder(appDataCopyArrayFiltered);
  }
}
