import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import { getNotificationsAPI } from "@api/userAPI";

import useTitle from "@hooks/useTitle";

import { ContentWrap } from "@components/content";

import MessageCard from "./MessageCard";

// import socket from "utils/ws";

const Notifications = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  useTitle("Notifications | FinAgent");

  useEffect(() => {
    getNotificationsAPI().then((response) => {
      setNotifications(response.data.NotificationList);
    });
  }, []);

  // useEffect(() => {
  //   socket.addEventListener("notification", function (event) {
  //     getNotificationsAPI().then((response) => {
  //       setNotifications(response.data.NotificationList);
  //     });
  //   });
  // }, [socket]);

  return (
    <ContentWrap>
      <NotificationsStyled>
        <NotificationsTitle>
          <h2>{t("Notifications.title")}</h2>
        </NotificationsTitle>
        {notifications.length === 0 && (
          <span>{t("Notifications.noNotifications")}</span>
        )}
        {notifications &&
          notifications.map((notification) => (
            <MessageCard key={notification._id} notification={notification} />
          ))}
      </NotificationsStyled>
    </ContentWrap>
  );
};

export default Notifications;

const NotificationsStyled = styled("div")`
  width: 100%;
  text-align: center;
`;
const NotificationsTitle = styled("div")`
  text-align: center;
  margin: 0.5rem 0;
  h2 {
    font-size: 1.5rem;
  }
`;
