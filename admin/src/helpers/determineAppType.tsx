import { summaryLabels as BorderSummaryLabels } from "@helpers/summaryLabels/insurance-border/summaryLabels";
import { summaryLabels as EstateSummaryLabels } from "@helpers/summaryLabels/insurance-estate/summaryLabels";
import { summaryLabels as HealthSummaryLabels } from "@helpers/summaryLabels/insurance-health/summaryLabels";
import { summaryLabels as SpecialistSummaryLabels } from "@helpers/summaryLabels/insurance-specialist/summaryLabels";
import { summaryLabels as TransportSummaryLabels } from "@helpers/summaryLabels/insurance-transport/summaryLabels";
import { summaryLabels as LoanSummaryLabels } from "@helpers/summaryLabels/insurance-transport/summaryLabels";
import { summaryLabels as MortgageSummaryLabels } from "@helpers/summaryLabels/loan-cash/summaryLabels";
import { summaryLabels as TravelSummaryLabels } from "@helpers/summaryLabels/loan-mortgage/summaryLabels";

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
  delete appDataCopy.employee;
  delete appDataCopy.user;
  delete appDataCopy.admin_attachments;
  delete appDataCopy.user_attachments;

  switch (type) {
    case "insuranceBorder": {
      return BorderSummaryLabels(appDataCopy);
    }
    case "insuranceEstate": {
      return EstateSummaryLabels(appDataCopy);
    }
    case "insuranceHealth": {
      return HealthSummaryLabels(appDataCopy);
    }
    case "insuranceSpecialist": {
      return SpecialistSummaryLabels(appDataCopy);
    }
    case "insuranceTransport": {
      return TransportSummaryLabels(appDataCopy);
    }
    case "insuranceTravel": {
      return TravelSummaryLabels(appDataCopy);
    }
    case "loanCash": {
      return LoanSummaryLabels(appDataCopy);
    }
    case "loanMortgage": {
      return MortgageSummaryLabels(appDataCopy);
    }
  }
}
