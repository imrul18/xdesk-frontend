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
import { addData, getZoneOption, setUploadData } from "../store";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uploadData, paramsData, options } = useSelector((state) => state.headPostOffices);

  useEffect(()=>{
    dispatch(getZoneOption());
  }, [])
  
  const onChange = (e) => {
    dispatch(
      setUploadData({ ...uploadData, [e?.target?.name]: e.target?.value })
    );
  };

  const onSubmit = async () => {
    const res = await dispatch(addData());
    if (res?.payload) {
      navigate("/head_post_office");
    }
  };

  return (
    <Fragment>
      <Row>
        <Col md="6" sm="12">
          <Form>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">New Head Post Office</CardTitle>
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
                    <Label className="form-label" for="code">
                      Code
                    </Label>
                    <Input
                      type="text"
                      name="code"
                      id="code"
                      placeholder="Code"
                      value={uploadData?.code}
                      onChange={onChange}
                    />
                  </Col>
                  <Col sm="12">
                    <Label className="form-label" for="zone_id">
                      Zone
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      name="zone_id"
                      id="zone_id"
                      options={options?.zones}
                      value={options?.zones?.find(
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
                    <Label className="form-label" for="address">
                      Address
                    </Label>
                    <Input
                      type="textarea"
                      name="address"
                      id="address"
                      placeholder="Address"
                      value={uploadData?.address}
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
