import React, { FC, useState } from "react";

import { useTranslation } from "next-i18next";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  IconButton,
  Table as MuiTable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { css, styled } from "@mui/material/styles";

interface Props {
  header: string;
  applicationType: string;
  array: any;
  fieldArray?: any[];
}

const Table: FC<Props> = ({
  header,
  applicationType,
  array = [],
  fieldArray = [],
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  console.log(array);

  return (
    <TableContainerStyled open={open} component={Paper}>
      <MuiTable size="small">
        <TableHeadStyled>
          <TableRow>
            <TableCellStyled>
              <span>{header}</span>
            </TableCellStyled>

            <TableCellStyled align="right">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                color="inherit"
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCellStyled>
          </TableRow>
        </TableHeadStyled>

        {open && (
          <TableBody>
            {array.map((item: any, idx: number) => {
              return (
                <React.Fragment key={idx}>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="h6">
                        {t(`${applicationType}.${item[0]}`)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {Object.entries(item[1]).map((subitem: any, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell className="value">
                        {t(`${applicationType}.Page1.${subitem[0]}`)}
                      </TableCell>
                      <TableCell className="name" align="left">
                        {subitem[1]?.label || subitem[1]}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              );
            })}

            {/* {array.map((item: any, idx: number) => (
              <div key={idx}>
                <span>{t(item[0])}</span>
                {Object.entries(item[1]).map((item: any, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="value">
                      {t(`${applicationType}.${item[0]}`)}
                    </TableCell>
                    <TableCell className="name"></TableCell>
                  </TableRow>
                ))}
              </div>
            ))} */}
          </TableBody>
        )}
      </MuiTable>
    </TableContainerStyled>
  );
};

export default Table;

const TableContainerStyled = styled(TableContainer)<any>`
  ${({ open }) =>
    !open &&
    css`
      box-shadow: none;
    `}
`;
const TableHeadStyled = styled(TableHead)`
  padding: 16px;
`;
const TableCellStyled = styled(TableCell)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.white};
  span {
    font-size: 1.2rem;
    color: white;
  }
`;
