import React from "react";

import { useRouter } from "next/router";

import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  to: string;
  image: any;
  header: string;
  description: string;
}

const ServiceCard = ({
  to,
  image,
  header,
  description,
}: Props): JSX.Element => {
  const router = useRouter();

  function openService(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    router.push(to);
  }
  return (
    <CardActionArea
      onClick={(e) => {
        openService(e);
      }}
      href={to}
    >
      <CardStyled>
        <CardImage src={image} alt="" />
        <CardContentStyled>
          <Typography align="left" variant="h6">
            {header}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContentStyled>
      </CardStyled>
    </CardActionArea>
  );
};
export { ServiceCard };

const CardStyled = styled(Card)`
  justify-content: center !important;
  align-items: center !important;
  display: flex !important;
  flex-direction: column !important;
  min-height: 400px;
`;
const CardContentStyled = styled(CardContent)`
  min-height: 200px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    min-height: 150px;
  }
`;

const CardImage = styled("img")`
  height: 180px;
  padding: 24px;
  margin: 0 auto;
`;
