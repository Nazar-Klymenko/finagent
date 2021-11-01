import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

import {
  getSpecificApplicationAPI,
  assignAppAPI,
  returnAppAPI,
} from "@api/mainAPI";

import { returnApplicationToMainPoolAPI } from "@api/supervisorAPI";

import determineType from "@helpers/determineType";

import { BackArrow, AdminButton } from "@components/buttons";
import Subheader from "@components/Subheader";
import SummaryList from "@components/SummaryList";
import InfoCell from "@components/InfoCell";

import {
  ApplicationStatuses,
  ApplicationStatusesPreview,
} from "./localComponents/ApplicationStatuses";

import Feedback from "./localComponents/Feedback";
import FeedbackPreview from "./localComponents/FeedbackPreview";
import AttachDocuments from "./localComponents/AttachDocuments";
import Attachments from "./localComponents/Attachments";

import { FullPage } from "@components/content";

import { useQuery } from "react-query";

const ApplicationOpen = ({ returnTo }) => {
  const { t } = useTranslation();
  let { id } = useParams();
  let history = useHistory();

  const [isTaken, setIsTaken] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [isAssingLoading, setIsAssignLoading] = useState(false);
  const [isReturnLoading, setIsReturnLoading] = useState(false);

  const [fullName, setFullName] = useState("");

  const fetchData = async () => {
    const { data } = await getSpecificApplicationAPI(id);
    return data;
  };

  let { data, error, isFetching, refetch } = useQuery(
    [`cardOpen${id}`],
    () => fetchData(),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    setCreatedAt(new Date(data?.createdAt).toLocaleDateString("pl"));
    setUpdatedAt(moment(data?.updatedAt).fromNow());
    setFullName(data?.user?.name + " " + data?.user?.surname);
    setIsTaken(!!data?.employee_id);
  }, [data]);
  let appDataLabeled;

  if (data) {
    appDataLabeled = determineType(data?.type, data);
  }

  const assignApplication = async () => {
    try {
      setIsAssignLoading(true);
      await assignAppAPI(id);
      history.push("/my-applications");
    } catch (error) {
      alert("couln't assign the application");
    } finally {
      setIsAssignLoading(false);
    }
  };

  const returnApplication = async () => {
    try {
      setIsReturnLoading(true);
      await returnAppAPI(id);
      history.push("/applications/all");
    } catch (error) {
      alert("couln't return the application");
    } finally {
      setIsReturnLoading(false);
    }
  };
  const returnApplicationMainPool = async () => {
    try {
      setIsReturnLoading(true);
      await returnApplicationToMainPoolAPI(id);
      history.push("/applications/all");
    } catch (error) {
      alert("couln't return the application");
    } finally {
      setIsReturnLoading(false);
    }
  };

  return (
    <FullPage>
      {!isFetching && (
        <>
          <ApplicationHeader>
            <BackArrow returnTo={returnTo} />
            <ApplicationInfo>
              <InfoCell
                name={t("ApplicationOpen.AppInfo.name")}
                value={fullName}
              />
              <InfoCell
                name={t("ApplicationOpen.AppInfo.type")}
                value={data.type}
              />
              <InfoCell
                name={t("ApplicationOpen.AppInfo.addedAt")}
                value={createdAt}
              />
              <InfoCell
                name={t("ApplicationOpen.AppInfo.lastUpdate")}
                value={updatedAt}
              />
            </ApplicationInfo>
          </ApplicationHeader>
          <ApplicationBody>
            <Subheader
              subheader={t("ApplicationOpen.Summary.title")}
              description={t("ApplicationOpen.Summary.subtitle")}
            />
            <SummaryList
              inDashboard
              defaultOpen={false}
              header={t("ApplicationOpen.Summary.header")}
              array={appDataLabeled}
            />
            {isTaken ? (
              <ApplicationStatuses currentStatus={data.status} id={id} />
            ) : (
              <ApplicationStatusesPreview currentStatus={data.status} />
            )}
            {isTaken ? (
              <Feedback
                id={id}
                feedbackArray={data.feedback}
                defaultTime={data.createdAt}
              />
            ) : (
              <FeedbackPreview
                feedbackArray={data.feedback}
                defaultTime={data.createdAt}
              />
            )}

            {data?.documents?.length > 0 && (
              <>
                <Subheader
                  subheader={t("ApplicationOpen.AttachmentsUser.title")}
                  description={t("ApplicationOpen.AttachmentsUser.subtitle")}
                />
                <Attachments
                  attachments={[data?.documents?.[0]]}
                  id={id}
                  type="documents"
                />
              </>
            )}

            {data?.attachments?.length > 0 && (
              <>
                <Subheader
                  subheader={t("ApplicationOpen.AttachmentsAdmin.title")}
                  description={t("ApplicationOpen.AttachmentsAdmin.subtitle")}
                />
                <Attachments
                  id={id}
                  files={[data?.attachments?.[0]]}
                  type="attachments"
                />
              </>
            )}

            {isTaken && <AttachDocuments id={id} />}
            <ActionButtons>
              {!isTaken ? (
                <AdminButton
                  text={t("ApplicationOpen.AdminButton.addToMyApps")}
                  onClick={assignApplication}
                  loading={isAssingLoading}
                />
              ) : (
                <AdminButton
                  onClick={returnApplication}
                  text={t("ApplicationOpen.AdminButton.returnToApps")}
                  loading={isReturnLoading}
                  red
                />
              )}
            </ActionButtons>
          </ApplicationBody>
        </>
      )}
    </FullPage>
  );
};

export default ApplicationOpen;

const ApplicationHeader = styled.div`
  display: flex;
  align-items: center;
`;
const ApplicationInfo = styled.div`
  display: flex;
`;
const ApplicationBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const ActionButtons = styled.div`
  padding: 12px 0px;
  display: flex;
  justify-content: flex-end;
  flex: 1;
  align-items: flex-end;
`;
