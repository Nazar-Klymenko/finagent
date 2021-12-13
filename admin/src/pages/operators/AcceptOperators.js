import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import {
  acceptOperatorAPI,
  declineOperatorAPI,
  getAwaitingOperatorsAPI,
} from "@api/supervisorAPI.js";

import { FullPage } from "@components/content";
import { MuiTable, TableCell, TableRow } from "@components/table";

import { OperatorsToggle } from "./index.js";

const AcceptOperators = () => {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    getAwaitingOperatorsAPI()
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const acceptOperator = (id) => {
    acceptOperatorAPI(id)
      .then((response) => {
        getAwaitingOperatorsAPI()
          .then((response) => {
            setAdmins(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const declineOperator = (id) => {
    declineOperatorAPI(id)
      .then((response) => {
        getAwaitingOperatorsAPI()
          .then((response) => {
            setAdmins(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FullPage>
      <OperatorsToggle />
      <MuiTable
        headers={[
          "Operators.name",
          "Operators.surname",
          "Operators.email",
          "Operators.secret",
          "Operators.actionAccept",
          "Operators.actionDecline",
        ]}
      >
        {admins &&
          admins.map((user) => (
            <TableRow key={user._id} hover>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.surname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.secret}</TableCell>
              <TableCell>
                <button
                  className="accept-cell"
                  onClick={() => {
                    acceptOperator(user._id);
                  }}
                >
                  Accept
                </button>
              </TableCell>
              <TableCell>
                <button
                  className="decline-cell"
                  onClick={() => {
                    declineOperator(user._id);
                  }}
                >
                  Decline
                </button>
              </TableCell>
            </TableRow>
          ))}
      </MuiTable>
    </FullPage>
  );
};

export default AcceptOperators;
