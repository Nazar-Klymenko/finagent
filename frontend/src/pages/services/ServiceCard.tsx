import React from "react";

import { CardActionArea } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

interface Props {
  to: string;
  image: any;
  imageAlt: string;
  header: string;
  description: string;
}

function ServiceCard({ to, image, imageAlt, header, description }: Props) {
  const history = useHistory();

  function openService(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    history.push(to);
  }
  return (
    <CardActionArea
      onClick={(e) => {
        openService(e);
      }}
      href={to}
    >
      <CardStyled>
        <CardImage src={image} alt={imageAlt} />
        <CardContentStyled>
          <Typography align="left" variant="h6">
            {header}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContentStyled>
      </CardStyled>
    </CardActionArea>
  );
}

export default ServiceCard;

const CardStyled = styled(Card)`
  justify-content: center !important;
  align-items: center !important;
  display: flex !important;
  flex-direction: column !important;
  min-height: 400px;
`;
const CardContentStyled = styled(CardContent)`
  min-height: 200px;
  @media screen and (max-width: ${({ theme }) => theme.widthPhone}) {
    min-height: 150px;
  } ;
`;

const CardImage = styled.img`
  height: 180px;
  padding: 24px;
  margin: 0 auto;
`;

const CardHeader = styled.h3`
  font-size: 17px;
  font-weight: 500;
`;
const CardDescription = styled.p`
  color: ${({ theme }) => theme.gray};
  font-size: 14px;
`;
