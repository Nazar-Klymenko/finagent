import React from "react";

import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

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
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}) {
    min-height: 150px;
  } ;
`;

const CardImage = styled("img")`
  height: 180px;
  padding: 24px;
  margin: 0 auto;
`;
