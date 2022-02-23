import React, { useCallback } from "react";

import Link from "next/link";

import { Pagination as MuiPagination, PaginationItem } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  currentPage: number;
  maximumPages: number;
  setCurrentPage: (page: number) => void;
}

const _Pagination = ({
  currentPage,
  maximumPages,
  setCurrentPage,
}: Props): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <PaginationStyled>
      <MuiPagination
        page={currentPage}
        count={maximumPages || 1}
        shape="rounded"
        onChange={handleChange}
      />
    </PaginationStyled>
  );
};

const PaginationStyled = styled("div")`
  padding: 20px 20px;
  display: flex;
  /* flex: 1; */
  align-items: flex-end;
  justify-content: flex-end;
`;

const Pagination = React.memo(_Pagination);

export { Pagination };
