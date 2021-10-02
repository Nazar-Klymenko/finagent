import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function ServiceCard({ to, image, imageAlt, header, description }) {
  const history = useHistory();

  function openService() {
    history.push(to);
  }
  return (
    <CardStyled onClick={openService}>
      <CardImage src={image} alt={imageAlt} />
      <CardContentWrap>
        <CardHeader>{header}</CardHeader>
        <CardDescription>{description}</CardDescription>
      </CardContentWrap>
    </CardStyled>
  );
}

export default ServiceCard;

const CardStyled = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 30px -16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  max-width: 340px;
  width: 340px;
  transition: 0.2s ease-in-out;
  /* background: ${({ theme }) => theme.lightBlue}; */

  &:hover {
    box-shadow: 0 5px 40px -16px rgba(0, 0, 0, 0.23);
    transform: translate(0, -2%);
  }
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    max-width: 250px;
    justify-self: center;
    margin-bottom: 1rem;
  }
`;

const CardImage = styled.img`
  height: 180px;
  padding: 24px;
`;

const CardContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;
  background-color: #ffffff;
  padding: 24px;

  width: 100%;
`;
const CardHeader = styled.h3`
  font-size: 17px;
  font-weight: 500;
`;
const CardDescription = styled.p`
  color: ${({ theme }) => theme.gray};
  font-size: 14px;
`;
