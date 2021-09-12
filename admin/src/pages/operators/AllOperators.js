import { useState, useEffect } from "react";
import { getAllOperatorsAPI } from "@api/supervisorAPI";
import { FullPage } from "@components/content";
import Table from "@components/Table";
import { useTranslation } from "react-i18next";

import { OperatorsToggle } from "./index.js";

const AllOperators = () => {
  const { t } = useTranslation();
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
      <Table>
        <thead>
          <tr>
            <th>{t("Operators.name")}</th>
            <th>{t("Operators.surname")}</th>
            <th>{t("Operators.email")}</th>
          </tr>
        </thead>
        <tbody>
          {admins &&
            admins.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </FullPage>
  );
};

export default AllOperators;
