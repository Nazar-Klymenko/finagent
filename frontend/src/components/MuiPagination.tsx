import React from "react";

import Link from "next/link";

import PaginationItem from "@mui/lab/PaginationItem";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

interface Props {
  category: string;
  currentPage: number;
  status: "ready" | "pending";
  maximumPages: number;
}

const MuiPagination = ({
  category,
  currentPage,
  maximumPages,
  status,
}: Props): JSX.Element => {
  if (maximumPages === 0) {
    maximumPages = 1;
  }
  return (
    <PaginationStyled>
      <Pagination
        page={+currentPage}
        count={maximumPages}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            component="a"
            href={`/dashboard/${category}/${item.page}`}
            {...item}
          />
        )}
      />
    </PaginationStyled>
  );
};

const PaginationStyled = styled("div")`
  padding: 20px 20px;
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

export default MuiPagination;
