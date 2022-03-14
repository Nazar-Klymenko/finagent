export function pageOneValues(appDataValid) {
  return {
    maritalStatus: appDataValid?.maritalStatus || "notMarried",
    propertySeparation: appDataValid?.propertySeparation || "no",
    bothSpousesStart: appDataValid?.bothSpousesStart || "no",
  };
}
export function ApplicantValue(appDataValid) {
  return "applicant"[
    {
      truckDriver: appDataValid?.[0]?.truckDriver || "no",
      industry: appDataValid?.[0]?.industry,
      basicIncome: appDataValid?.[0]?.basicIncome || "indefinitePeriod",
      firstContract: appDataValid?.[0]?.firstContract || "yes",
      sameEmployer: appDataValid?.[0]?.sameEmployer || "yes",
      withoutPause: appDataValid?.[0]?.withoutPause || "yes",
      contractFrom: appDataValid?.[0]?.contractFrom,
      contractUntil: appDataValid?.[0]?.contractUntil,
      averageIncome: appDataValid?.[0]?.averageIncome,
      accountancy: appDataValid?.[0]?.accountancy || "generalRules",
      pit: appDataValid?.[0]?.pit,
    }
  ];
}
export function pageTwoValues(appDataValid) {
  return "income"[
    {
      truckDriver: appDataValid?.[0]?.truckDriver || "no",
      industry: appDataValid?.[0]?.industry,
      basicIncome: appDataValid?.[0]?.basicIncome || "indefinitePeriod",
      firstContract: appDataValid?.[0]?.firstContract || "yes",
      sameEmployer: appDataValid?.[0]?.sameEmployer || "yes",
      withoutPause: appDataValid?.[0]?.withoutPause || "yes",
      contractFrom: appDataValid?.[0]?.contractFrom,
      contractUntil: appDataValid?.[0]?.contractUntil,
      averageIncome: appDataValid?.[0]?.averageIncome,
      accountancy: appDataValid?.[0]?.accountancy || "generalRules",
      pit: appDataValid?.[0]?.pit,
    }
  ];
}
