import "@styles/react/libs/react-select/_react-select.scss";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { getData, getPostOfficeOption, setUploadData, updateData } from "../store";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { uploadData, paramsData, options } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getData(id));
    dispatch(getPostOfficeOption());
  }, []);

  const onChange = (e) => {
    dispatch(
      setUploadData({ ...uploadData, [e?.target?.name]: e.target?.value })
    );
  };

  const onSubmit = async () => {
    const res = await dispatch(updateData(id));
    if (res?.payload) {
      navigate("/user");
    }
  };

  return (
    <Fragment>
      <Row>
        <Col md="6" sm="12">
          <Form>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">New Post Office</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <Label className="form-label" for="name">
                      Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={uploadData?.name}
                      onChange={onChange}
                    />
                  </Col>
                  <Col sm="12">
                    <Label className="form-label" for="username">
                      Username
                    </Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="username"
                      value={uploadData?.username}
                      onChange={onChange}
                    />
                  </Col>
                  <Col sm="12">
                    <Label className="form-label" for="po_id">
                      Post Office
                    </Label>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      options={options?.postOffice}
                      value={options?.postOffice?.find(
                        (obj) => obj?.value == uploadData?.po_id
                      )}
                      onChange={(e) => {
                        onChange({
                          target: {
                            name: "po_id",
                            value: e?.value,
                          },
                        });
                      }}
                    />
                  </Col>
                  <Col sm="12">
                    <Label className="form-label" for="type">
                      Role
                    </Label>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      options={options?.role}
                      value={options?.role?.find(
                        (obj) => obj?.value === uploadData?.type
                      )}
                      onChange={(e) => {
                        onChange({
                          target: {
                            name: "type",
                            value: e?.value,
                          },
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="mt-1">
                    <div className="d-flex">
                      <Button
                        className="me-1"
                        color="primary"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          onSubmit();
                        }}
                        disabled={paramsData?.loading}
                      >
                        {paramsData?.loading ? (
                          <>
                            <Spinner className="me-25" size="sm" />
                            Please Wait...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};
export default index;
