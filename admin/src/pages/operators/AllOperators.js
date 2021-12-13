import { useEffect, useState } from "react";

import { getAllOperatorsAPI } from "@api/supervisorAPI";

import { FullPage } from "@components/content";
import { MuiTable, TableCell, TableRow } from "@components/table";

import { OperatorsToggle } from "./index.js";

const AllOperators = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    getAllOperatorsAPI()
      .then((response) => {
        // console.log(response.data);
        setAdmins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <FullPage>
      <OperatorsToggle />
      <MuiTable
        headers={["Operators.name", "Operators.surname", "Operators.email"]}
      >
        {admins &&
          admins.map((user) => (
            <TableRow key={user._id} hover>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.surname}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
      </MuiTable>
    </FullPage>
  );
};

export default AllOperators;
