import React, { createContext, useContext, useState } from "react";

export const alertContext = createContext();

export function useAlert() {
  return useContext(alertContext);
}

export const AlertProvider = ({ children }) => {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const closeAlert = () => {
    setStatus(false);
  };

  const setALert = (status, message) => {
    setStatus(status);
    setMessage(message);
    setAlertOpen(true);
  };
  return (
    <alertContext.Provider
      value={{
        isAlertOpen,
        message,
        status,
        closeAlert,
        setALert,
      }}
    >
      {children}
    </alertContext.Provider>
  );
};
