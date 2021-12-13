import { useHistory } from "react-router-dom";

import { TableCell, TableRow } from "@components/table";

const Record = ({ row }) => {
  const history = useHistory();

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  let createdAt = new Date(row.createdAt).toLocaleDateString("pl");

  let hours = pad(new Date(row.createdAt).getHours().toString());
  let minutes = pad(new Date(row.createdAt).getMinutes().toString());
  let seconds = pad(new Date(row.createdAt).getSeconds().toString());

  const openApplication = (id) => {
    history.push(`/applications/${id}`);
  };

  return (
    <TableRow hover>
      <TableCell>{createdAt}</TableCell>
      <TableCell>{`${hours}:${minutes}:${seconds}`}</TableCell>
      <TableCell>{row.employee?.name}</TableCell>
      <TableCell>{row.action}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell
        onClick={() => {
          openApplication(row.application?._id);
        }}
      >
        {row.application?._id}
      </TableCell>
    </TableRow>
  );
};

export default Record;
