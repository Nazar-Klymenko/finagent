import React, { FC, useState } from "react";

import { Table as MuiTable } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";

interface Props {
  header: string;
  applicationType: string;
  object: any[];
  array?: any[];
}

const Table: FC<Props> = ({ header, applicationType, object, array }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  return (
    <TableContainerStyled open={open} component={Paper}>
      <MuiTable>
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
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCellStyled>
          </TableRow>
        </TableHeadStyled>

        {open && (
          <TableBody>
            {object.map((row: any) => (
              <TableRow key={row[0]}>
                <TableCell component="th" scope="row">
                  {t(`${applicationType}.${row[0]}`)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {/* {row[1]} */}
                  {t(`${applicationType}.${row[0]}`)}
                </TableCell>
              </TableRow>
            ))}

            {array!.map((item, index) => (
              <ArrayRow row={item} />
            ))}
          </TableBody>
        )}
      </MuiTable>
    </TableContainerStyled>
  );
};

const ArrayRow = ({ row }: { row: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TableRow
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <TableCell component="th" scope="row">
          {row[0]}
        </TableCell>
        <TableCell component="th" scope="row">
          {row[0]}
        </TableCell>
      </TableRow>
    </>
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
  background-color: ${({ theme }) => theme.blue};
  span {
    font-size: 1.2rem;
    color: white;
  }
`;
