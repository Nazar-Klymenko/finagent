import { useEffect, useState } from "react";
import { getSpecificNotificationAPI } from "@api/userAPI";
import styled from "styled-components/macro";

import { useParams, useHistory } from "react-router-dom";

import { useNotifications } from "@context/notificationContext";

import { BackArrow } from "@components/buttons";

const NotificationsOpen = () => {
  const { checkNotifications } = useNotifications();

  let { id } = useParams();
  let history = useHistory();

  const [notification, setNotification] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let createdAt = new Date(notification.createdAt).toLocaleDateString("pl");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSpecificNotificationAPI(id);
        setNotification(response.data.SpecificNotification);
        setIsLoading(false);
        checkNotifications();
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <NotificationStyled>
      {!isLoading && (
        <NotficationBody>
          <NotificationHeader>
            <ButtonPosition>
              <BackArrow returnTo="/notifications/" />
            </ButtonPosition>
            <h3>{notification.header}</h3>
          </NotificationHeader>
          <NotificationContent>{notification.content}</NotificationContent>
          <ToAppRedirect
            onClick={() => {
              history.push(`/dashboard/application/${notification.app_id}`);
            }}
          >
            Go to this application
          </ToAppRedirect>
          <CreatedAt>Added at {createdAt}</CreatedAt>
        </NotficationBody>
      )}
    </NotificationStyled>
  );
};

export default NotificationsOpen;

const NotificationStyled = styled.div`
  position: relative;
  width: 60%;
  flex: 1;
  min-height: 50%;
  padding: 1rem;
  padding-bottom: 90px;
  margin: 1rem auto;
  border-radius: 14px;
  box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.08);
  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    margin: unset;
    min-height: 85vh;
    width: 100%;
    border-radius: 0;
  }
`;
const NotficationBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const NotificationHeader = styled.div`
  text-align: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #cccccc;
  }
`;
const ButtonPosition = styled.div`
  position: absolute;
  left: 0rem;
  top: 0rem;
`;
const NotificationContent = styled.p`
  margin-top: 1rem;
`;
const ToAppRedirect = styled.p`
  cursor: pointer;
  color: ${({ theme }) => theme.blue};
`;
const CreatedAt = styled.span`
  color: ${({ theme }) => theme.blue};
  position: absolute;
  bottom: 1rem;
  left: 1rem;
`;
