import { Moon, Sun } from "react-feather";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";
import { updateStatus } from "../store";

const renderAction = (row) => {
  const dispatch = useDispatch();
  return (
    <div className="column-action">
      <Link
        className="text-truncate text-capitalize align-middle"
        onClick={(e) => {
          e.preventDefault();
          dispatch(updateStatus(row.id));
        }}
      >
        {row?.status ? (
          <Moon
            size={18}
            className={`text-info me-50`}
            id={`status-${row.id}`}
          />
        ) : (
          <Sun
            size={18}
            className={`text-info me-50`}
            id={`status-${row.id}`}
          />
        )}
        <UncontrolledTooltip placement="top" target={`status-${row.id}`}>
          {row?.status ? "Deactive Post Office" : "Active Post Office"}
        </UncontrolledTooltip>
      </Link>
      {/* <Link
        className="text-truncate text-capitalize align-middle"
        to={`/head_post_office_edit/${row.id}`}
        id={`edit-${row.id}`}
      >
        <Edit size={18} className={`text-info me-50`} />
        <UncontrolledTooltip placement="top" target={`edit-${row.id}`}>
          {row?.status ? "Edit Post Office" : "Edit Post Office"}
        </UncontrolledTooltip>
      </Link>
      <Link
        className="text-truncate text-capitalize align-middle"
        id={`delete-${row.id}`}
        onClick={(e) => {
          e.preventDefault();
          dispatch(deleteData(row.id));
        }}
      >
        <Trash2 size={18} className={`text-info me-50`} />
        <UncontrolledTooltip placement="top" target={`delete-${row.id}`}>
          {row?.status ? "Delete Post Office" : "Delete Post Office"}
        </UncontrolledTooltip>
      </Link> */}
    </div>
  );
};

export const columns = [
  {
    name: "Code-Name",
    sortable: true,
    minWidth: "250px",
    sortField: "name",
    selector: (row) => row.name,
    cell: (row) => (
      <span className="fw-bolder">
        {row?.code}-{row?.name}
      </span>
    ),
  },
  {
    name: "Zone",
    sortable: true,
    minWidth: "120px",
    sortField: "name",
    selector: (row) => row.name,
    cell: (row) => (
      <span className="fw-bolder">
        {row?.zone?.name}
      </span>
    ),
  },
  {
    name: "Address",
    sortable: true,
    minWidth: "180px",
    sortField: "email",
    selector: (row) => row.phone,
    cell: (row) => <span className="text-capitalize">{row?.address}</span>,
  },
  {
    name: "Status",
    sortable: true,
    minWidth: "100px",
    sortField: "role",
    selector: (row) => row.phone,
    cell: (row) => (
      <span className="text-capitalize">
        {row?.status ? "Active" : "Deactive"}
      </span>
    ),
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => renderAction(row),
  },
];
