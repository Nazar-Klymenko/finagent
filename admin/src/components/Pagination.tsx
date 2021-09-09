import React from "react";
import { useState, useEffect } from "react";

import styled from "styled-components/macro";

interface Props {
  currentPage: number;
  setCurrentPage(currentPage: number): void;
  maximumPages: number;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  maximumPages,
}) => {
  const [previousEnable, setPreviousEnable] = useState(false);
  const [nextEnable, setNextEnable] = useState(true);

  useEffect(() => {
    if (currentPage > 1) {
      setPreviousEnable(true);
    } else {
      setPreviousEnable(false);
    }
    if (currentPage < maximumPages) {
      setNextEnable(true);
    } else {
      setNextEnable(false);
    }
  }, [currentPage, maximumPages]);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < maximumPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <PaginationStyled>
      <div className="container">
        <span
          className={`button ${previousEnable ? "" : "button--disabled"}`}
          onClick={previousPage}
        >
          {"<"}
        </span>
        <div className="page-number">{currentPage}</div>
        <span
          className={`button ${nextEnable ? "" : "button--disabled"}`}
          onClick={nextPage}
        >
          {">"}
        </span>
      </div>
    </PaginationStyled>
  );
};

const PaginationStyled = styled.div`
  padding: 20px 20px;
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  .container {
    display: flex;
    align-items: center;
  }
  .page-number {
    padding: 0px 6px;
    min-width: 28px;
    text-align: center;
    &::selection {
      background-color: transparent;
    }
  }
  .button {
    cursor: pointer;
    padding: 6px 10px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    &--disabled {
      background: ${({ theme }) => theme.lightestGray};
      cursor: not-allowed;
    }
    &::selection {
      background-color: transparent;
    }
  }
`;

export default Pagination;
