import React from "react";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useAuth } from "@context/authContext";

const Avatar = () => {
  const { currentUser } = useAuth();
  const { displayName } = currentUser;

  return (
    <AvatarStyled>
      <AvatarCircle>{displayName?.[0]}</AvatarCircle>
      <Name>{displayName}</Name>
    </AvatarStyled>
  );
};

export default Avatar;

const AvatarStyled = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  @media screen and (max-width: ${({ theme }) => theme.widthPhone}) {
    padding: 12px 0;
  }
`;

const AvatarCircle = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  background: blue;
  font-size: 1rem;
  /* font-weight: 500; */
  color: white;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  margin-left: 0.5rem;
`;
