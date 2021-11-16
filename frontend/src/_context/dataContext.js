import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    insuranceBorder: {},
    insuranceTransport: {},
    insuranceEstate: {},
    insuranceHealth: {},
    insuranceSpecialist: {},
    insuranceTravel: {},
    loanCash: {},
    loanMortgage: {},
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [allowSummary, setAllowSummary] = useState(false);

  const [peopleData, setPeopleData] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [addHouseholdData, setAddHouseholdData] = useState(null);

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
        peopleData,
        setPeopleData,
        additionalData,
        setAdditionalData,
        addHouseholdData,
        setAddHouseholdData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
