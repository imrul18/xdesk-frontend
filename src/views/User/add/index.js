import "@styles/react/libs/react-select/_react-select.scss";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import {
  addData,
  getHeadPostOfficeOption,
  getPostOfficeOption,
  getUserName,
  getZoneOption,
  setUploadData,
} from "../store";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uploadData, paramsData, options } = useSelector(
    (state) => state.users
    );

  useEffect(() => {
    dispatch(getZoneOption());
  }, []);

  useEffect(() => {
    onChange({ target: { name: "head_id", value: null } });
    if (uploadData?.zone_id) {
      dispatch(getHeadPostOfficeOption());
    }
  }, [uploadData?.zone_id]);

  useEffect(() => {
    onChange({ target: { name: "po_id", value: null } });
    if (uploadData?.head_id) {
      dispatch(getPostOfficeOption());
    }
  }, [uploadData?.head_id]);

  useEffect(() => {
    if (
      uploadData?.zone_id &&
      uploadData?.head_id &&
      uploadData?.po_id &&
      uploadData?.type
    ) {
      dispatch(getUserName());
    }
  }, [
    uploadData?.zone_id,
    uploadData?.head_id,
    uploadData?.po_id,
    uploadData?.type,
  ]);

  const onChange = (e) => {
    dispatch(setUploadData({ ...uploadData, [e?.target?.name]: e.target?.value }));
  };

  const onSubmit = async () => {
    const res = await dispatch(addData());
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
                <CardTitle tag="h4">New Account</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <Label className="form-label" for="username">
                      User Name
                    </Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="User Name"
                      value={uploadData?.username}
                      onChange={onChange}
                      disabled
                    />
                  </Col>
                  <Col sm="12">
                    <Label className="form-label" for="zone_id">
                      Zone
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      placeholder="Select Zone"
                      options={options?.zone}
                      value={options?.zone?.find(
                        (obj) => obj?.value === uploadData?.zone_id
                      )}
                      onChange={(e) => {
                        onChange({
                          target: {
                            name: "zone_id",
                            value: e?.value,
                          },
                        });
                      }}
                    />
                  </Col>
                  <Col sm="12">
                    <Label className="form-label" for="head_id">
                      Head Post Office
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      placeholder="Select Head Post Office"
                      options={options?.headPostOffice}
                      value={options?.headPostOffice?.find(
                        (obj) => obj?.value === uploadData?.head_id
                      )}
                      onChange={(e) => {
                        onChange({
                          target: {
                            name: "head_id",
                            value: e?.value,
                          },
                        });
                      }}
                    />
                  </Col>
                  <Col sm="12">
                    <Label className="form-label" for="po_id">
                      Post Office
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      placeholder="Select Post Office"
                      options={options?.postOffice}
                      value={options?.postOffice?.find(
                        (obj) => obj?.value === uploadData?.po_id
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
                      Type
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      options={options?.type}
                      value={options?.type?.find(
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
                  <Col sm="12">
                    <Label className="form-label" for="password">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={uploadData?.password}
                      onChange={onChange}
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
