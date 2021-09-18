const changeRadioValues = (obj) => {
  obj.forEach((prop) => {
    switch (prop[1]) {
      //Transport insurance
      case "oc":
        prop[1] = "InsuranceTransport.Page1.oc";
        break;
      case "ac":
        prop[1] = "InsuranceTransport.Page1.ac";
        break;
      case "greenCard":
        prop[1] = "InsuranceTransport.Page1.greenCard";
        break;
      case "assistance":
        prop[1] = "InsuranceTransport.Page3.assistance";
        break;
      case "pesel":
        prop[1] = "InsuranceTransport.Page1.pesel";
        break;
      case "regon":
        prop[1] = "InsuranceTransport.Page1.regon";
        break;
      case "passport":
        prop[1] = "InsuranceTransport.Page1.passport";
        break;
      case "left":
        prop[1] = "InsuranceTransport.Page3.left";
        break;
      case "right":
        prop[1] = "InsuranceTransport.Page3.right";
        break;
      case "mechanical":
        prop[1] = "InsuranceTransport.Page3.mechanical";
        break;
      case "automatic":
        prop[1] = "InsuranceTransport.Page3.automatic";
        break;
      //Estate insurance
      case "house":
        prop[1] = "InsuranceEstate.Page1.house";
        break;
      case "apartment":
        prop[1] = "InsuranceEstate.Page1.apartment";
        break;
      case "last":
        prop[1] = "InsuranceEstate.Page1.last";
        break;
      case "intermediate":
        prop[1] = "InsuranceEstate.Page1.intermediate";
        break;
      case "ground":
        prop[1] = "InsuranceEstate.Page1.ground";
        break;
      case "brick":
        prop[1] = "InsuranceEstate.Page1.brick";
        break;
      case "wood":
        prop[1] = "InsuranceEstate.Page1.wood";
        break;
      case "no":
        prop[1] = "InsuranceEstate.Page1.no";
        break;
      case "yes":
        prop[1] = "InsuranceEstate.Page1.yes";
        break;
      case "coOwnership":
        prop[1] = "InsuranceEstate.Page1.coOwnership";
        break;
      case "lease":
        prop[1] = "InsuranceEstate.Page1.lease";
        break;
      case "annual":
        prop[1] = "InsuranceEstate.Page1.annual";
        break;
      case "year3":
        prop[1] = "InsuranceEstate.Page1.year3";
        break;
      //Health insurance
      case "polish":
        prop[1] = "InsuranceHealth.Page2.polish";
        break;
      case "foreigner":
        prop[1] = "InsuranceHealth.Page2.foreigner";
        break;
      //Diagnostic insurance
      case "firm":
        prop[1] = "InsuranceDiagnostic.Page1.firm";
        break;
      case "individual":
        prop[1] = "InsuranceDiagnostic.Page1.individual";
        break;
      case "legal":
        prop[1] = "InsuranceDiagnostic.Page1.legal";
        break;
      //Travel insurance
      case "family":
        prop[1] = "InsuranceTravel.Page1.family";
        break;
      case "group":
        prop[1] = "InsuranceTravel.Page1.group";
        break;
      case "natural":
        prop[1] = "InsuranceTravel.Page2.natural";
        break;
      case "entrepreneurial":
        prop[1] = "InsuranceTravel.Page2.entrepreneurial";
        break;
      //Cash and Mortgage loan
      case "notMarried":
        prop[1] = "LoanCash.Page1.notMarried";
        break;
      case "married":
        prop[1] = "LoanCash.Page1.married";
        break;
      case "other":
        prop[1] = "LoanCash.ApplicantModal.other";
        break;
      case "temporaryCard":
        prop[1] = "LoanCash.ApplicantModal.temporaryCard";
        break;
      case "permanentCard":
        prop[1] = "LoanCash.ApplicantModal.permanentCard";
        break;
      case "blueCard":
        prop[1] = "LoanCash.ApplicantModal.blueCard";
        break;
      case "indefinitePeriod":
        prop[1] = "LoanCash.ApplicantModal.indefinitePeriod";
        break;
      case "specificTime":
        prop[1] = "LoanCash.ApplicantModal.specificTime";
        break;
      case "mandate":
        prop[1] = "LoanCash.ApplicantModal.mandate";
        break;
      case "contract":
        prop[1] = "LoanCash.ApplicantModal.contract";
        break;
      case "economicActivity":
        prop[1] = "LoanCash.ApplicantModal.economicActivity";
        break;
      case "generalRules":
        prop[1] = "LoanCash.ApplicantModal.generalRules";
        break;
      case "lumpSum":
        prop[1] = "LoanCash.ApplicantModal.lumpSum";
        break;
      case "taxCard":
        prop[1] = "LoanCash.ApplicantModal.taxCard";
        break;
      case "fullAccounting":
        prop[1] = "LoanCash.ApplicantModal.fullAccounting";
        break;
      default:
        break;
    }
  });
};

export default changeRadioValues;
