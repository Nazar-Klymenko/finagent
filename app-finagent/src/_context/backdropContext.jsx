import React, { createContext, useContext, useState } from "react";

export const backdropContext = createContext();

export function useBackdrop() {
  return useContext(backdropContext);
}

export const BackDropProvider = ({ children }) => {
  const [isBackdropOpen, setBackdropOpen] = useState(false);

  return (
    <backdropContext.Provider
      value={{
        isBackdropOpen,
        setBackdropOpen,
      }}
    >
      {children}
    </backdropContext.Provider>
  );
};
