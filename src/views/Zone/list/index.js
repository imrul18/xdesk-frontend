import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Fragment, useEffect } from "react";
import DataTable from "react-data-table-component";
import { DebounceInput } from "react-debounce-input";
import { ChevronDown, PlusCircle } from "react-feather";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";
import { getAllData, setParams } from "./../store/index";
import { columns } from "./columns";

const index = () => {
  const dispatch = useDispatch();
  const { data, params, paramsData } = useSelector(
    (state) => state.zones
  );

  useEffect(() => {
    dispatch(getAllData());
  }, [params]);

  const CustomHeader = () => {
    const navigate = useNavigate();
    return (
      <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
        <Row>
          <Col xl="2"></Col>
          <Col
            xl="4"
            className="d-flex align-items-end align-content-center flex-wrap"
          >
            <div>Search by Zone code/name</div>
          </Col>
          <Col
            xl="3"
            className="d-flex align-items-sm-start justify-content-xl-start justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center table-header-actions w-100">
              <DebounceInput
                className="form-control"
                color="primary"
                debounceTimeout={1000}
                placeholder="Search Here"
                autoFocus
                value={params?.q}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(setParams({ ...params, q: e.target.value }));
                }}
              />
            </div>
          </Col>
          <Col
            xl="3"
            className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center table-header-actions">
              <Button
                className="add-new-user"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/zone_add");
                }}
              >
                <PlusCircle size={14} /> New Zone
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  const CustomPagination = () => {
    const count = Number(Math.ceil(paramsData?.total / params?.perPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={
          params?.page !== 0 ? params?.page - 1 : 0
        }
        onPageChange={(page) => {
          dispatch(setParams({ page: page.selected + 1 }));
        }}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  return (
    <div className="app-user-list">
      <Fragment>
        <Card className="overflow-hidden">
          <div className="react-dataTable">
            <DataTable
              noHeader
              subHeader
              sortServer
              pagination
              responsive
              paginationServer
              columns={columns}
              // onSort={handleSort}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
              data={data}
              subHeaderComponent={<CustomHeader />}
            />
          </div>
        </Card>
      </Fragment>
    </div>
  );
};
export default index;
