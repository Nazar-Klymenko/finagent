import { useEffect, useState } from "react";

import moment from "moment";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";

import { getApplications } from "@api/mainAPI";

import MuiPagination from "@components/MuiPagination";
import Subheader from "@components/Subheader";
import { FullPage } from "@components/content";
import { MuiTable, TableCell, TableRow } from "@components/table";

const MyApplications = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const status = "my-applications";
  const { page } = useParams();

  const [maximumPages, setMaximumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(25);

  const fetchApplications = async (page = 0, status, size) => {
    const { data } = await getApplications(status, page, size);
    setMaximumPages(data.maximumPages);
    return data;
  };

  let { data, error, isFetching, refetch } = useQuery(
    [`applications-${status}`, currentPage, size],
    () => fetchApplications(currentPage, status),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  );
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  return (
    <FullPage>
      <Subheader
        compact
        subheader={t("MyApplications.title")}
        description={t("MyApplications.subtitle")}
      />
      <MuiTable
        headers={[
          "Applications.name",
          "Applications.surname",
          "Applications.email",
          "Applications.service",
          "Applications.type",
          "Applications.createdAt",
          "Applications.lastUpdate",
        ]}
      >
        <tbody>
          {data?.applications?.length > 0 &&
            data.applications.map((app) => {
              const createdAt = new Date(app.createdAt).toLocaleDateString(
                "pl"
              );
              const updatedAt = moment(app.updatedAt).fromNow();

              return (
                <TableRow
                  key={app._id}
                  onClick={() => {
                    history.push(`/applications/open/${app._id}`);
                  }}
                  hover
                >
                  <TableCell>{app.user?.name}</TableCell>
                  <TableCell>{app.user?.surname}</TableCell>
                  <TableCell>{app.user?.email}</TableCell>
                  <TableCell>{app.user?.phone}</TableCell>
                  <TableCell>{app.category}</TableCell>
                  <TableCell>{app.type}</TableCell>
                  <TableCell>{createdAt}</TableCell>
                  <TableCell>{updatedAt}</TableCell>
                </TableRow>
              );
            })}
        </tbody>
      </MuiTable>
      <MuiPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maximumPages={maximumPages}
        category="applications"
        status="my-applications"
      />
    </FullPage>
  );
};
export default MyApplications;
