import React from "react";

import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";

interface Props {
  headers: string[];
  children: any;
}

const Table = ({ headers, children }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers!.map((header: any, idx: number) => (
              <TableCell key={idx}>{t(header)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export { Table };
