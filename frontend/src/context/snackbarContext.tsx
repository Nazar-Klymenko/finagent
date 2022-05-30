import { createContext, useContext, useState } from "react";

type SnackbarTypes = {
  severity: "error" | "warning" | "info" | "success";
  message: string;
  open?: boolean;
};
type SnackbarContextTypes = {
  snackbar: SnackbarTypes;
  setSnackbar: (obj: SnackbarTypes) => void;
};
interface Props {
  children: React.ReactElement;
}

const defaultState = {
  severity: "info",
  message: "",
  open: false,
} as SnackbarTypes;

export const SnackbarProvider = ({ children }: Props) => {
  const [snackbar, _setSnackbar] = useState(defaultState);

  function setSnackbar({ severity, message, open = true }: SnackbarTypes) {
    _setSnackbar({ severity, message, open });
  }

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        setSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const SnackbarContext = createContext<SnackbarContextTypes>({
  snackbar: defaultState,
  setSnackbar: (obj: SnackbarTypes) => Promise,
});

export const useSnackbar = () => useContext(SnackbarContext);
