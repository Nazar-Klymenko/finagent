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

const AcceptOperators: NextPage = (props) => {
  const { formatDistanceToNow, format } = useDatefnsLocalized();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [maximumPages, setMaximumPages] = useState(1);
  const router = useRouter();

  let { data, error } = useSWR(
    `/admin/operators?page=${pageIndex}&size=${pageSize}`,
    fetcher
  );
  let operators = data?.operators;
  useEffect(() => {
    if (data) setMaximumPages(data.maximumPages);
  }, [data]);

  console.log(operators);
  return (
    <PageContainer title="Common.Pages.operators">
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
        {operators?.length > 0 &&
          operators.map((operator: any) => {
            return (
              <TableRow key={operator._id} hover>
                <TableCell>{operator.user?.fullName}</TableCell>
                <TableCell>{operator.user?.email || "-"}</TableCell>
                <TableCell>{operator.user?.phone || "-"}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(operator.createdAt))}
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(operator.updatedAt))}
                </TableCell>
                <TableCell>{operator.secret}</TableCell>
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

export default withAuth(AcceptOperators);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
