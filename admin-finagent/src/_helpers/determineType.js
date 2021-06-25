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

  const appDataCopyArray = Object.entries(appDataCopy);

  console.log(appDataCopyArray);

  if (type === "OC") {
    return addLabelsTransport(appDataCopyArray);
  } else if (type === "HealthSpecialist") {
    return addLabelsSpecialist(appDataCopyArray);
  } else if (type === "HealthMedical") {
    return addLabelsHealth(appDataCopyArray);
  } else if (type === "Cash") {
    return addLabelsCash(appDataCopyArray);
  } else if (type === "Mortgage") {
    return addLabelsMortgage(appDataCopyArray);
  } else if (type === "Travel") {
    return addLabelsTravel(appDataCopyArray);
  } else if (type === "Estate") {
    return addLabelsEstate(appDataCopyArray);
  } else if (type === "Border") {
    return addLabelsBorder(appDataCopyArray);
  }
}
