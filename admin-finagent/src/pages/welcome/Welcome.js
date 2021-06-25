import { useTranslation } from "react-i18next";

const Welcome = () => {
  const { t } = useTranslation();
  return (
    <div className="welcome-page">
      <div>
        <h1>{t("Welcome.title")}</h1>
        <p>{t("Welcome.subtitle")}</p>
      </div>
    </div>
  );
};

export default Welcome;
