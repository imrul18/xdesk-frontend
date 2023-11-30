import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import { getData, setUploadData, updateData } from "../store";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const { uploadData, paramsData } = useSelector((state) => state.headPostOffices);

  useEffect(() => {
    dispatch(getData(id));
  }, []);

  const onChange = (e) => {
    dispatch(
      setUploadData({ ...uploadData, [e?.target?.name]: e.target?.value })
    );
  };

  const onSubmit = async () => {
    const res = await dispatch(updateData(id));
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
                <CardTitle tag="h4">Edit Head Post Office</CardTitle>
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
