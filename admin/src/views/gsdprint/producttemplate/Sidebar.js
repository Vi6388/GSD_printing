// ** React Import
import { useEffect, useState } from "react";
// ** Custom Components
import Sidebar from "@components/sidebar";
import { selectThemeColors } from "@utils";
// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
import axios from "axios";
// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col } from "reactstrap";
import { } from "jspdf-autotable";
import { getCategoriesData, getSubCategoriesData } from "../../../requests/admin/categoryAPI";
import { getPaperTypesData } from "../../../requests/admin/paperTypeAPI";
import { createProductTemplateData, editProductTemplateData } from "../../../requests/admin/productTemplateAPI";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../../lib/endpoints";
const __baseUrl = "http://localhost:8080/";

const SidebarCreateProduct = ({
   open,
   toggleSidebar,
   selectedProductTemplate,
}) => {

   const [template, setTemplate] = useState({
      id: "",
      templateImage: "",
      name: "",
      categoryID: "",
      subCategoryID: "",
      paperTypeID: "",
    });

   const [preview, setPreview] = useState("");
   const [categoryList, setCategoryList] = useState([]);
   const [subCategoryList, setSubCategoryList] = useState([]);
   const [paperTypeList, setPaperTypeList] = useState([]);
   const [productTemplate, setProductTemplate] = useState({
      id: "",
      templateImage: "",
      name: "",
      categoryID: "",
      subCategoryID: "",
      paperTypeID: "",
   })

   useEffect(() => {
      getCategoryList();
      getSubCategoryList(0);
      getPaperTypeList();
   }, [selectedProductTemplate]);

   const getCategoryList = async () => {
      const response = await getCategoriesData();
      if(response?.status === true) {
         let list = [];
         response?.categories?.map((item) => {
            list.push({
               value: item._id,
               label: item.categoryName
            })
         })
         setCategoryList(list);
      } else {
         setCategoryList([]);
      }
   }

   const getSubCategoryList = async (id) => {
      const response = await getSubCategoriesData(id);
      if(response?.status === true) {
         let list = [];
         response?.categories?.map((item) => {
            list.push({
               value: item._id,
               label: item.categoryName
            })
         })
         setSubCategoryList(list);
      } else {
         setSubCategoryList([]);
      }
   }

   const getPaperTypeList = async () => {
      const response = await getPaperTypesData();
      if(response?.status === true) {
         let list = [];
         response?.list?.map((item) => {
            list.push({
               value: item._id,
               label: item.paperName
            })
         })
         setPaperTypeList(list);
      } else {
         setPaperTypeList([]);
      }
   }

   useEffect(() => {
      const category = categoryList.filter((item) => { if(item.value === selectedProductTemplate.categoryID) return item; })[0];
      const subCategories = getSubCategoryList(selectedProductTemplate.categoryID);
      let subCategory = null;
      if(subCategories.length > 0) {
         subCategory = subCategories?.filter((item) => { if(item.value === selectedProductTemplate.subCategoryID) return item; })[0];
      } else {
         subCategory = subCategoryList?.filter((item) => { if(item.value === selectedProductTemplate.subCategoryID) return item; })[0];
      }
      const paperType = paperTypeList.filter((item) => { if(item.value === selectedProductTemplate.paperTypeID) return item; })[0];
      setProductTemplate({
         id: selectedProductTemplate._id,
         templateImage: selectedProductTemplate.templateImage,
         name: selectedProductTemplate.name,
         categoryID: category,
         subCategoryID: subCategory,
         paperTypeID: paperType,
      })
      setPreview(__baseUrl + selectedProductTemplate.templateImage);
   }, [selectedProductTemplate]);

   const handleSidebarClosed = () => {
   };

   const handleChange = (e) => {
      setProductTemplate({
         ...productTemplate,
         [e.target.name]: e.target.value
      })
   }

   const handleSelect = (e, inputName) => {
      let selectedItem = null;
      if(inputName === "categoryID") {
         selectedItem = categoryList.filter((item) => { if(item.value === e.value) return item; })[0];
      } else if(inputName === "subCategoryID") {
         selectedItem = subCategoryList.filter((item) => { if(item.value === e.value) return item; })[0];
      } else if(inputName === "paperTypeID") {
         selectedItem = paperTypeList.filter((item) => { if(item.value === e.value) return item; })[0];
      }
      setProductTemplate({
         ...productTemplate,
         [inputName]: selectedItem
      });
      setPreview(__baseUrl + productTemplate.templateImage);
      getSubCategoryList(e.value);
   }

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
            setProductTemplate({
              ...productTemplate,
              templateImage: res?.data?.image?.filename,
            });
            setPreview(__baseUrl + "/" + res?.data?.image?.filename);
          }
        });
    };

   const onSubmit = async () => {
      let response = null;
      const data = {
         id: productTemplate.id,
         templateImage: productTemplate.templateImage,
         name: productTemplate.name,
         categoryID: productTemplate.categoryID?.value,
         categoryName: productTemplate.categoryID?.label,
         subCategoryID: productTemplate.subCategoryID?.value,
         subCategoryName: productTemplate.subCategoryID?.label,
         paperTypeID: productTemplate?.paperTypeID?.value,
         paperTypeName: productTemplate?.paperTypeID?.label
      }
      if(data.id === "" || data.id === undefined) {
         delete data.id;
         response = await createProductTemplateData(data);
      } else {
         response = await editProductTemplateData(data);
      }
      if(response?.status === true) {
         toast.success(
            <div className="toastify-header">
               <div className="title-wrapper">
               <h6 className="toast-title fw-bold">{response?.message}</h6>
               </div>
            </div>
         );
         toggleSidebar();
         setProductTemplate({
            id: "",
            templateImage: "",
            name: "",
            categoryID: "",
            subCategoryID: "",
            paperTypeID: "",
         })
      }
   }

   return (
      <Sidebar
         size="lg"
         open={open}
         title="Add Template"
         headerClassName="mb-1"
         contentClassName="pt-0"
         toggleSidebar={toggleSidebar}
         onClosed={handleSidebarClosed}
      >
          <Form>
            <Row>
               <Col md="12">
                  <div className="mb-1">
                     <Label>
                        Template  Image
                     </Label>
                     <Input type="File"  onChange={(e) => selectFile(e)} />
                     {preview !== "" && (
                        <div className="mb-1">
                           <img src={preview} width={100} height={100} />
                        </div>
                     )}
                  </div>
               </Col>
               <Col md="12">
                  <div className="mb-1">
                     <Label>
                        Template Name
                     </Label>
                     <Input type="text" placeholder="name" name="name" value={productTemplate.name} onChange={(e) => handleChange(e)} />
                  </div>
               </Col>
               <Col md="12">
                  <div className="mb-1">
                     <Label>
                        Category
                     </Label>
                     <Select
                        theme={selectThemeColors}
                        className="react-select"
                        classNamePrefix="select"
                        // name="clear"
                        value={productTemplate.categoryID}
                        options={categoryList}
                        onChange={(e) => handleSelect(e, 'categoryID')}
                     // isClearable
                     />
                  </div>
               </Col>
               <Col md="12">
                  <div className="mb-1">

                     <Label>
                        SubCategory
                     </Label>
                     <Select
                        theme={selectThemeColors}
                        className="react-select"
                        classNamePrefix="select"
                        // name="clear"
                        value={productTemplate.subCategoryID}
                        options={subCategoryList}
                        onChange={(e) => handleSelect(e, 'subCategoryID')}
                     // isClearable
                     />
                  </div>
               </Col>
               <Col md="12">
                  <div className="mb-1">
                     <Label>
                        Paper Type
                     </Label>
                     <Select
                        theme={selectThemeColors}
                        className="react-select"
                        classNamePrefix="select"
                        // name="clear"
                        value={productTemplate.paperTypeID}
                        options={paperTypeList}
                        onChange={(e) => handleSelect(e, 'paperTypeID')}
                     // isClearable
                     />
                  </div>
               </Col>
              
               <Col md="12">
                  <div className="mb-2">
                     <Button color="primary" onClick={() => onSubmit()}>
                        {productTemplate.id === "" || productTemplate.id === undefined ? "Add Template" : "Edit Template"}
                     </Button>
                  </div>
               </Col>
            </Row>
         </Form>
      </Sidebar>
   );
};

export default SidebarCreateProduct;
