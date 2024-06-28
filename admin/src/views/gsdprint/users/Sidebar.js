// ** React Import
import { useEffect, useState } from "react";
// ** Custom Components
import Sidebar from "@components/sidebar";
import classnames from "classnames";
// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col } from "reactstrap";
import {} from "jspdf-autotable";
import { createUserData, editUserData } from "../../../requests/admin/userAPI";
import { toast } from "react-toastify";
import axios from "axios";
import { ENDPOINTS } from "../../../lib/endpoints";

const __baseUrl = "http://localhost:8080/";
const SidebarCreateProduct = ({ open, toggleSidebar, selectedUser }) => {
  const [user, setUser] = useState({
    id: "",
    profileImage: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });
  const [preview, setPreview] = useState("");

  const handleSidebarClosed = () => {};

  useEffect(() => {
    setUser({
      id: selectedUser._id,
      profileImage: selectedUser.profileImage,
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      phoneNumber: selectedUser.phoneNumber,
      email: selectedUser.email,
    });
    setPreview(__baseUrl + selectedUser.profileImage);
  }, [selectedUser]);

  useEffect(() => {
   if(!open) {
      setPreview("");
   }
  }, [open]);

  const handleChange = (e) => {
    setUser({
      ...user,
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
          setUser({
            ...user,
            profileImage: res?.data?.image?.filename,
          });
          setPreview(__baseUrl + "/" + res?.data?.image?.filename);
        }
      });
  };

  const onSubmit = async () => {
    let response = null;
    const data = {
      id: user.id,
      profileImage: user.profileImage,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };
    if (user.id === "" || user.id === undefined) {
      delete data.id;
      response = await createUserData(data);
    } else {
      response = await editUserData(data);
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
      setUser({
        id: "",
        profileImage: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      });
      setPreview("");
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Add User"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form>
        <Row>
          <Col md="12">
            <div className="mb-1">
              <Label>Profile Image</Label>
              <Input type="File" onChange={handleFile} />
            </div>
            {preview !== "" && (
              <div className="mb-1">
                <img src={preview} width={100} height={100} />
              </div>
            )}
          </Col>
          <Col md="12">
            <div className="mb-1">
              <Label>FirstName</Label>
              <Input
                type="text"
                placeholder="John"
                name="firstName"
                value={user.firstName}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>
          <Col md="12">
            <div className="mb-1">
              <Label>LastName</Label>
              <Input
                type="text"
                placeholder="Doe"
                name="lastName"
                value={user.lastName}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>

          <Col md="12">
            <div className="mb-1">
              <Label>Mobile No.</Label>
              <Input
                type="text"
                placeholder="123 456 7891"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>
          <Col md="12">
            <div className="mb-1">
              <Label>Email ID</Label>
              <Input
                type="email"
                placeholder="info@gmail.com"
                name="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>

          <Col md="12">
            <div className="mb-2">
              <Button color="primary" onClick={() => onSubmit()}>
                {user.id === "" || user.id === undefined
                  ? "Add User"
                  : "Edit User"}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  );
};

export default SidebarCreateProduct;
