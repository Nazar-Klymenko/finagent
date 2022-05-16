import React, { useCallback, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography } from "@mui/material";
import { css, styled } from "@mui/material/styles";
import _ from "lodash";
import { useTranslation } from "react-i18next";

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

const SummaryList = ({
  header,
  array,
  inDashboard,
  defaultOpen,
  applicationType,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <SummaryListStyled inDashboard={inDashboard}>
      <Header inDashboard={inDashboard} onClick={toggleOpen}>
        <Typography variant="h6" sx={{ flex: "1" }}>
          {header}
        </Typography>

        {isOpen ? (
          <KeyboardArrowUpIcon fontSize="large" />
        ) : (
          <KeyboardArrowDownIcon fontSize="large" />
        )}
      </Header>

      <List isOpen={isOpen}>
        {/*@ts-ignore */}
        {array?.length > 0 &&
          array?.map((item: any, idx: number) => {
            return (
              <React.Fragment key={idx}>
                <Category>
                  <Typography variant="h6" sx={{ p: "0.5rem" }}>
                    {t(`${applicationType}.Page${idx + 1}.subtitle`)}
                  </Typography>

                  {Object.entries(item[1]).map(
                    (subitem: any, subidx: number) => {
                      if (_.isArray(subitem[1])) {
                        return (
                          <ArrayList
                            key={subidx}
                            subitem={subitem}
                            applicationType={applicationType}
                            subidx={subidx}
                          />
                        );
                      } else {
                        return (
                          <Item key={subidx}>
                            <div className="value">
                              {t(
                                `${applicationType}.Page${idx + 1}.${
                                  subitem[0]
                                }`
                              )}
                            </div>
                            <div className="name">
                              {t(subitem[1]?.label) || t(subitem[1])}
                            </div>
                          </Item>
                        );
                      }
                    }
                  )}
                </Category>
              </React.Fragment>
            );
          })}
      </List>
    </SummaryListStyled>
  );
};
export { SummaryList };

const ArrayList = ({ subitem, applicationType, subidx }: any): JSX.Element => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      <ArrayListRow onClick={toggleOpen}>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        <Typography>
          {t(`${applicationType}.${subitem[0]}.label`) + ` ${subidx + 1}`}
        </Typography>
      </ArrayListRow>
      {isOpen &&
        subitem[1].map((nitem: any, nidx: number) =>
          Object.entries(nitem).map((pls: any, idxx) => (
            <ArrayItem key={nidx}>
              <div className="value">
                {t(`${applicationType}.${subitem[0]}.${pls[0]}`)}
              </div>
              <div className="name">{t(pls[1]?.label) || t(pls[1])}</div>
            </ArrayItem>
          ))
        )}
    </>
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

const List = styled("ul", {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<Styled>`
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

  &:hover {
    background: ${({ theme }) => theme.palette.grey[200]};
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

const ArrayListRow = styled("div")`
  cursor: pointer;
  display: flex;
  padding: 8px 12px;
  background: ${({ theme }) => theme.palette.grey[300]};
`;

const ArrayItem = styled(Item)`
  padding-left: 16px;
  .name {
  }
`;
