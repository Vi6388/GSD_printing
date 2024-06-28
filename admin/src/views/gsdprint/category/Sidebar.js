// ** React Import
import { useEffect, useState } from "react";
// ** Custom Components
import Sidebar from "@components/sidebar";
// ** Utils
import { selectThemeColors } from "@utils";
// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col } from "reactstrap";
import {} from "jspdf-autotable";

import {
  getCategoriesData,
  createCategoryData,
  editCategoryData,
  getSubCategoriesData,
} from "../../../requests/admin/categoryAPI";
import { toast } from "react-toastify";
import axios from "axios";
import { ENDPOINTS } from "../../../lib/endpoints";

const __baseUrl = "http://localhost:8080";

const SidebarCreateProduct = ({ open, toggleSidebar, editCategory }) => {
  const handleSidebarClosed = () => {
    setCategory({
      id: "",
      categoryImageName: "",
      categoryImage: "",
      categoryName: "",
      parentCategoryID: "",
    });
  };

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    id: "",
    categoryImageName: "",
    categoryImage: "",
    categoryName: "",
    parentCategoryID: "",
    lockStatus: 0,
  });
  const [preview, setPreview] = useState("");

  useEffect(async () => {
    const categoryID = category.parentCategoryID === "" ? 0 : category.id;
    getSubCategories(categoryID);
  }, []);

  const getSubCategories = async (categoryID) => {
    const response = await getCategoriesData(categoryID);
    if (response?.status === true) {
      let list = [];
      response?.categories?.map((item) => {
        list.push({
          value: item._id,
          label: item.categoryName,
        });
      });
      setCategories(list);
    }
  };

  useEffect(() => {
    const category = categories.filter((item) => {
      if (item.value === editCategory.parentCategoryID) return item;
    })[0];
    setCategory({
      id: editCategory._id,
      categoryImage: editCategory.categoryImage,
      categoryName: editCategory.categoryName,
      parentCategoryID: category,
    });
    setPreview(__baseUrl + "/" + editCategory.categoryImage);
  }, [editCategory]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleParentCategory = (e) => {
    let selectedItem = categories.filter((item) => {
      if (item.value === e.value) return item;
    })[0];
    setCategory({
      ...category,
      parentCategoryID: selectedItem,
    });
  };

  useEffect(() => {
   if(!open) {
      setPreview("");
   }
  }, [open]);
  
  const onSubmit = async () => {
    let response = null;
    const data = {
      id: category.id,
      categoryImage: category.categoryImage,
      categoryName: category.categoryName,
      parentCategoryID: category.parentCategoryID?.value,
      parentCategoryName: category.parentCategoryID?.label,
    };
    if (category.id === "" || category.id === undefined) {
      delete data.id;
      response = await createCategoryData(data);
    } else {
      response = await editCategoryData(data);
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
      setCategory({
        id: "",
        categoryImageName: "",
        categoryImage: "",
        categoryName: "",
        parentCategoryID: "",
      });
      setPreview("");
    }
  };

  const handleChangeFile = async (e) => {
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
          setCategory({
            ...category,
            categoryImage: res?.data?.image?.filename,
          });
          setPreview(__baseUrl + "/" + res?.data?.image?.filename);
        }
      });
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Add New Category"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form>
        <Row>
          <Col md="12">
            <div className="mb-1">
              <Label>Category Image</Label>
              <Input type="file" onChange={handleChangeFile} />
            </div>
            {preview !== "" && (
              <div className="mb-1">
                <img src={preview} width={100} height={100} />
              </div>
            )}
          </Col>

          <Col md="12">
            <div className="mb-1">
              <Label>Category</Label>
              <Input
                type="text"
                placeholder="Category"
                name="categoryName"
                value={category.categoryName}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>
          <Col md="12">
            <div className="mb-1">
              <Label>ParentCategory</Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                name="parentCategoryID"
                value={category.parentCategoryID}
                options={categories}
                onChange={(e) => handleParentCategory(e)}
                // isClearable
              />
            </div>
          </Col>

          <Col md="12">
            <div className="mb-1">
              <Label>Lock Status</Label>
              <Input
                type="text"
                placeholder=" Lock Status"
                name="lockStatus"
                value={category.lockStatus}
              />
            </div>
          </Col>

          <Col md="12">
            <div className="mb-2">
              <Button color="primary" onClick={() => onSubmit()}>
                {category.id === undefined || category.id === ""
                  ? "Add Category"
                  : "Edit Category"}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  );
};

export default SidebarCreateProduct;
