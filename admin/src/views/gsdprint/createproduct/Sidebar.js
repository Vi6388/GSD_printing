// ** React Import
import { useState, useEffect } from "react";
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
  getSubCategoriesData,
} from "../../../requests/admin/categoryAPI";
import { getPaperTypesData } from "../../../requests/admin/paperTypeAPI";

import {
  createProductData,
  updateProductData,
} from "../../../requests/admin/productAPI";

import { toast } from "react-toastify";
import axios from "axios";
import { ENDPOINTS } from "../../../lib/endpoints";

const __baseUrl = "http://localhost:8080/";
const SidebarCreateProduct = ({ open, toggleSidebar, editProduct }) => {
  const [product, setProduct] = useState({
    id: "",
    productImage: "",
    productName: "",
    categoryID: "",
    subCategoryID: "",
    paperTypeID: "",
    price: 0,
    discountPrice: 0,
    lockStatus: 0,
  });
  const [preview, setPreview] = useState("");

  const [categories, setCategoires] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [paperTypes, setPaperTypes] = useState([]);

  useEffect(() => {
    const category = categories.filter((item) => {
      if (item.value === editProduct.categoryID) return item;
    })[0];
    const subCategoryList = getSubCategories(editProduct.categoryID);
    let subCategory = null;
    if (subCategoryList.length > 0) {
      subCategory = subCategoryList?.filter((item) => {
        if (item.value === editProduct.subCategoryID) return item;
      })[0];
    } else {
      subCategory = subCategories?.filter((item) => {
        if (item.value === editProduct.subCategoryID) return item;
      })[0];
    }
    const paperType = paperTypes.filter((item) => {
      if (item.value === editProduct.paperTypeID) return item;
    })[0];
    if (editProduct) {
      setProduct({
        id: editProduct._id,
        productImage: editProduct.productImage,
        productName: editProduct.productName,
        categoryID: category,
        subCategoryID: subCategory,
        paperTypeID: paperType,
        price: editProduct.price,
        discountPrice: editProduct.discountPrice,
        lockStatus: editProduct.lockStatus,
      });
      setPreview(__baseUrl + editProduct.productImage);
    }
  }, [editProduct]);

  useEffect(async () => {
    getCategories();
    getSubCategories(0);
    getPaperTypeList();
  }, [editProduct]);

  const getCategories = async () => {
    const response = await getCategoriesData();
    if (response.status === true) {
      let list = [];
      response.categories?.map((item) => {
        list.push({
          value: item._id,
          label: item.categoryName,
        });
      });
      setCategoires(list);
    }
  };

  const getSubCategories = async (categoryID) => {
    const response = await getSubCategoriesData(categoryID);
    if (response.status === true) {
      let list = [];
      if (response?.categories?.length > 0) {
        response?.categories?.map((item) => {
          list.push({
            value: item._id,
            label: item.categoryName,
          });
        });
        setSubCategories(list);
      } else {
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
  };

  const getPaperTypeList = async () => {
    const response = await getPaperTypesData();
    if (response?.status === true) {
      let list = [];
      response?.list?.map((item) => {
        list.push({
          value: item._id,
          label: item.paperName,
        });
      });
      setPaperTypes(list);
    }
  };

  const handleSidebarClosed = () => {};
  const selectFile = async (e) => {
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
          setProduct({
            ...product,
            productImage: res?.data?.image?.filename,
          });
          setPreview(__baseUrl + "/" + res?.data?.image?.filename);
        }
      });
  };

  const onSubmit = async () => {
    let response = null;
    const data = {
      id: product.id,
      productImage: product.productImage,
      productName: product.productName,
      categoryID: product.categoryID?.value,
      categoryName: product.categoryID?.label,
      subCategoryID: product.subCategoryID?.value,
      subCategoryName: product.subCategoryID?.label,
      paperTypeID: product.paperTypeID?.value,
      paperTypeName: product.paperTypeID?.label,
      price: product.price,
      discountPrice: product.discountPrice,
      lockStatus: product.lockStatus,
    };

    if (data.id === "" || data.id === undefined) {
      delete data.id;
      response = await createProductData(data);
    } else {
      response = await updateProductData(data);
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
      setPreview("");
    }
  };

  useEffect(() => {
   if(!open) {
      setPreview("");
   }
  }, [open]);
  
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e, inputName) => {
    let selectedItem = null;
    if (inputName === "categoryID") {
      selectedItem = categories.filter((item) => {
        if (item.value === e.value) return item;
      })[0];
    } else if (inputName === "subCategoryID") {
      selectedItem = subCategories.filter((item) => {
        if (item.value === e.value) return item;
      })[0];
    } else if (inputName === "paperTypeID") {
      selectedItem = paperTypes.filter((item) => {
        if (item.value === e.value) return item;
      })[0];
    }
    setProduct({
      ...product,
      [inputName]: selectedItem,
    });
    getSubCategories(e.value);
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Create Product"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form>
        <Row>
          <Col md="12">
            <div className="mb-1">
              <Label>Product Image</Label>
              <Input type="File" onChange={(e) => selectFile(e)} />
            </div>
            {preview !== "" && (
              <div className="mb-1">
                <img src={preview} width={100} height={100} />
              </div>
            )}
          </Col>
          <Col md="12">
            <div className="mb-1">
              <Label>Product Name</Label>
              <Input
                type="text"
                placeholder="name"
                value={product.productName}
                name="productName"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>
          <Col md="12">
            <div className="mb-1">
              <Label>Category</Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                name="categoryID"
                value={product.categoryID}
                options={categories}
                onChange={(e) => handleSelectChange(e, "categoryID")}
                // isClearable
              />
            </div>
          </Col>
          <Col md="12">
            <div className="mb-1">
              <Label>SubCategory</Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                name="subCategoryID"
                value={product.subCategoryID}
                options={subCategories}
                onChange={(e) => handleSelectChange(e, "subCategoryID")}
                // isClearable
              />
            </div>
          </Col>
          <Col md="12">
            <div className="mb-1">
              <Label>Paper Type</Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                name="paperTypeID"
                value={product.paperTypeID}
                options={paperTypes}
                onChange={(e) => handleSelectChange(e, "paperTypeID")}
                // isClearable
              />
            </div>
          </Col>
          <Col md="12">
            <div className="mb-1">
              <Label>Price</Label>
              <Input
                type="text"
                placeholder=" Price"
                value={product.price}
                name="price"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>
          <Col md="12">
            <div className="mb-1">
              <Label>Discount Price</Label>
              <Input
                type="text"
                placeholder=" Discount Price"
                name="discountPrice"
                value={product.discountPrice}
                onChange={(e) => handleChange(e)}
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
                value={product.lockStatus}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>

          <Col md="12">
            <div className="mb-2">
              <Button color="primary" onClick={() => onSubmit()}>
                {product.id === "" || product.id === undefined
                  ? "Add Product"
                  : "Edit Product"}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  );
};

export default SidebarCreateProduct;
