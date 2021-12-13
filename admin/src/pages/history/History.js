import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { getHistory } from "@api/mainAPI";

import MuiPagination from "@components/MuiPagination";
import Subheader from "@components/Subheader";
import { FullPage } from "@components/content";
import { MuiTable, TableCell, TableRow } from "@components/table";

import HistoryToggle from "./HistoryToggle";
import Record from "./Record";

const History = () => {
  const { t } = useTranslation();
  const { status, page } = useParams();

  const [maximumPages, setMaximumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(25);

  const fetchHistory = async (page = 0, status, size) => {
    const { data } = await getHistory(status, page, size);
    setMaximumPages(data.maximumPages);
    return data;
  };

  let { data, error, isFetching, refetch } = useQuery(
    [`history`, currentPage],
    () => fetchHistory(currentPage, status, size),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  );
  useEffect(() => {
    refetch();
    return refetch();
  }, [status, refetch]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <FullPage>
      <Subheader
        compact
        subheader={t("History.title")}
        description={t("History.subtitle")}
      />
      <HistoryToggle />
      <MuiTable
        headers={[
          "History.date",
          "History.time",
          "History.operator",
          "History.action",
          "History.description",
          "History.application",
        ]}
      >
        {data?.history?.length > 0 &&
          data.history.map((record, idx) => <Record row={record} key={idx} />)}
      </MuiTable>
      <MuiPagination
        category="history"
        status={status}
        currentPage={currentPage}
        maximumPages={maximumPages}
      />
    </FullPage>
  );
};
export default History;
