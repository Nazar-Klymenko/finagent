import { summaryLabels as BorderSummaryLabels } from "@modules/survey/insurance-border/helpers/summaryLabels";
import { summaryLabels as TransportSummaryLabels } from "@modules/survey/insurance-transport/helpers/summaryLabels";

export function determineAppType(type: string, object: {}) {
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
  delete appDataCopy.admin_attachments;
  delete appDataCopy.user_attachments;

  switch (type) {
    case "insuranceBorder": {
      BorderSummaryLabels;
      return BorderSummaryLabels(appDataCopy);
    }
    case "insuranceTransport": {
      return TransportSummaryLabels(appDataCopy);
    }
  }
}
