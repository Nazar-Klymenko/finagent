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
    oc: true,
    ac: false,
    greenCard: false,
    assistance: true,
    fullName: "asdasdasdasd asdasd",
    phoneNumber: "48876876876",
    voivodeship: "asdas",
    city: "123",
    street: "123",
    houseNumber: "123123",
    postIndex: "123",
    documentAddedType: "pesel",
    documentAdded: "123123",
    profession: "Lekarz / Pracownik służby zdrowia",
    maritalStatus: "Rozwiedziona / Rozwiedziony",
    isAppropLicence: true,
    drivingLicenceDate: "2022-01-06T13:11:39.000Z",
  },
  transportData: {
    brand: "Aston Martin",
    model: "123",
    version: "123",
    regNumber: "123",
    vinNumber: "123123",
    yearManufacture: "2019-01-30T13:11:52.633Z",
    registeredPoland: true,
  },
  specificData: {
    vehicleType: "Prywatny samochód",
    fuelType: "Diesel",
    enginePower: "12123",
    engineVolume: "1233",
    vehicleRegDate: "2022-01-16T13:12:08.000Z",
    techExamDate: "2022-01-23T13:12:01.000Z",
    purchaseYear: "2015-01-30T13:12:10.974Z",
    kilometrage: "123123",
    steeringWheel: "left",
    transmissionType: "mechanical",
    abroadImport: false,
  },
  additionalData: {
    predictMileage: "10 001 - 12 500",
    useAbroad: "Do dwóch tygodni",
    usePurpose: "Taxi",
    parkingPlace: "Indywidualny garaż",
    security: "Alarm, immobilizer i inne",
  },
  // appendedDocuments: {
  //   filesTechPassport: [
  //     {
  //       path: "1642616083488.jpg",
  //       preview:
  //         "blob:http://localhost:3000/9201f121-362b-4ee1-8032-7f50773b4bd1",
  //     },
  //     {
  //       path: "1642231648017.jpg",
  //       preview:
  //         "blob:http://localhost:3000/74315769-31c2-40a1-beac-117e7ada3fa2",
  //     },
  //     {
  //       path: "comment_1641362244rx5Mf724AqfBRMILreFGGT.jpg",
  //       preview:
  //         "blob:http://localhost:3000/a9d26b1d-fadb-448b-8b33-a92dacb4c6e3",
  //     },
  //   ],
  //   filesPassport: [
  //     {
  //       path: "cropper.jpg",
  //       preview:
  //         "blob:http://localhost:3000/02ff51b2-8368-4fc5-926f-b8e49f32c6ab",
  //     },
  //     {
  //       path: "image_2021-12-20_19-36-40.png",
  //       preview:
  //         "blob:http://localhost:3000/e5aa9ad5-72d3-415f-80b9-012ad804cbd4",
  //     },
  //     {
  //       path: "IMG_0710.JPG",
  //       preview:
  //         "blob:http://localhost:3000/c31f9090-1522-49ae-aeaf-338248a5d7d3",
  //     },
  //   ],
  //   filesInsurance: [
  //     {
  //       path: "cropper.jpg",
  //       preview:
  //         "blob:http://localhost:3000/a80daa38-dc01-44bf-9547-62e34359a8f4",
  //     },
  //     {
  //       path: "image_2021-12-20_19-36-40.png",
  //       preview:
  //         "blob:http://localhost:3000/91084a6c-626b-40ae-b5be-1a3f73deff8c",
  //     },
  //     {
  //       path: "IMG_0710.JPG",
  //       preview:
  //         "blob:http://localhost:3000/9a7f8e13-4848-43ad-ab6f-e5e9207305aa",
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
