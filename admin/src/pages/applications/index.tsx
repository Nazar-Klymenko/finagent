import { useEffect, useState } from "react";

import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { TableCell, TableRow } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import useSWR, { useSWRConfig } from "swr";

import { fetcher } from "@helpers/swrFetcher";
import withAuth from "@helpers/withAuth";

import { assignAplicationAPI } from "@api/applications";

import useDatefnsLocalized from "@hooks/useDatefnsLocalized";

import { useAuth } from "@context/authContext";

import AssignCell from "@components/AssignCell";
import { Pagination } from "@components/Pagination";
import { Table } from "@components/Table";
import { PageContainer } from "@components/layout";

const Applications: NextPage = (props) => {
  const { formatDistanceToNow, format } = useDatefnsLocalized();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [maximumPages, setMaximumPages] = useState(1);
  const router = useRouter();

  let { data, error, mutate } = useSWR(
    `/admin/applications?page=${pageIndex}&size=${pageSize}`,
    fetcher
  );
  let applications = data?.applications;
  useEffect(() => {
    if (data) setMaximumPages(data.maximumPages);
  }, [data]);

  const assignApplication = async (id: any) => {
    try {
      await assignAplicationAPI(id);
      mutate();
    } catch {
      alert("error");
    }
  };

  return (
    <PageContainer title="test">
      <Typography variant="h4" component={"h3"}>
        Applications
      </Typography>

      <Table
        headers={[
          "Applications.admin",
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
                  router.push(`/applications/${app._id}`);
                }}
                hover
                sx={{ cursor: "pointer" }}
              >
                <AssignCell
                  assignApplication={assignApplication}
                  id={app._id}
                  employee={app.employee}
                />
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

export default withAuth(Applications);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
