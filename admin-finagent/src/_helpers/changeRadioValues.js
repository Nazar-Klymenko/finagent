const changeRadioValues = (obj) => {
  obj.forEach((prop) => {
    switch (prop[1]) {
      //Transport insurance
      case "oc":
        prop[1] = "InsuranceTransport.oc";
        break;
      case "ac":
        prop[1] = "InsuranceTransport.ac";
        break;
      case "greenCard":
        prop[1] = "InsuranceTransport.greenCard";
        break;
      case "assistance":
        prop[1] = "InsuranceTransport.assistance";
        break;
      case "pesel":
        prop[1] = "InsuranceTransport.pesel";
        break;
      case "regon":
        prop[1] = "InsuranceTransport.regon";
        break;
      case "passport":
        prop[1] = "InsuranceTransport.passport";
        break;
      case "left":
        prop[1] = "InsuranceTransport.left";
        break;
      case "right":
        prop[1] = "InsuranceTransport.right";
        break;
      case "mechanical":
        prop[1] = "InsuranceTransport.mechanical";
        break;
      case "automatic":
        prop[1] = "InsuranceTransport.automatic";
        break;
      //Estate insurance
      case "house":
        prop[1] = "InsuranceEstate.house";
        break;
      case "apartment":
        prop[1] = "InsuranceEstate.apartment";
        break;
      case "last":
        prop[1] = "InsuranceEstate.last";
        break;
      case "intermediate":
        prop[1] = "InsuranceEstate.intermediate";
        break;
      case "ground":
        prop[1] = "InsuranceEstate.ground";
        break;
      case "brick":
        prop[1] = "InsuranceEstate.brick";
        break;
      case "wood":
        prop[1] = "InsuranceEstate.wood";
        break;
      case "no":
        prop[1] = "InsuranceEstate.no";
        break;
      case "yes":
        prop[1] = "InsuranceEstate.yes";
        break;
      case "coOwnership":
        prop[1] = "InsuranceEstate.coOwnership";
        break;
      case "lease":
        prop[1] = "InsuranceEstate.lease";
        break;
      case "annual":
        prop[1] = "InsuranceEstate.annual";
        break;
      case "year3":
        prop[1] = "InsuranceEstate.year3";
        break;
      //Health insurance
      case "polish":
        prop[1] = "InsuranceHealth.polish";
        break;
      case "foreigner":
        prop[1] = "InsuranceHealth.foreigner";
        break;
      //Diagnostic insurance
      case "firm":
        prop[1] = "InsuranceDiagnostic.firm";
        break;
      case "individual":
        prop[1] = "InsuranceDiagnostic.individual";
        break;
      case "legal":
        prop[1] = "InsuranceDiagnostic.legal";
        break;
      //Travel insurance
      case "family":
        prop[1] = "InsuranceTravel.family";
        break;
      case "group":
        prop[1] = "InsuranceTravel.group";
        break;
      case "natural":
        prop[1] = "InsuranceTravel.natural";
        break;
      case "entrepreneurial":
        prop[1] = "InsuranceTravel.entrepreneurial";
        break;
      //Cash and Mortgage loan
      case "notMarried":
        prop[1] = "LoanCash.notMarried";
        break;
      case "married":
        prop[1] = "LoanCash.married";
        break;
      case "other":
        prop[1] = "LoanCash.other";
        break;
      case "temporaryCard":
        prop[1] = "LoanCash.temporaryCard";
        break;
      case "permanentCard":
        prop[1] = "LoanCash.permanentCard";
        break;
      case "blueCard":
        prop[1] = "LoanCash.blueCard";
        break;
      case "indefinitePeriod":
        prop[1] = "LoanCash.indefinitePeriod";
        break;
      case "specificTime":
        prop[1] = "LoanCash.specificTime";
        break;
      case "mandate":
        prop[1] = "LoanCash.mandate";
        break;
      case "contract":
        prop[1] = "LoanCash.contract";
        break;
      case "economicActivity":
        prop[1] = "LoanCash.economicActivity";
        break;
      case "generalRules":
        prop[1] = "LoanCash.generalRules";
        break;
      case "lumpSum":
        prop[1] = "LoanCash.lumpSum";
        break;
      case "taxCard":
        prop[1] = "LoanCash.taxCard";
        break;
      case "fullAccounting":
        prop[1] = "LoanCash.fullAccounting";
        break;
      default:
        break;
    }
  });
};

export default changeRadioValues;
