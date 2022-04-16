import React, { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { IconButton, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";

import { assignAplicationAPI } from "@api/applications";

interface Props {
  id: string;
  employee: { fullName: string };
}

const AssignCell: React.FC<Props> = ({ id, employee }): JSX.Element => {
  const [taken] = useState(!!employee);

  const assignApplication = async (id: any) => {
    try {
      await assignAplicationAPI(id);
    } catch {
      alert("error");
    }
  };

  return !taken ? (
    <TableCell>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          assignApplication(id);
        }}
      >
        <AddIcon />
      </IconButton>
    </TableCell>
  ) : (
    <TableCell>{employee?.fullName}</TableCell>
  );
};

export default AssignCell;
