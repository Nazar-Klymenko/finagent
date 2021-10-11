const changeSelectValues = (obj) => {
  obj.forEach((prop) => {
    switch (prop[1]) {
      //Transport insurance
      case "unemployed":
        prop[1] = "InsuranceTransport.SelectProfession.unemployed";
        break;
      case "retired":
        prop[1] = "InsuranceTransport.SelectProfession.retired";
        break;
      case "housewife":
        prop[1] = "InsuranceTransport.SelectProfession.housewife";
        break;
      case "engineer":
        prop[1] = "InsuranceTransport.SelectProfession.engineer";
        break;
      case "management":
        prop[1] = "InsuranceTransport.SelectProfession.management";
        break;
      case "driver":
        prop[1] = "InsuranceTransport.SelectProfession.driver";
        break;
      case "doctor":
        prop[1] = "InsuranceTransport.SelectProfession.doctor";
        break;
      case "teacher":
        prop[1] = "InsuranceTransport.SelectProfession.teacher";
        break;
      case "operator":
        prop[1] = "InsuranceTransport.SelectProfession.operator";
        break;
      case "administration":
        prop[1] = "InsuranceTransport.SelectProfession.administration";
        break;
      case "office":
        prop[1] = "InsuranceTransport.SelectProfession.office";
        break;
      case "it":
        prop[1] = "InsuranceTransport.SelectProfession.it";
        break;
      case "customer":
        prop[1] = "InsuranceTransport.SelectProfession.customer";
        break;
      case "sales":
        prop[1] = "InsuranceTransport.SelectProfession.sales";
        break;
      case "physical":
        prop[1] = "InsuranceTransport.SelectProfession.physical";
        break;
      case "poczta":
        prop[1] = "InsuranceTransport.SelectProfession.poczta";
        break;
      case "education":
        prop[1] = "InsuranceTransport.SelectProfession.education";
        break;
      case "technical":
        prop[1] = "InsuranceTransport.SelectProfession.technical";
        break;
      case "lawyer":
        prop[1] = "InsuranceTransport.SelectProfession.lawyer";
        break;
      case "entrepreneur":
        prop[1] = "InsuranceTransport.SelectProfession.entrepreneur";
        break;
      case "comercial":
        prop[1] = "InsuranceTransport.SelectProfession.comercial";
        break;
      case "farmer":
        prop[1] = "InsuranceTransport.SelectProfession.farmer";
        break;
      case "uniformed":
        prop[1] = "InsuranceTransport.SelectProfession.uniformed";
        break;
      case "athlete":
        prop[1] = "InsuranceTransport.SelectProfession.athlete";
        break;
      case "student":
        prop[1] = "InsuranceTransport.SelectProfession.student";
        break;
      case "soldier":
        prop[1] = "InsuranceTransport.SelectProfession.soldier";
        break;
      case "other":
        prop[1] = "InsuranceTransport.SelectProfession.other";
        break;
      case "married":
        prop[1] = "InsuranceTransport.SelectMarital.married";
        break;
      case "single":
        prop[1] = "InsuranceTransport.SelectMarital.single";
        break;
      case "divorced":
        prop[1] = "InsuranceTransport.SelectMarital.divorced";
        break;
      case "widow":
        prop[1] = "InsuranceTransport.SelectMarital.widow";
        break;
      case "separation":
        prop[1] = "InsuranceTransport.SelectMarital.separation";
        break;
      case "petrol":
        prop[1] = "InsuranceTransport.SelectFuel.petrol";
        break;
      case "gas":
        prop[1] = "InsuranceTransport.SelectFuel.gas";
        break;
      case "diesel":
        prop[1] = "InsuranceTransport.SelectFuel.diesel";
        break;
      case "propane":
        prop[1] = "InsuranceTransport.SelectFuel.propane";
        break;
      case "electric":
        prop[1] = "InsuranceTransport.SelectFuel.electric";
        break;
      case "alarm":
        prop[1] = "InsuranceTransport.SelectSecurity.alarm";
        break;
      case "immob":
        prop[1] = "InsuranceTransport.SelectSecurity.immob";
        break;
      case "alarmImmob":
        prop[1] = "InsuranceTransport.SelectSecurity.alarmImmob";
        break;
      case "alarmImmonOther":
        prop[1] = "InsuranceTransport.SelectSecurity.alarmImmonOther";
        break;
      case "other":
        prop[1] = "InsuranceTransport.SelectSecurity.other";
        break;
      case "none":
        prop[1] = "InsuranceTransport.SelectSecurity.none";
        break;

      case "individual":
        prop[1] = "InsuranceTransport.SelectParking.individual";
        break;
      case "shared":
        prop[1] = "InsuranceTransport.SelectParking.shared";
        break;
      case "guarded":
        prop[1] = "InsuranceTransport.SelectParking.guarded";
        break;
      case "fenced":
        prop[1] = "InsuranceTransport.SelectParking.fenced";
        break;
      case "unsecured":
        prop[1] = "InsuranceTransport.SelectParking.unsecured";
        break;

      case "regular":
        prop[1] = "InsuranceTransport.SelectPurpose.regular";
        break;
      case "taxi":
        prop[1] = "InsuranceTransport.SelectPurpose.taxi";
        break;
      case "rent":
        prop[1] = "InsuranceTransport.SelectPurpose.rent";
        break;
      case "lease":
        prop[1] = "InsuranceTransport.SelectPurpose.lease";
        break;
      case "bank":
        prop[1] = "InsuranceTransport.SelectPurpose.bank";
        break;
      case "course":
        prop[1] = "InsuranceTransport.SelectPurpose.course";
        break;

      case "noUse":
        prop[1] = "InsuranceTransport.SelectAbroad.noUse";
        break;
      case "twoWeeks":
        prop[1] = "InsuranceTransport.SelectAbroad.twoWeeks";
        break;
      case "month":
        prop[1] = "InsuranceTransport.SelectAbroad.month";
        break;
      case "month2":
        prop[1] = "InsuranceTransport.SelectAbroad.month2";
        break;
      case "month6":
        prop[1] = "InsuranceTransport.SelectAbroad.month6";
        break;
      case "year":
        prop[1] = "InsuranceTransport.SelectAbroad.year";
        break;

      //Border insurance
      case "motorcycle":
        prop[1] = "InsuranceTransport.SelectVehicle.motorcycle";
        break;
      case "personal":
        prop[1] = "InsuranceTransport.SelectVehicle.personal";
        break;
      case "truck":
        prop[1] = "InsuranceTransport.SelectVehicle.truck";
        break;
      case "bus":
        prop[1] = "InsuranceTransport.SelectVehicle.bus";
        break;

      //Estate insurance

      case "supervision":
        prop[1] = "InsuranceEstate.SelectSecurity.supervision";
        break;
      case "securityDoors":
        prop[1] = "InsuranceEstate.SelectSecurity.securityDoors";
        break;
      case "intercom":
        prop[1] = "InsuranceEstate.SelectSecurity.intercom";
        break;
      case "windowSecurity":
        prop[1] = "InsuranceEstate.SelectSecurity.windowSecurity";
        break;
      case "notificationAlarm":
        prop[1] = "InsuranceEstate.SelectSecurity.notificationAlarm";
        break;
      case "localAlarm":
        prop[1] = "InsuranceEstate.SelectSecurity.localAlarm";
        break;
      case "none":
        prop[1] = "InsuranceEstate.SelectSecurity.none";
        break;

      //Health insurance

      //Diagnostic insurance

      //Travel insurance
      //Cash and Mortgage loan

      case "apartPur":
        prop[1] = "LoanMortgage.Page2.apartPur";
        break;
      case "housePur":
        prop[1] = "LoanCash.Page2.housePur";
        break;
      case "landPur":
        prop[1] = "LoanCash.Page2.landPur";
        break;
      case "houseConst":
        prop[1] = "LoanCash.Page2.houseConst";
        break;
      case "apartPurRen":
        prop[1] = "LoanCash.Page2.apartPurRen";
        break;
      case "housePurRen":
        prop[1] = "LoanCash.Page2.housePurRen";
        break;
      case "notMarried":
        prop[1] = "LoanCash.Page2.notMarried";
        break;

      case "primary":
        prop[1] = "LoanCash.Page2.primary";
        break;
      case "secondary":
        prop[1] = "LoanCash.Page2.secondary";
        break;
      case "yes":
        prop[1] = "LoanMortgage.Page2.yes";
        break;
      case "no":
        prop[1] = "LoanMortgage.Page2.no";
        break;

      case "equal":
        prop[1] = "LoanMortgage.Page2.equal";
        break;
      case "decreasing":
        prop[1] = "LoanMortgage.Page2.decreasing";
        break;

      default:
        break;
    }
  });
};

export default changeSelectValues;
