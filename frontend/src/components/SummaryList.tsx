import React, { FC, useCallback, useState } from "react";

import { useTranslation } from "react-i18next";
import { css, styled } from "@mui/material/styles";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography } from "@mui/material";
interface Props {
  header: string;
  array: any[] | undefined;
  inDashboard?: boolean;
  defaultOpen?: boolean;
  applicationType: string;
}
interface Styled {
  isOpen?: boolean;
  inDashboard?: boolean;
}

const SummaryList: FC<Props> = ({
  header,
  array,
  inDashboard,
  defaultOpen,
  applicationType,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <SummaryListStyled inDashboard={inDashboard}>
      <Header inDashboard={inDashboard} onClick={toggleOpen}>
        <Typography sx={{ flex: "1" }}>{header}</Typography>

        {isOpen ? (
          <KeyboardArrowUpIcon fontSize="large" />
        ) : (
          <KeyboardArrowDownIcon fontSize="large" />
        )}
      </Header>

      <List isOpen={isOpen}>
        {array &&
          array.map((item: any, idx) => (
            <Category key={idx}>
              <Typography variant="h6">
                {t(`${applicationType}.${item[0]}`)}
              </Typography>
              {Object.entries(item[1]).map((subitem: any, idx) => (
                <Item key={idx}>
                  <div className="value">
                    {t(`${applicationType}.Page${idx + 1}.${subitem[0]}`)}
                  </div>
                  <div className="name"> {subitem[1]?.label || subitem[1]}</div>
                </Item>
              ))}
            </Category>
          ))}
      </List>
    </SummaryListStyled>
  );
};

const SummaryListStyled = styled("div")<Styled>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  margin: 16px 0;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  /* box-shadow: 0px 0px 14px 2px rgba(0, 0, 0, 0.082); */
`;
const Header = styled("div")<Styled>`
  cursor: pointer;
  text-align: ${({ inDashboard }) => (inDashboard ? "left" : "center")};
  font-size: 1.2rem;
  color: white;
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 8px 1.5rem;
  display: flex;
  align-items: center;
`;
const ArrowWrap = styled("div")<Styled>`
  padding-right: 1.5rem;
`;
const List = styled("ul")<Styled>`
  display: flex;
  flex-direction: column;
  ${({ isOpen }) =>
    !isOpen &&
    css`
      height: 0;
      overflow: hidden;
    `}
`;
const Category = styled("li")`
  background: white;
  display: flex;
  flex-direction: column;
  span {
    font-weight: 500;
    padding: 8px 8px;
  }
`;
const Item = styled("div")`
  display: flex;
  padding: 8px 12px;
  font-size: 0.85rem;

  &:nth-child(even) {
    background: #f5f4f4;
  }
  &:hover {
    background: #e9e9e9;
  }
  .name {
    flex: 1;
    padding: 0px 2px;
    min-width: 50%;
  }
  .value {
    flex: 1;
    padding: 0px 2px;
    min-width: 50%;
  }
`;

export { SummaryList };
