import React, { useState, useEffect } from "react";
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

import ApplicationStatuses from "./localComponents/ApplicationStatuses";
import ApplicationStatusesPreview from "./localComponents/ApplicationStatusesPreview";

import Feedback from "./localComponents/Feedback";
import FeedbackPreview from "./localComponents/FeedbackPreview";
import AttachDocuments from "./localComponents/AttachDocuments";
import Attachments from "./localComponents/Attachments";
import Thumbnails from "@components/Thumbnails";

import { FullPage } from "@components/content";

import styled from "styled-components";

const ApplicationOpen = ({ returnTo }) => {
  const { t } = useTranslation();

  let { id } = useParams();
  let history = useHistory();

  const [application, setApplication] = useState({});
  const [appDataLabeled, setAppDataLabeled] = useState([]);
  const [isTaken, setIsTaken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const [isDeclineLoading, setIsDeclineLoading] = useState(false);
  const [isAssingLoading, setIsAssignLoading] = useState(false);
  const [isReturnLoading, setIsReturnLoading] = useState(false);

  const [addedAt, setAddedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSpecificApplicationAPI(id);
        setApplication(response.data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      setAppDataLabeled(determineType(application.type, application));
      setAddedAt(new Date(application.createdAt).toLocaleDateString("pl"));
      setUpdatedAt(moment(application.updatedAt).fromNow());
      setFullName(application.user?.name + " " + application.user?.surname);
      setIsTaken(!!application.employee_id);
    }
  }, [application, isLoading]);

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
      {!isLoading && (
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
                value={application.type}
              />
              <InfoCell
                name={t("ApplicationOpen.AppInfo.addedAt")}
                value={addedAt}
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
              <ApplicationStatuses currentStatus={application.status} id={id} />
            ) : (
              <ApplicationStatusesPreview currentStatus={application.status} />
            )}
            {isTaken ? (
              <Feedback
                setApplication={setApplication}
                id={id}
                feedbackArray={application.feedback}
                defaultTime={application.createdAt}
              />
            ) : (
              <FeedbackPreview
                feedbackArray={application.feedback}
                defaultTime={application.createdAt}
              />
            )}
            <Subheader
              subheader={t("ApplicationOpen.AttachmentsUser.title")}
              description={t("ApplicationOpen.AttachmentsUser.subtitle")}
            />
            <Attachments
              attachments={[application?.documents]}
              id={id}
              type="documents"
            />
            <Subheader
              subheader={t("ApplicationOpen.AttachmentsAdmin.title")}
              description={t("ApplicationOpen.AttachmentsAdmin.subtitle")}
            />
            <Attachments
              id={id}
              files={[application?.attachments]}
              type="attachments"
            />
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
