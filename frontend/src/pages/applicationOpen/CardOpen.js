import React from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { getSpecificApplication } from "@api/userAPI";

import determineType from "@helpers/determineType";

import SummaryList from "@components/SummaryList";
import ApplicationStatus from "./Status";
import Feedback from "./Feedback";

import { ArrowDown } from "@components/svgs";
import Subheader from "@components/typography/Subheader";

import Attachments from "./Attachments";
import Archive from "./Archive";

import { useQuery } from "react-query";
import ErrorRefetch from "@components/ErrorRefetch";

const CardOpen = () => {
  const { t } = useTranslation();
  let { id } = useParams();
  let history = useHistory();

  const fetchData = async () => {
    const { data } = await getSpecificApplication(id);
    return data;
  };

  let { data, error, isFetching, refetch } = useQuery(
    [`cardOpen${id}`],
    () => fetchData(),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  );
  let addDataLabeled;
  let createdAt = new Date(data?.createdAt).toLocaleDateString("pl");
  let updatedAt = moment(data?.updatedAt).fromNow();
  if (data) {
    addDataLabeled = determineType(data?.type, data);
  }

  return (
    <CardStyled>
      <>
        <CardHeader>
          <div
            onClick={() => {
              history.goBack();
            }}
            className="arrow-wrap"
          >
            <ArrowDown fill="#1a1b1e" rotation={90} />
          </div>
          <p>{t("Basic.ApplicationType." + data?.type)}</p>
        </CardHeader>

        {!isFetching && error && (
          <ErrorRefetch text="Error fetching application" callback={refetch} />
        )}

        {!isFetching && !error && (
          <>
            <Info>
              <InfoWrap>
                <span className="name">{t("ApplicationOpen.name")}</span>
                <span className="value">
                  {data?.user?.name + " " + data?.user?.surname}
                </span>
              </InfoWrap>
              {/* <InfoWrap>
                <span className="name">{t("ApplicationOpen.type")}</span>
                <span className="value">{data?.type}</span>
              </InfoWrap> */}
              <InfoWrap>
                <span className="name">{t("ApplicationOpen.createdAt")}</span>
                <span className="value">{createdAt}</span>
              </InfoWrap>
              <InfoWrap>
                <span className="name">{t("ApplicationOpen.updatedAt")}</span>
                <span className="value">{updatedAt}</span>
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

            <Feedback
              defaultTime={data?.createdAt}
              messageArray={data?.feedback}
            />

            <Subheader
              subheader={t("ApplicationOpen.Attachments.title")}
              description={t("ApplicationOpen.Attachments.subtitle")}
            />
            <Attachments
              attachments={[data?.documents]}
              id={id}
              type="documents"
            />

            <Subheader
              subheader={t("ApplicationOpen.FinalDocument.title")}
              description={t("ApplicationOpen.FinalDocument.subtitle")}
            />

            <Attachments
              attachments={[data?.attachments]}
              id={id}
              type="attachments"
            />

            {!data?.archived && <Archive id={id} />}
          </>
        )}
      </>
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
  .name {
    color: ${({ theme }) => theme.gray};
  }

  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    flex-direction: row;
    .name {
      min-width: 180px;
    }
    .value {
      margin-left: 24px;
    }
  }
`;
