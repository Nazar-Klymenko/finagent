import { useEffect, useState } from "react";

import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { TableCell, TableRow } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import useSWR, { useSWRConfig } from "swr";

import { fetcher } from "@helpers/swrFetcher";
import withAuth from "@helpers/withAuth";

import useDatefnsLocalized from "@hooks/useDatefnsLocalized";

import { useAuth } from "@context/authContext";

import AssignCell from "@components/AssignCell";
import { Pagination } from "@components/Pagination";
import { Table } from "@components/Table";
import { PageContainer } from "@components/layout";

const Clients: NextPage = (props) => {
  const { t } = useTranslation();
  const { formatDistanceToNow, format } = useDatefnsLocalized();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [maximumPages, setMaximumPages] = useState(1);
  const router = useRouter();

  let { data, error, mutate } = useSWR(
    `/admin/clients?page=${pageIndex}&size=${pageSize}`,
    fetcher
  );
  let clients = data?.clients;
  useEffect(() => {
    if (data) setMaximumPages(data.maximumPages);
  }, [data]);

  console.log({ data });
  return (
    <PageContainer title="Common.Pages.clients">
      <Typography variant="h4" component={"h3"}>
        {t("Clients.title")}
      </Typography>

      <Table
        headers={[
          "Clients.fullName",
          "Clients.email",
          "Clients.phone",
          "Clients.language",
          "Clients.provider",
          "Clients.isApproved",
          "Clients.createdAt",
        ]}
      >
        {clients?.length > 0 &&
          clients.map((client: any) => {
            return (
              <TableRow
                key={client._id}
                // onClick={() => {
                //   router.push(`/clients/${client._id}`);
                // }}
                hover
                // sx={{ cursor: "pointer" }}
              >
                <TableCell>{client?.fullName}</TableCell>
                <TableCell>{client?.email || "-"}</TableCell>
                <TableCell>{client?.phone || "-"}</TableCell>
                <TableCell>{client?.language || "-"}</TableCell>
                <TableCell>{client?.provider}</TableCell>
                <TableCell>{client?.isApproved + ""}</TableCell>
                <TableCell>{format(new Date(client.createdAt))}</TableCell>
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

export default withAuth(Clients);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
