import React, { useEffect, useState } from "react";
import useTitle from "@hooks/useTitle";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { ContentWrap } from "@components/content";
import { useTranslation } from "react-i18next";

import MessageCard from "./MessageCard";

import { getNotificationsAPI } from "@api/userAPI";

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
    <ContentWrap fullHeight>
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

const NotificationsStyled = styled.div`
  width: 100%;
  text-align: center;
`;
const NotificationsTitle = styled.div`
  text-align: center;
  margin: 0.5rem 0;
  h2 {
    font-size: 1.5rem;
  }
`;
