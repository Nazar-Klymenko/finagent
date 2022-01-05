import React, { FC } from "react";

import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

interface Props {
  category: string;
  currentPage: number;
  status: "ready" | "pending";
  maximumPages: number;
}

const MuiPagination: FC<Props> = ({
  category,
  currentPage,
  maximumPages,
  status,
}) => {
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
            component={Link}
            to={`/dashboard/${category}/${status}/${item.page}`}
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
