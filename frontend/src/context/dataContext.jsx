import React, { createContext, useContext, useState } from "react";

const defaultAppData = {
  insuranceBorder: {
    insuranceData: {
      documentType: "",
      pesel: "",
      passportNumber: "",
      registeredNotInEU: "no",
      insurancePeriod: "",
    },
    vehicleData: {
      vehicleType: "",
      vehicleTypeOther: "",
      brand: "",
      model: "",
      regNumber: "",
      vinNumber: "",
      engineNumber: "",
      engineVolume: "",
      seatNumber: "",
    },
    personalData: {
      name: "",
      phoneNumber: "",
      email: "",
      country: "",
      city: "",
      postIndex: "",
      street: "",
      houseNumber: "",
    },
  },
  insuranceEstate: {
    insuranceData: {
      country: "",
      city: "",
      postIndex: "",
      street: "",
      houseNumber: "",
      estateType: "house",
      floor: "last",
      structure: "brick",
      areaM2: "",
      constructionYear: "",
      underConstruction: "no",
      ownershipForm: "coOwnership",
      creditOwnership: "no",
      bankName: "",
      regon: "",
      nip: "",
      security: "",
      damagesNumber: "0",
      insurancePeriod: "annual",
      insuranceStart: null,
      subjectAndSum: "",
      flatAndFixed: "",
      householdGoods: "",
    },
    personalData: {
      policyholderIs: "",
      name: "",
      pesel: "",
      firmName: "",
      nip: "",
      regon: "",
      phone: "",
      email: "",
      peopleNumber: "",
    },
  },
  insuranceHealth: {
    insuranceData: {
      insuranceStart: null,
      insuranceEnd: null,
      clauseOne: true,
      clauseTwo: false,
      clauseThree: false,
      clauseOnePrice: "",
      clauseTwoPrice: "",
      clauseThreePrice: "",
    },
    insuredData: {
      // policyholder: [
      //   {
      //     policyholderIs: "polish",
      //     citizenship: "",
      //     name: "",
      //     documentAdded: "",
      //     birthDate: null,
      //     country: "",
      //     city: "",
      //     postIndex: "",
      //     street: "",
      //     houseNumber: "",
      //   },
      // ],
    },
  },
  insuranceSpecialist: {
    personalData: {
      insuranceStart: null,
      insuranceEnd: null,
      policyholderIs: "individual",
      name: "",
      companyName: "",
      birthDate: null,
      nip: "",
      pesel: "",
      regon: "",
      phoneNumber: "",
      email: "",
      country: "",
      city: "",
      postIndex: "",
      street: "",
      houseNumber: "",
    },
    insuredData: {
      // policyholder: [
      //   {
      //     policyholderIs: "firm",
      //     citizenship: "",
      //     name: "",
      //     nip: "",
      //     pesel: "",
      //     regon: "",
      //     phoneNumber: "",
      //     email: "",
      //     documentAdded: "",
      //     birthDate: null,
      //     country: "",
      //     city: "",
      //     postIndex: "",
      //     street: "",
      //     houseNumber: "",
      //   },
      // ],
    },
  },
  insuranceTransport: {
    personalData: {
      oc: false,
      ac: false,
      greenCard: false,
      assistance: false,
      policyholderIs: "individual",
      name: "",
      companyName: "",
      phoneNumber: "",
      postIndex: "",
      city: "",
      voivodeship: "",
      street: "",
      houseNumber: "",
      documentAddedType: "pesel",
      documentAdded: "",
      nip: "",
      isAppropLicence: true,
      birthDate: null,
      drivingLicenceDate: null,
      profession: "",
      maritalStatus: "",
    },
    transportData: {
      registeredPoland: true,
      brand: "",
      model: "",
      version: "",
      regNumber: "",
      vinNumber: "",
      yearManufacture: null,
    },
    specificData: {
      vehicleType: "",
      vehicleTypeOther: "",
      enginePower: "",
      engineVolume: "",
      fuelType: "",
      steeringWheel: "left",
      transmissionType: "mechanical",
      abroadImport: false,
      purchaseYear: null,
      kilometrage: "",
      techExamDate: null,
      vehicleRegDate: null,
      polandRegDate: null,
    },
    additionalData: {
      predictMileage: "",
      useAbroad: "",
      usePurpose: "",
      parkingPlace: "",
      security: "",
    },
    appendedDocuments: {
      filesTechPassport: null,
      filesPassport: null,
      filesCarSale: null,
      filesInsurance: null,
      isFirstOwner: true,
    },
  },
  insuranceTravel: {
    insuranceData: {
      insuranceType: "individual",
      insuranceStart: null,
      insuranceEnd: null,
      peopleAmount: "",
      destination: "",
      purpose: "",
      inPoland: false,
    },
    personalData: {
      policyholderIs: "natural",
      name: "",
      birthDate: null,
      pesel: "",
      nip: "",
      regon: "",
      phone: "",
      email: "",
      country: "",
      city: "",
      postIndex: "",
      street: "",
      houseNumber: "",
    },
  },
  loanCash: {
    applicantData: {
      maritalStatus: "notMarried",
      propertySeparation: "no",
      bothSpousesStart: "no",
      // applicant: [
      //   {
      //     otherNation: "no",
      //     nationality: "polish",
      //     validFrom: null,
      //     validUntil: null,
      //     name: "",
      //     birthDate: null,
      //     phoneNumber: "",
      //     email: "",
      //     pesel: "",
      //     contractFrom: null,
      //     contractUntil: null,
      //     averageIncome: "",
      //     currency: "",
      //     pit: "",
      //     bank: "",
      //   },
      // ],
    },
    incomeData: {
      // income: [
      //   {
      //     truckDriver: "no",
      //     industry: "",
      //     basicIncome: "indefinitePeriod",
      //     firstContract: "yes",
      //     sameEmployer: "yes",
      //     withoutPause: "yes",
      //     contractFrom: null,
      //     contractUntil: null,
      //     averageIncome: "",
      //     accountancy: "generalRules",
      //     pit: "",
      //     bank: "",
      //   },
      // ],
    },
    loanData: {
      remainingPayOff: "",
      lastApplications: "",
      custody: "",
      loanPurpose: "",
      loanAmount: "",
      paymentTerm: "",
      conditions: false,
    },
  },
  loanMortgage: {
    applicantData: {
      maritalStatus: "notMarried",
      propertySeparation: "no",
      bothSpousesStart: "no",
      // applicant: [
      //   {
      //     otherNation: "no",
      //     nationality: "polish",
      //     validFrom: null,
      //     validUntil: null,
      //     name: "",
      //     birthDate: null,
      //     phoneNumber: "",
      //     email: "",
      //     pesel: "",
      //     contractFrom: null,
      //     contractUntil: null,
      //     averageIncome: "",
      //     currency: "",
      //     pit: "",
      //     bank: "",
      //   },
      // ],
    },
    incomeData: {
      // income: [
      //   {
      //     truckDriver: "no",
      //     industry: "",
      //     basicIncome: "indefinitePeriod",
      //     firstContract: "yes",
      //     sameEmployer: "yes",
      //     withoutPause: "yes",
      //     contractFrom: null,
      //     contractUntil: null,
      //     averageIncome: "",
      //     accountancy: "generalRules",
      //     pit: "",
      //     bank: "",
      //   },
      // ],
    },
    loanData: {
      custody: "",
      monthlyLoanPayments: "",
      cardLimits: "",
      loanPurpose: "",
      rialto: "",
      propertyValue: "",
      renovationValue: "",
      contributionAmount: "",
      paymentTerm: "",
      repayment: "",
      monthlyPayments: "",
      voivodeship: "",
      town: "",
      conditions: false,
    },
  },
};

export const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState(defaultAppData);

  const [currentPage, setCurrentPage] = useState(1);
  const [allowSummary, setAllowSummary] = useState(false);

  const setValues = (values, type, category) => {
    console.log({ values });
    console.log({ type });
    console.log({ category });
    console.log({ appData });
    setAppData((prevData) => ({
      ...prevData,
      [type]: { ...prevData[type], [category]: values },
    }));
  };
  const clearAppData = () => {
    setAppData(defaultAppData);
  };

  return (
    <DataContext.Provider
      value={{
        appData,
        setValues,
        clearAppData,
        currentPage,
        setCurrentPage,
        allowSummary,
        setAllowSummary,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const DataContext = createContext({
  appData: defaultAppData,
  setValues: (values, type, category) => Promise,
  setCurrentPage: (page) => Promise,
  setAllowSummary: (boolean) => Promise,
});
export const useData = () => useContext(DataContext);
