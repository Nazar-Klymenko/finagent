import React, { createContext, useState, useContext } from "react";

// import { getNewNotifications } from "@api/userAPI";

const notificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [newNotifications, setNewNotifications] = useState(false);

  const checkNotifications = async () => {
    // const response = await getNewNotifications();
    // setNewNotifications(response.data);
  };

  return (
    <notificationContext.Provider
      value={{
        newNotifications,
        setNewNotifications,
        checkNotifications,
      }}
    >
      {children}
    </notificationContext.Provider>
  );
};

export const useNotifications = () => useContext(notificationContext);
