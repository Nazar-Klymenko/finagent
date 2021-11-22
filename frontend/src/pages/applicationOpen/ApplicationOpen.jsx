import React, { useEffect, useState } from "react";

import moment from "moment";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import determineType from "@helpers/determineType";

import { getSpecificApplication } from "@api/userAPI";

import ErrorRefetch from "@components/ErrorRefetch";
import Loader from "@components/Loader";
import SummaryList from "@components/SummaryList";
import { BackArrow } from "@components/buttons";
import Subheader from "@components/typography/Subheader";

import Archive from "./Archive";
import Attachments from "./Attachments";
import Feedback from "./Feedback";
import ApplicationStatus from "./Status";

const CardOpen = () => {
  const { t } = useTranslation();
  let { id } = useParams();
  let history = useHistory();

  const [updatedAt, setUpdatedAt] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [addDataLabeled, setAddDataLabeled] = useState(null);

  const fetchData = async () => {
    const { data } = await getSpecificApplication(id);
    return data;
  };

  let { data, error, isLoading, refetch } = useQuery(
    [`cardOpen${id}`],
    () => fetchData(),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (!isLoading && data) {
      setUpdatedAt(moment(data?.updatedAt).fromNow());
      setCreatedAt(new Date(data?.createdAt).toLocaleDateString("pl"));
      setAddDataLabeled(determineType(data?.type, data));
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <Loader />;
  }
  if (!isLoading && error) {
    return (
      <ErrorRefetch text="Error fetching application" callback={refetch} />
    );
  }

  return (
    <CardStyled>
      <CardHeader>
        <BackArrow />
        <p>{t("Basic.ApplicationType." + data?.type)}</p>
      </CardHeader>

      <Info>
        <InfoWrap>
          <InfoKey>{t("ApplicationOpen.name")}</InfoKey>
          <InfoValue>{data?.user?.fullName}</InfoValue>
        </InfoWrap>
        <InfoWrap>
          <InfoKey>{t("ApplicationOpen.createdAt")}</InfoKey>
          <InfoValue>{createdAt}</InfoValue>
        </InfoWrap>
        <InfoWrap>
          <InfoKey>{t("ApplicationOpen.updatedAt")}</InfoKey>
          <InfoValue>{updatedAt}</InfoValue>
        </InfoWrap>
      </Info>

      <Subheader
        subheader={t("ApplicationOpen.Summary.title")}
        description={t("ApplicationOpen.Summary.subtitle")}
      />
      <SummaryList
        inDashboard
        header={t("ApplicationOpen.Summary.summary")}
        array={addDataLabeled}
      />

      <Subheader
        subheader={t("ApplicationOpen.Status.title")}
        description={t("ApplicationOpen.Status.subtitle")}
      />
      <ApplicationStatus currentStep={data?.status} />

      <Subheader
        subheader={t("ApplicationOpen.Feedback.title")}
        description={t("ApplicationOpen.Feedback.subtitle")}
      />
      <Feedback defaultTime={data?.createdAt} messageArray={data?.feedback} />

      <Subheader
        subheader={t("ApplicationOpen.Attachments.title")}
        description={t("ApplicationOpen.Attachments.subtitle")}
      />
      <Attachments attachments={[data?.documents]} id={id} type="documents" />

      <Subheader
        subheader={t("ApplicationOpen.FinalDocument.title")}
        description={t("ApplicationOpen.FinalDocument.subtitle")}
      />

      <Attachments
        attachments={[data?.attachments]}
        id={id}
        type="attachments"
      />

      {!data?.archived && <Archive id={id} callback={refetch} />}
    </CardStyled>
  );
};

export default CardOpen;

const CardStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  margin: -10px -20px 0px -20px;
  padding-bottom: 10px;
  .arrow-wrap {
    margin-left: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 999px;
    height: 1.8rem;
    width: 1.8rem;
    transition: 0.1s background-color ease-in-out;
    &:hover {
      background-color: ${({ theme }) => theme.lightGray};
    }
  }
  p {
    font-weight: 400;
    font-size: 1.1rem;
    margin-left: 0.5rem;
  }
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    border-bottom: 1px solid transparent;
  }
`;

const Info = styled.div`
  display: flex;
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    flex-direction: column;
  }
`;
const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 3rem 1rem 0rem;
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    flex-direction: row;
  }
`;

const InfoKey = styled.span`
  color: ${({ theme }) => theme.gray};
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    min-width: 180px;
  }
`;
const InfoValue = styled.span`
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    margin-left: 24px;
  }
`;
