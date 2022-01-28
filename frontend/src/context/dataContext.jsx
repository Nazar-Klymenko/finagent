import React, { createContext, useContext, useState } from "react";

export const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    insuranceTransport: {
      personalData: {
        oc: false,
        ac: false,
        greenCard: false,
        assistance: false,
        fullName: "",
        phoneNumber: "",
        postIndex: "",
        city: "",
        voivodeship: "",
        street: "",
        houseNumber: "",
        documentAddedType: "pesel",
        documentAdded: "",
        isAppropLicence: true,
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
    insuranceBorder: {},
    insuranceHealth: {},
    insuranceEstate: {},
    insuranceSpecialist: {},
    insuranceTravel: {},
    loanCash: {},
    loanMortgage: {},
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [allowSummary, setAllowSummary] = useState(false);

  const setValues = (values, type, category) => {
    setAppData((prevData) => ({
      ...prevData,
      [type]: { ...prevData[type], [category]: values },
    }));
  };
  const clearAppData = () => {
    setAppData({
      insuranceBorder: {},
      insuranceTransport: {},
      insuranceEstate: {},
      insuranceHealth: {},
      insuranceSpecialist: {},
      insuranceTravel: {},
      loanCash: {},
      loanMortgage: {},
    });
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
  appData: {
    insuranceTransport: {
      personalData: {
        oc: false,
        ac: false,
        greenCard: false,
        assistance: false,
        fullName: "",
        phoneNumber: "",
        postIndex: "",
        city: "",
        voivodeship: "",
        street: "",
        houseNumber: "",
        documentAddedType: "pesel",
        documentAdded: "",
        isAppropLicence: true,
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
    insuranceBorder: {},
    insuranceHealth: {},
    insuranceEstate: {},
    insuranceSpecialist: {},
    insuranceTravel: {},
    loanCash: {},
    loanMortgage: {},
  },
  setValues: (values, type, category) => Promise,
  setCurrentPage: (page) => Promise,
  setAllowSummary: (boolean) => Promise,
});
export const useData = () => useContext(DataContext);
