import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Table from "@components/Table";
import { PageContainer } from "@components/layout";

const DevTable = () => {
  return (
    <PageContainer xs title="table">
      <Table
        header="test"
        applicationType="InsuranceTransport"
        array={Object.entries(array)}
      ></Table>
    </PageContainer>
  );
};

export default DevTable;

const array = {
  personalData: {
    oc: false,
    ac: true,
    greenCard: true,
    assistance: false,
    fullName: "asdasdasdasd asdasd",
    phoneNumber: "48876876876",
    voivodeship: "asdas",
    city: "123",
    street: "123",
    houseNumber: "123123",
    postIndex: "123",
    documentAddedType: "pesel",
    documentAdded: "123123",
    profession: "Kadra zarządzająca / menedżerska",
    maritalStatus: "Panna / Kawaler",
    isAppropLicence: true,
    drivingLicenceDate: "2022-01-23T22:48:15.000Z",
  },
  transportData: {
    brand: "Bugatti",
    model: "123",
    version: "123",
    regNumber: "123",
    vinNumber: "123123",
    yearManufacture: "2019-01-27T22:54:27.382Z",
    registeredPoland: true,
  },
  specificData: {
    vehicleType: "Prywatny samochód",
    fuelType: "Benzyna",
    enginePower: "12123",
    engineVolume: "1233",
    vehicleRegDate: "2022-01-09T22:54:37.000Z",
    techExamDate: "2022-01-09T22:54:40.000Z",
    purchaseYear: "2015-01-27T22:54:42.283Z",
    kilometrage: "123123",
    steeringWheel: "left",
    transmissionType: "mechanical",
    abroadImport: false,
  },
  additionalData: {
    predictMileage: "30 001 - 35 000",
    useAbroad: "Do 2 miesięcy",
    usePurpose: "Wynajem",
    parkingPlace: "Indywidualny garaż",
    security: "Alarm, immobilizer i inne",
  },
  // appendedDocuments: {
  //   filesTechPassport: [
  //     {
  //       path: "1642616083488.jpg",
  //       preview:
  //         "blob:http://localhost:3000/eb065285-206f-464f-9699-f4382b4d0272",
  //     },
  //   ],
  //   filesPassport: [
  //     {
  //       path: "1642616083488.jpg",
  //       preview:
  //         "blob:http://localhost:3000/f5d9b2d1-a0ea-461e-9961-542c5efee875",
  //     },
  //   ],
  //   filesInsurance: [
  //     {
  //       path: "1642616083488.jpg",
  //       preview:
  //         "blob:http://localhost:3000/923f1013-a4f6-404e-b229-b541ed2abb3a",
  //     },
  //   ],
  //   isFirstOwner: true,
  // },
};
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
