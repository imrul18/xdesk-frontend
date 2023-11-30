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
          {row?.status ? "Deactive User" : "Active User"}
        </UncontrolledTooltip>
      </Link>
      {/* <Link
        className="text-truncate text-capitalize align-middle"
        to={`/user_edit/${row.id}`}
        id={`edit-${row.id}`}
      >
        <Edit size={18} className={`text-info me-50`} />
        <UncontrolledTooltip placement="top" target={`edit-${row.id}`}>
          {row?.status ? "Edit User" : "Edit User"}
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
          {row?.status ? "Delete User" : "Delete User"}
        </UncontrolledTooltip>
      </Link> */}
    </div>
  );
};

export const columns = [
  {
    name: "Username",
    minWidth: "220px",
    sortField: "username",
    selector: (row) => row.username,
    cell: (row) => <span>{row?.username}</span>,
  },
  {
    name: "Type",
    minWidth: "120px",
    sortField: "type",
    selector: (row) => row.type,
    cell: (row) => <span className="text-capitalize">{row?.user_type}</span>,
  },
  {
    name: "Zone",
    minWidth: "120px",
    sortField: "zone",
    selector: (row) => row.post_office,
    cell: (row) => (
      <span>{row?.post_office?.head_post_office?.zone?.name}</span>
    ),
  },
  {
    name: "Head Post Office",
    minWidth: "120px",
    sortField: "head_post_office",
    selector: (row) => row.post_office?.head_post_office,
    cell: (row) => <span>{row?.post_office?.head_post_office?.name}</span>,
  },
  {
    name: "Post Office",
    minWidth: "120px",
    sortField: "post_office",
    selector: (row) => row.post_office,
    cell: (row) => <span>{row?.post_office?.name}</span>,
  },
  {
    name: "Status",
    sortable: true,
    minWidth: "120px",
    sortField: "status",
    selector: (row) => row.status,
    cell: (row) => (
      <span className="text-capitalize">
        {row?.status ? "Active" : "Deactive"}
      </span>
    ),
  },
  {
    name: "Actions",
    minWidth: "120px",
    cell: (row) => renderAction(row),
  },
];
