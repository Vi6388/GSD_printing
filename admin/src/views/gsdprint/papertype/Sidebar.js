// ** React Import
import { useEffect, useState } from "react";
// ** Custom Components
import Sidebar from "@components/sidebar";
import classnames from "classnames";
// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col } from "reactstrap";
import {} from "jspdf-autotable";
import { toast } from "react-toastify";

import {
  createPaperTypeData,
  editPaperTypeData,
} from "../../../requests/admin/paperTypeAPI";
import axios from "axios";
import { ENDPOINTS } from "../../../lib/endpoints";

const __baseUrl = "http://localhost:8080/";
const SidebarCreateProduct = ({ open, toggleSidebar, editPaperType }) => {
  const [paperType, setPaperType] = useState({
    id: "",
    paperImage: "",
    paperName: "",
    paperType: "",
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (editPaperType) {
      setPaperType({
        id: editPaperType._id,
        paperImage: editPaperType.paperImage,
        paperName: editPaperType.paperName,
        paperType: editPaperType.paperType,
      });
      setPreview(__baseUrl + editPaperType.paperImage);
    }
  }, [editPaperType]);

  useEffect(() => {
   if(!open) {
      setPreview("");
   }
  }, [open]);
  
  const handleSidebarClosed = () => {
    setPaperType({
      id: "",
      paperImage: "",
      paperName: "",
      paperType: "",
    });
  };

  const handleChange = (e) => {
    setPaperType({
      ...paperType,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    uploadFunction(formData);
  };

  const uploadFunction = async (payload) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        process.env.REACT_APP_API + ENDPOINTS.UPLOAD_IMAGE_API,
        payload,
        config
      )
      .then((res) => {
        if (res?.status) {
          console.log(res?.data?.image);
          setPaperType({
            ...paperType,
            paperImage: res?.data?.image?.filename,
          });
          setPreview(__baseUrl + "/" + res?.data?.image?.filename);
        }
      });
  };

  const onSubmit = async () => {
    let response = null;
    if (paperType.id === "" || paperType.id === undefined) {
      response = await createPaperTypeData(paperType);
    } else {
      response = await editPaperTypeData(paperType);
    }
    if (response?.status === true) {
      toast.success(
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title fw-bold">{response?.message}</h6>
          </div>
        </div>
      );
      toggleSidebar();
      setPaperType({
        id: "",
        paperImage: "",
        paperName: "",
        paperType: "",
      });
      setPreview("");
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Add Paper Type"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form>
        <Row>
          <Col md="12">
            <div className="mb-1">
              <Label>Paper Image</Label>
              <Input type="File" onChange={(e) => handleFile(e)} />
            </div>
            {preview !== "" && (
              <div className="mb-1">
                <img src={preview} width={100} height={100} />
              </div>
            )}
          </Col>
          <Col md="12">
            <div className="mb-1">
              <Label>Paper Name</Label>
              <Input
                type="text"
                placeholder="name"
                name="paperName"
                value={paperType.paperName}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>

          <Col md="12">
            <div className="mb-1">
              <Label>Paper Type</Label>
              <Input
                type="text"
                placeholder=" Paper Type"
                name="paperType"
                value={paperType.paperType}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>

          <Col md="12">
            <div className="mb-2">
              <Button color="primary" onClick={() => onSubmit()}>
                {paperType.id === "" || paperType.id === undefined
                  ? "Add Paper"
                  : "Edit Paper"}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  );
};

export default SidebarCreateProduct;
