import React, { useState, useEffect } from "react";
import {
  getAwaitingOperatorsAPI,
  acceptOperatorAPI,
  declineOperatorAPI,
} from "@api/supervisorAPI.js";
import { useTranslation } from "react-i18next";

import { FullPage } from "@components/content";
import Table from "@components/Table";

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
      <Table>
        <thead>
          <tr>
            <th>{t("Operators.name")}</th>
            <th>{t("Operators.surname")}</th>
            <th>{t("Operators.email")}</th>
            <th>{t("Operators.secret")}</th>
            <th>{t("Operators.actionAccept")}</th>
            <th>{t("Operators.actionDecline")}</th>
          </tr>
        </thead>
        <tbody>
          {admins &&
            admins.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.secret}</td>
                <td>
                  <button
                    className="accept-cell"
                    onClick={() => {
                      acceptOperator(user._id);
                    }}
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    className="decline-cell"
                    onClick={() => {
                      declineOperator(user._id);
                    }}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </FullPage>
  );
};

export default AcceptOperators;
