import React, { FC, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Table as MuiTable } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

interface Props {
  header: string;
  applicationType: string;
  array: any[];
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
            {array.map((item: any, idx: number) => (
              <div key={idx}>
                <span>{t(item[0])}</span>
                {Object.entries(item[1]).map((item: any, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="value">
                      {t(`${applicationType}.${item[0]}`)}
                    </TableCell>
                    <TableCell className="name">
                      {/* {t(`${applicationType}.${item[1]}`)} */}
                    </TableCell>
                  </TableRow>
                ))}
              </div>
            ))}
          </TableBody>
        )}
        {/* {open && (
          <TableBody>
            {array.length > 0 &&
              array.map((row: any, index: number) => {
                console.log("here");
                console.log(row);
                console.log(array);
                return (
                  <TableRow key={row[0]}>
                    <TableCell component="th" scope="row">
                      {t(`${applicationType}.${row[0]}`)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {t(`${applicationType}.${row[0]}`)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        )} */}
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

// {array.map((row: any) => (
//   <TableRow key={row[0]}>
//     <TableCell component="th" scope="row">
//       {t(`${applicationType}.${row[0]}`)}
//     </TableCell>
//     <TableCell component="th" scope="row">
//       {/* {row[1]} */}
//       {t(`${applicationType}.${row[0]}`)}
//     </TableCell>
//   </TableRow>
// ))}
//{fieldArray?.length > 0 &&
//fieldArray!.map((item, index) => <ArrayRow row={item} />)}

const TableContainerStyled = styled(TableContainer)<any>`
  ${({ open }) =>
    !open &&
    `
      box-shadow: none;
    `}
`;
const TableHeadStyled = styled(TableHead)`
  padding: 16px;
`;
const TableCellStyled = styled(TableCell)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  span {
    font-size: 1.2rem;
    color: white;
  }
`;
