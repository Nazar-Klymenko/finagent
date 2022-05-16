import React, { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { IconButton, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";

import { assignAplicationAPI } from "@api/applications";

interface Props {
  id: string;
  employee: { fullName: string };
  assignApplication: (id: string) => void;
}

const AssignCell = ({
  id,
  employee,
  assignApplication,
}: Props): JSX.Element => {
  const [taken, setTaken] = useState(!!employee);

  useEffect(() => {
    setTaken(!!employee);
  }, [employee]);

  return !taken ? (
    <TableCell>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          assignApplication(id);
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </TableCell>
  ) : (
    <TableCell>{employee?.fullName}</TableCell>
  );
};

export default AssignCell;
