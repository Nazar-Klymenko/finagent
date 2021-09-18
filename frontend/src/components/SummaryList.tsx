import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { ArrowDown } from "@components/svgs";

interface Props {
  header: string;
  array: [];
  inDashboard?: boolean;
  defaultOpen?: boolean;
}
interface Styled {
  isOpen?: boolean;
  inDashboard?: boolean;
}

const SummaryList: React.FC<Props> = ({
  header,
  array,
  inDashboard,
  defaultOpen,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <SummaryListStyled inDashboard={inDashboard}>
      <Header inDashboard={inDashboard} onClick={toggleOpen}>
        {header}
        <ArrowWrap>
          <ArrowDown
            fill="#FFF"
            rotation={isOpen ? 180 : 0}
            width="16"
            height="10"
          />
        </ArrowWrap>
      </Header>
      <List isOpen={isOpen}>
        {array &&
          array.map((item: any, idx) => (
            <Category key={idx}>
              <span>{item[0]}</span>
              {Object.entries(item[1]).map((item: any, idx) => (
                <Item key={idx}>
                  <div className="value">{t(item[0])}</div>
                  <div className="name">{t(item[1])}</div>
                </Item>
              ))}
            </Category>
          ))}
      </List>
    </SummaryListStyled>
  );
};

const SummaryListStyled = styled.div<Styled>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  margin-top: ${({ inDashboard }) => (inDashboard ? "0rem" : "1rem")};

  border: 1px solid ${({ theme }) => theme.lightGray};
  box-shadow: 0px 0px 14px 2px rgba(0, 0, 0, 0.082);
`;
const Header = styled.div<Styled>`
  text-align: ${({ inDashboard }) => (inDashboard ? "left" : "center")};
  font-size: 1.2rem;
  color: white;
  background: ${({ theme }) => theme.blue};
  position: relative;
  padding: 8px 1.5rem;
  cursor: pointer;
`;
const ArrowWrap = styled.div<Styled>`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const List = styled.ul<Styled>`
  display: flex;
  flex-direction: column;
  ${({ isOpen }) =>
    !isOpen &&
    css`
      height: 0;
      overflow: hidden;
    `}
`;
const Category = styled.li`
  background: white;
  display: flex;
  flex-direction: column;
  span {
    font-weight: 500;
    padding: 8px 8px;
  }
`;
const Item = styled.div`
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

export default SummaryList;
