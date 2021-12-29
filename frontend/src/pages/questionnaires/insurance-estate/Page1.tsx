import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { MuiButton } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { DateInput, MuiInput, MuiRadio, MuiSelect } from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageOneSchema } from "./applicationHelpers/insurance-estate.schema";
import { nameSecurityOptions } from "./applicationHelpers/options";

type FormTypes = {
  country: string;
  city: string;
  postIndex: string;
  street: string;
  houseNumber: string;
  estateType: string;
  floor: string;
  structure: string;
  areaM2: string;
  constructionYear: string;
  underConstruction: boolean;
  ownershipForm: string;
  creditOwnership: string;
  bankName: string;
  regon: string;
  nip: string;
  security: string;
  damagesNumber: string;
  insurancePeriod: string;
  insuranceStart: Date;
  subjectAndSum: string;
  flatAndFixed: string;
  householdGoods: string;
};

const Page1 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Real estate insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = appData.insuranceEstate?.insuranceData;

  const methods = useForm<FormTypes>({
    defaultValues: {
      country: appDataValid?.country,
      city: appDataValid?.city,
      postIndex: appDataValid?.postIndex,
      street: appDataValid?.street,
      houseNumber: appDataValid?.houseNumber,
      estateType: appDataValid?.estateType || "house",
      floor: appDataValid?.floor || "last",
      structure: appDataValid?.structure || "brick",
      areaM2: appDataValid?.areaM2,
      constructionYear: appDataValid?.constructionYear,
      underConstruction: appDataValid?.underConstruction || "no",
      ownershipForm: appDataValid?.ownershipForm || "coOwnership",
      creditOwnership: appDataValid?.creditOwnership || "no",
      bankName: appDataValid?.bankName,
      regon: appDataValid?.regon,
      nip: appDataValid?.nip,
      security: appDataValid?.security,
      damagesNumber: appDataValid?.damagesNumber || "0",
      insurancePeriod: appDataValid?.insurancePeriod || "annual",
      insuranceStart: appDataValid?.insuranceStart,
      subjectAndSum: appDataValid?.subjectAndSum,
      flatAndFixed: appDataValid?.flatAndFixed,
      householdGoods: appDataValid?.householdGoods,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageOneSchema),
  });
  const { handleSubmit, watch } = methods;

  const estateType = watch("estateType", appDataValid?.estateType);
  const assignedToBank = watch(
    "creditOwnership",
    appDataValid?.creditOwnership
  );

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceEstate", "insuranceData");
    setCurrentPage(2);
    history.push("./2");
  });

  return (
    <ContentWrap>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceEstate.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={1}
          label={t("InsuranceEstate.Page1.title")}
        />
        <Subtitle>{t("InsuranceEstate.Page1.title")}</Subtitle>
        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <MuiInput
            name="country"
            labelName={t("InsuranceEstate.Page1.country")}
          />
          <MuiInput name="city" labelName={t("InsuranceEstate.Page1.city")} />
          <MuiInput
            name="postIndex"
            labelName={t("InsuranceEstate.Page1.postIndex")}
          />
          <MuiInput
            name="street"
            labelName={t("InsuranceEstate.Page1.street")}
          />
          <MuiInput
            name="houseNumber"
            labelName={t("InsuranceEstate.Page1.houseNumber")}
          />

          <MuiRadio
            name="estateType"
            legend={t("InsuranceEstate.Page1.estateType")}
            options={[
              {
                label: t("InsuranceEstate.Page1.house"),
                value: "house",
              },
              {
                label: t("InsuranceEstate.Page1.apartment"),
                value: "apartment",
              },
            ]}
          />
          {estateType === "apartment" && (
            <MuiRadio
              name="floor"
              legend={t("InsuranceEstate.Page1.floor")}
              options={[
                {
                  label: t("InsuranceEstate.Page1.last"),
                  value: "last",
                },
                {
                  label: t("InsuranceEstate.Page1.intermediate"),
                  value: "intermediate",
                },
                {
                  label: t("InsuranceEstate.Page1.ground"),
                  value: "ground",
                },
              ]}
            />
          )}

          <MuiRadio
            name="structure"
            legend={t("InsuranceEstate.Page1.structure")}
            options={[
              {
                label: t("InsuranceEstate.Page1.brick"),
                value: "brick",
              },
              {
                label: t("InsuranceEstate.Page1.wood"),
                value: "wood",
              },
            ]}
          />
          <MuiInput
            name="areaM2"
            labelName={t("InsuranceEstate.Page1.areaM2")}
          />
          <MuiInput
            name="constructionYear"
            labelName={t("InsuranceEstate.Page1.constructionYear")}
          />

          <MuiRadio
            name="underConstruction"
            legend={t("InsuranceEstate.Page1.underConstruction")}
            options={[
              {
                label: t("InsuranceEstate.Page1.no"),
                value: "no",
              },
              {
                label: t("InsuranceEstate.Page1.yes"),
                value: "yes",
              },
            ]}
          />

          <MuiRadio
            name="ownershipForm"
            legend={t("InsuranceEstate.Page1.ownershipForm")}
            options={[
              {
                label: t("InsuranceEstate.Page1.coOwnership"),
                value: "coOwnership",
              },
              {
                label: t("InsuranceEstate.Page1.lease"),
                value: "lease",
              },
            ]}
          />

          <MuiRadio
            name="creditOwnership"
            legend={t("InsuranceEstate.Page1.creditOwnership")}
            options={[
              {
                label: t("InsuranceEstate.Page1.no"),
                value: "no",
              },
              {
                label: t("InsuranceEstate.Page1.yes"),
                value: "yes",
              },
            ]}
          />
          {assignedToBank === "yes" && (
            <>
              <MuiInput
                name="bankName"
                labelName={t("InsuranceEstate.Page1.bankName")}
              />
              <MuiInput
                name="regon"
                labelName={t("InsuranceEstate.Page1.regon")}
              />
              <MuiInput name="nip" labelName={t("InsuranceEstate.Page1.nip")} />
            </>
          )}
          <MuiSelect
            name="security"
            labelName={t("InsuranceEstate.Page1.security")}
            defaultValue={appDataValid.security}
            optionArray={nameSecurityOptions}
          />

          <MuiRadio
            name="damagesNumber"
            legend={t("InsuranceEstate.Page1.damagesNumber")}
            options={[
              {
                label: "0",
                value: "0",
              },
              {
                label: "1",
                value: "1",
              },
              {
                label: "2",
                value: "2",
              },
              {
                label: "3+",
                value: "3+",
              },
            ]}
          />

          <MuiRadio
            name="insurancePeriod"
            legend={t("InsuranceEstate.Page1.insurancePeriod")}
            options={[
              {
                label: t("InsuranceEstate.Page1.annual"),
                value: "annual",
              },
              {
                label: t("InsuranceEstate.Page1.year3"),
                value: "year3",
              },
            ]}
          />
          <DateInput
            name="insuranceStart"
            labelName={t("InsuranceEstate.Page1.insuranceStart")}
            defaultValue={appDataValid.insuranceStartDate}
            disablePast
            placeholder={t("Form.Placeholder.dateFull")}
          />
          <Subtitle>{t("InsuranceEstate.Page1.subjectAndSum")}</Subtitle>
          <MuiInput
            name="flatAndFixed"
            labelName={t("InsuranceEstate.Page1.flatAndFixed")}
            placeholder="200 000 zl"
          />
          <MuiInput
            name="householdGoods"
            labelName={t("InsuranceEstate.Page1.householdGoods")}
            placeholder="100 000 zl"
          />
        </Form>
        <ButtonsWrap>
          <MuiButton text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
