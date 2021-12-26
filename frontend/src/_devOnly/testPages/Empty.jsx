import React from "react";

import { styled } from "@mui/material/styles";

import Table from "@components/Table";
import { ContentWrap } from "@components/content";

const Empty = () => {
  return (
    <ContentWrap authForm direction="column">
      <Table
        header="test"
        applicationType="InsuranceDiagnostic.Page1"
        array={Object.entries(AppData)}
      />
    </ContentWrap>
  );
};

export default Empty;

const insuranceSpecialist = {
  personalData: {
    insuranceStart: "2021-12-09T11:19:51.803Z",
    insuranceEnd: "2021-12-09T11:19:51.813Z",
    policyholderIs: "individual",
    name: "nazar",
    surname: "klymenko",
    nip: "",
    birthDate: "2021-12-09T11:19:51.837Z",
    pesel: "1231237887887888888",
    regon: "",
    phoneNumber: "48123123123",
    email: "egtnxztbanmfubwjes@adfskj.com",
    country: "asd",
    city: "Warsaw",
    postIndex: "13231",
    street: "Aleje jerozolimskie",
    houseNumber: "12",
  },
  insuredData: {
    policyholderIs: "firm",
    name: "nazar",
    surname: "",
    nip: "123123",
    birthDate: null,
    pesel: "",
    regon: "45457",
    phoneNumber: "48123123123",
    email: "erer@gmail.com",
    country: "erer",
    city: "Warsaw",
    postIndex: "12323",
    street: "Aleje jerozolimskie",
    houseNumber: "12",
  },
};
const AppData = insuranceSpecialist;

// const insuranceSpecialist = {
//   personalData: {
//     insuranceStart: "2021-12-09T11:19:51.803Z",
//     insuranceEnd: "2021-12-09T11:19:51.813Z",
//     policyholderIs: "individual",
//     name: "nazar",
//     surname: "klymenko",
//     nip: "",
//     birthDate: "2021-12-09T11:19:51.837Z",
//     pesel: "1231237887887888888",
//     regon: "",
//     phoneNumber: "48123123123",
//     email: "egtnxztbanmfubwjes@adfskj.com",
//     country: "asd",
//     city: "Warsaw",
//     postIndex: "13231",
//     street: "Aleje jerozolimskie",
//     houseNumber: "12",
//   },
//   insuredData: {
//     policyholder: [
//       {
//         policyholderIs: "firm",
//         name: "nazar",
//         surname: "",
//         nip: "123123",
//         birthDate: null,
//         pesel: "",
//         regon: "45457",
//         phoneNumber: "48123123123",
//         email: "erer@gmail.com",
//         country: "erer",
//         city: "Warsaw",
//         postIndex: "12323",
//         street: "Aleje jerozolimskie",
//         houseNumber: "12",
//       },
//       {
//         policyholderIs: "legal",
//         name: "nazar",
//         surname: "",
//         nip: "123123",
//         birthDate: null,
//         pesel: "",
//         regon: "45457",
//         phoneNumber: "48123123123",
//         email: "erer@gmail.com",
//         country: "erer",
//         city: "Warsaw",
//         postIndex: "12323",
//         street: "Aleje jerozolimskie",
//         houseNumber: "12",
//       },
//     ],
//   },
// };
