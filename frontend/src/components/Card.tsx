import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";

interface Props {
  appDataForUser: any;
}

const Card: React.FC<Props> = ({ appDataForUser }) => {
  const { t } = useTranslation();
  const history = useHistory();

  let createdAt = new Date(appDataForUser.createdAt).toLocaleDateString("pl");
  let updatedAt = moment(appDataForUser.updatedAt).fromNow();

  const openCard = useCallback(() => {
    history.push(`/dashboard/application/${appDataForUser._id}`);
  }, [history, appDataForUser]);

  return (
    <CardWrap>
      <CardStyled onClick={openCard}>
        <Title>
          <h3>{t("Basic.ApplicationType." + appDataForUser?.type)}</h3>
        </Title>
        <Info>
          <StatusColor />
          <Cell>
            <span className="key">{t("Dashboard.ApplicationCard.name")}</span>
            <span className="value">{appDataForUser.user?.fullName}</span>
          </Cell>
          {/* <Cell>
            <span className="key">{t("Dashboard.ApplicationCard.type")}</span>
            <span className="value">
              {t("Basic.ApplicationType." + appDataForUser?.type)}
            </span>
          </Cell> */}
          <Cell>
            <span className="key">
              {t("Dashboard.ApplicationCard.createdAt")}
            </span>
            <span className="value">{createdAt}</span>
          </Cell>
          <Cell>
            <span className="key">
              {t("Dashboard.ApplicationCard.updatedAt")}
            </span>
            <span className="value">{updatedAt}</span>
          </Cell>
          <Cell>
            <span className="key">{t("Dashboard.ApplicationCard.status")}</span>
            <span className="value">{appDataForUser?.status}/5</span>
          </Cell>
        </Info>
      </CardStyled>
    </CardWrap>
  );
};

const CardWrap = styled.div`
  padding: 20px 20px 0px;
`;
const CardStyled = styled.div`
  cursor: pointer;
  padding: 10px 32px 20px;
  position: relative;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border};
  transition: 0.15s box-shadow ease-in-out;
  &::after {
    content: ">";
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    color: white;
    font-weight: 400;
    font-size: 1.5rem;
    width: 1.5rem;
    height: 100%;
    background: ${({ theme }) => theme.blue};
    border-radius: 0px 4px 4px 0px;
    opacity: 0;
    transition: 0.15s opacity ease-in-out;
  }
  &:hover {
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    &::after {
      opacity: 1;
    }
  }
  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    &::after {
      align-items: flex-start;
      opacity: 1;
      background: white;
      color: ${({ theme }) => theme.blue};
    }
  }
`;
const Title = styled.div``;

const Info = styled.div`
  display: flex;
  padding-top: 12px;
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    flex-direction: column;
  }
`;

const StatusColor = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 0.5rem;
  height: 100%;
  background: ${({ theme }) => theme.blue};
  border-radius: 4px 0px 0px 4px;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  min-width: max-content;
  width: 9rem;
  padding-right: 32px;

  .key {
    color: ${({ theme }) => theme.gray};
    font-size: 0.9rem;
  }

  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    flex-direction: row;
    align-items: center;
    padding: 0.4rem;
    .key {
      min-width: 180px;
    }
    .value {
      min-width: 180px;
      margin-left: 24px;
    }
  }
`;

export default Card;
