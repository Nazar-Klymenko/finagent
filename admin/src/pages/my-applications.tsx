import { useEffect, useState } from "react";

import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { TableCell, TableRow } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import useSWR from "swr";

import { fetcher } from "@helpers/swrFetcher";
import withAuth from "@helpers/withAuth";

import useDatefnsLocalized from "@hooks/useDatefnsLocalized";

import { useAuth } from "@context/authContext";

import AssignCell from "@components/AssignCell";
import { Pagination } from "@components/Pagination";
import { Table } from "@components/Table";
import { PageContainer } from "@components/layout";

const MyApplications: NextPage = (props) => {
  const { formatDistanceToNow, format } = useDatefnsLocalized();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [maximumPages, setMaximumPages] = useState(1);
  const router = useRouter();

  let { data, error } = useSWR(
    `/admin/applications/my?page=${pageIndex}&size=${pageSize}`,
    fetcher
  );
  let applications = data?.applications;
  useEffect(() => {
    if (data) setMaximumPages(data.maximumPages);
  }, [data]);

  console.log(applications);
  return (
    <PageContainer title="Common.Pages.myApplications">
      <Typography variant="h4" component={"h3"}>
        My Applications
      </Typography>

      <Table
        headers={[
          "Applications.name",
          "Applications.email",
          "Applications.phone",
          "Applications.service",
          "Applications.type",
          "Applications.createdAt",
          "Applications.lastUpdate",
        ]}
      >
        {applications?.length > 0 &&
          applications.map((app: any) => {
            return (
              <TableRow
                key={app._id}
                onClick={() => {
                  router.push(`/application/${app._id}`);
                }}
                hover
              >
                <TableCell>{app.user?.fullName}</TableCell>
                <TableCell>{app.user?.email || "-"}</TableCell>
                <TableCell>{app.user?.phone || "-"}</TableCell>
                <TableCell>{app.category}</TableCell>
                <TableCell>{app.type}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(app.createdAt))}
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(app.updatedAt))}
                </TableCell>
              </TableRow>
            );
          })}
      </Table>

      <Pagination
        currentPage={pageIndex}
        setCurrentPage={setPageIndex}
        maximumPages={maximumPages}
      />
    </PageContainer>
  );
};

const DataWrapper = styled("div")`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default withAuth(MyApplications);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
