import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Record from "./Record";
import { getAllHistoryAPI } from "@api/mainAPI";
import { FullPage } from "@components/content";
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import Subheader from "@components/Subheader";
import HistoryToggle from "./HistoryToggle";

const HistoryAll = () => {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllHistoryAPI();
        const historyReversed = await response.data.HistoryList.reverse();
        setHistory(historyReversed);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 25;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const maximumPages = history.length / cardsPerPage;

  const historyShown = history.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <FullPage>
      <Subheader
        compact
        subheader={t("History.title")}
        description={t("History.subtitle")}
      />
      <HistoryToggle />
      <Table>
        <thead>
          <tr>
            <th>{t("History.date")}</th>
            <th>{t("History.time")}</th>
            <th>{t("History.operator")}</th>
            <th>{t("History.action")}</th>
            <th>{t("History.description")}</th>
            <th>{t("History.application")}</th>
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            {historyShown &&
              historyShown.map((record, idx) => (
                <Record row={record} key={idx} />
              ))}
          </tbody>
        )}
      </Table>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maximumPages={maximumPages}
      />
    </FullPage>
  );
};
export default HistoryAll;
