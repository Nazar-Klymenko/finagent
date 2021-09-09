import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState({});
  const [files, setFiles] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [allowSummary, setAllowSummary] = useState(false);

  const [peopleData, setPeopleData] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [addHouseholdData, setAddHouseholdData] = useState(null);

  const setValues = (values, wrapper) => {
    setAppData((prevData) => ({
      ...prevData,
      [wrapper]: { ...values },
    }));
  };
  const appendFiles = (files) => {
    setFiles(files);
  };

  return (
    <DataContext.Provider
      value={{
        appData,
        setValues,
        files,
        appendFiles,
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
