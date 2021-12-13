import React, { useEffect, useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";

import { deleteTicket, getTickets } from "@api/mainAPI";

import MuiPagination from "@components/MuiPagination";
import Subheader from "@components/Subheader";
import { FullPage } from "@components/content";
import { MuiTable, TableCell, TableRow } from "@components/table";

const Tickets = () => {
  const { t } = useTranslation();
  //@ts-ignore
  const { page } = useParams();

  const [maximumPages, setMaximumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(25);

  const fetchTickets = async (page = 0, size = 25) => {
    const { data } = await getTickets(page, size);
    setMaximumPages(data.maximumPages);
    return data;
  };

  let { data, error, isFetching, refetch } = useQuery(
    [`tickets-${currentPage}`, currentPage, size],
    () => fetchTickets(currentPage, size),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  async function deleteTicketFn(id: number) {
    try {
      await deleteTicket(id);
      refetch();
    } catch (error) {
      alert("error deleting ticket");
    }
  }
  return (
    <FullPage>
      <Subheader
        compact
        subheader={t("Applications.takenTitle")}
        description={t("Applications.takenSubtitle")}
      />
      <MuiTable headers={["Full name", "Email", "Message", "Date", "Delete"]}>
        {data?.tickets?.length > 0 &&
          data.tickets.map((ticket: any) => {
            const createdAt = new Date(ticket.createdAt).toLocaleDateString(
              "pl"
            );
            return (
              <TableRow key={ticket._id} hover>
                <TableCell>{ticket?.fullName}</TableCell>
                <TableCell>{ticket?.email}</TableCell>
                <TableCell>{ticket?.message}</TableCell>
                <TableCell>{createdAt}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      deleteTicketFn(ticket._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
      </MuiTable>
      <MuiPagination
        currentPage={currentPage}
        maximumPages={maximumPages}
        category="tickets"
        status="all"
      />
    </FullPage>
  );
};

export default Tickets;
