import React from "react";
import Subheader from "@components/Subheader";
import { useTranslation } from "react-i18next";

interface Props {
  currentStatus: number;
}

const ApplicationStatusesPreview: React.FC<Props> = ({ currentStatus }) => {
  const { t } = useTranslation();
  return (
    <>
      <Subheader
        subheader={t("ApplicationOpen.Status.title")}
        description={t("ApplicationOpen.Status.subtitle")}
      />
      <span>
        {t("ApplicationOpen.Status.currentStatus")}
        {currentStatus}
      </span>
    </>
  );
};
export default ApplicationStatusesPreview;
