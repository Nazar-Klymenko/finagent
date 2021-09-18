import React from "react";
import styled from "styled-components/macro";

import { useHistory } from "react-router-dom";

import { ArrowDown } from "@components/svgs";

const MessageCard = ({ notification }) => {
  const history = useHistory();

  let createdAt = new Date(notification.createdAt).toLocaleDateString("pl");
  let isRead = notification.read;

  const openNotification = () => {
    history.push(`/notifications/${notification._id}`);
  };

  return (
    <MessageCardStyled onClick={openNotification}>
      <NewLabel>
        {!isRead && (
          <>
            <BlueLabel />
            <span>NEW</span>
          </>
        )}
      </NewLabel>
      <MessageTitle>
        <h4>{notification.header}</h4>
        <ArrowDown rotation={-90} fill="#000000" />
      </MessageTitle>
      <MessageDate>{createdAt}</MessageDate>
    </MessageCardStyled>
  );
};

export default MessageCard;

const MessageCardStyled = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 110px;
  margin: 1rem 0;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;

const NewLabel = styled.div`
  top: 5px;
  left: 5px;
  position: absolute;
  display: flex;
  align-items: center;
  span {
    color: ${({ theme }) => theme.blue};
  }
`;
const BlueLabel = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.blue};
  border-radius: 3px;
  margin: 0 0.5rem;
`;

const MessageTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  h4 {
    font-size: 1.2rem;
    font-weight: 500;
    @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
      font-size: 1rem;
    }
  }
`;

const MessageDate = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.blue};
  right: 20px;
  bottom: 10px;
`;
