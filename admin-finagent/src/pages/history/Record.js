import { useHistory } from "react-router-dom";

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
    <tr>
      <td>{createdAt}</td>
      <td>{`${hours}:${minutes}:${seconds}`}</td>
      <td>{row.assignedEmployee?.name}</td>
      <td>{row.action}</td>
      <td>{row.description}</td>
      <td
        onClick={() => {
          openApplication(row.application?._id);
        }}
      >
        {row.application?._id}
      </td>
    </tr>
  );
};

export default Record;
