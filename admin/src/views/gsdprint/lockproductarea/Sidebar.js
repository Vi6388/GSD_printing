// ** React Import
import { useEffect, useState } from "react";
// ** Custom Components
import Sidebar from "@components/sidebar";
import classnames from "classnames";
// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col } from "reactstrap";
import { } from "jspdf-autotable";
import { selectThemeColors } from "@utils";
// ** Third Party Components
import Select from "react-select";
import { getProductsData } from "../../../requests/admin/productAPI";
import { getCategoriesData, getSubCategoriesData } from "../../../requests/admin/categoryAPI";
import { getPaperTypesData } from "../../../requests/admin/paperTypeAPI";
import { createLockProductAreaData, editLockProductAreaData } from "../../../requests/admin/lockProductAreaAPI";
import { toast } from "react-toastify";

const SidebarCreateProduct = ({
   open,
   toggleSidebar,
   selectedLockProductArea
}) => {

   const [productList, setProductList] = useState([]);
   const [categoryList, setCategoryList] = useState([]);
   const [subCategoryList, setSubCategoryList] = useState([]);
   const [paperTypeList, setPaperTypeList] = useState([]);

   useEffect(() => {
      getProductList();
      getCategoryList();
      getSubCategoryList(0);
      getPaperTypeList();
   }, []);

   useEffect(() => {
      const product = productList.filter((item) => { if(item.value === selectedLockProductArea.productID) return item; })[0];
      const category = categoryList.filter((item) => { if(item.value === selectedLockProductArea.categoryID) return item; })[0];
      const subCategories = getSubCategoryList(selectedLockProductArea.categoryID);
      let subCategory = null;
      if(subCategories.length > 0) {
         subCategory = subCategories?.filter((item) => { if(item.value === selectedLockProductArea.subCategoryID) return item; })[0];
      } else {
         subCategory = subCategoryList?.filter((item) => { if(item.value === selectedLockProductArea.subCategoryID) return item; })[0];
      }
      const paperType = paperTypeList.filter((item) => { if(item.value === selectedLockProductArea.paperTypeID) return item; })[0];
      setLockProductArea({
         id: selectedLockProductArea._id,
         productID: product,
         categoryID: category,
         subCategoryID: subCategory,
         paperTypeID: paperType,
         status: {
            textEditing: selectedLockProductArea.status?.textEditing,
            addImageOnProduct: selectedLockProductArea.status?.addImageOnProduct,
            backgroundColor: selectedLockProductArea.status?.backgroundColor,
            useTemplate: selectedLockProductArea.status?.useTemplate,
            addIcons: selectedLockProductArea.status?.addIcons,
         }
      })
   }, [selectedLockProductArea]);

   const getProductList = async () => {
      const response = await getProductsData();
      if(response?.status === true) {
         let list = [];
         response?.products?.map((item) => {
            list.push({
               value: item._id,
               label: item.productName
            })
         })
         setProductList(list);
      } else {
         setProductList([]);
      }
   }

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

   const [lockProductArea, setLockProductArea] = useState({
      id: '',
      productID: '',
      categoryID: '',
      subCategoryID: '',
      paperTypeID: '',
      status: {
         textEditing: false,
         addImageOnProduct: false,
         backgroundColor: false,
         useTemplate: false,
         addIcons: false,
      }
   })

   const handleSidebarClosed = () => {
   };

   const handleEvent = (e) => {
      setLockProductArea({
         ...lockProductArea,
         status: {
            ...lockProductArea.status,
            [e.target.name]: e.target.checked
         }
      })
   }

   const handleSelectChange = (e, inputName) => {
      let selectedItem = null;
      if(inputName === "productID") {
         selectedItem = productList.filter((item) => { if(item.value === e.value) return item; })[0];
      } else if(inputName === "categoryID") {
         selectedItem = categoryList.filter((item) => { if(item.value === e.value) return item; })[0];
      } else if(inputName === "subCategoryID") {
         selectedItem = subCategoryList.filter((item) => { if(item.value === e.value) return item; })[0];
      } else if(inputName === "paperTypeID") {
         selectedItem = paperTypeList.filter((item) => { if(item.value === e.value) return item; })[0];
      }
      setLockProductArea({
         ...lockProductArea,
         [inputName]: selectedItem
      });
      getSubCategoryList(e.value);
   }

   const onSubmit = async () => {
      let response = null;
      const data = {
         id: lockProductArea.id,
         productID: lockProductArea.productID?.value,
         productName: lockProductArea.productID?.label,
         categoryID: lockProductArea.categoryID?.value,
         categoryName: lockProductArea.productID?.label,
         subCategoryID: lockProductArea.subCategoryID?.value,
         subCategoryName: lockProductArea.subCategoryID?.label,
         paperTypeID: lockProductArea.paperTypeID?.value,
         paperTypeName: lockProductArea.paperTypeID?.label,
         status: {
            textEditing: lockProductArea.status.textEditing,
            addImageOnProduct: lockProductArea.status.addImageOnProduct,
            backgroundColor: lockProductArea.status.backgroundColor,
            useTemplate: lockProductArea.status.useTemplate,
            addIcons: lockProductArea.status.addIcons,
         }
      }
      if(lockProductArea.id === "" || lockProductArea.id === undefined) {
         delete data.id;
         response = await createLockProductAreaData(data);
      } else {
         response = await editLockProductAreaData(data);
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
         setLockProductArea({
            id: '',
            productID: '',
            categoryID: '',
            subCategoryID: '',
            paperTypeID: '',
            status: {
               textEditing: false,
               addImageOnProduct: false,
               backgroundColor: false,
               useTemplate: false,
               addIcons: false,
            }
         });
      }
   }

   return (
      <Sidebar
         size="lg"
         open={open}
         title="Add Lock Product Area"
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
                        Product 
                     </Label>
                     <Select
                        theme={selectThemeColors}
                        className="react-select"
                        classNamePrefix="select"
                        // name="clear"
                        value={lockProductArea.productID}
                        options={productList}
                        onChange={(e) => handleSelectChange(e, 'productID')}
                     // isClearable
                     />
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
                        value={lockProductArea.categoryID}
                        options={categoryList}
                        onChange={(e) => handleSelectChange(e, 'categoryID')}
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
                        value={lockProductArea.subCategoryID}
                        options={subCategoryList}
                        onChange={(e) => handleSelectChange(e, 'subCategoryID')}
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
                        value={lockProductArea.paperTypeID}
                        options={paperTypeList}
                        onChange={(e) => handleSelectChange(e, 'paperTypeID')}
                     // isClearable
                     />
                  </div>
               </Col>

               <Col md="12">
                  <div className="mb-1">
                     <Label>
                        Lock Status ( For Product Customization )
                     </Label>
                     <div className="demo-inline-spacing">
                        <Row>
                           <Col md="12">
                              <div className="form-check form-switch">
                                 <Input type="switch" name="textEditing" id="textediting" checked={lockProductArea.status.textEditing} onChange={(e) => handleEvent(e)} />
                                 <Label for="textediting" className="form-check-label">
                                    Text Editing
                                 </Label>
                              </div>
                           </Col>

                           <Col md="12">
                              <div className="form-check form-switch mt-2">
                                 <Input type="switch" name="addImageOnProduct" id="imageadd" checked={lockProductArea.status.addImageOnProduct} onChange={(e) => handleEvent(e)} />
                                 <Label for="imageadd" className="form-check-label">
                                    Add image on Product
                                 </Label>
                              </div>
                           </Col>
                           <Col md="12">
                              <div className="form-check form-switch mt-2">
                                 <Input type="switch" name="backgroundColor" id="backroundcolor" checked={lockProductArea.status.backgroundColor} onChange={(e) => handleEvent(e)} />
                                 <Label for="backroundcolor" className="form-check-label">
                                    Background Color Updation
                                 </Label>
                              </div>
                           </Col>
                           <Col md="12">
                              <div className="form-check form-switch mt-2">
                                 <Input type="switch" name="useTemplate" id="useTemplate" checked={lockProductArea.status.useTemplate} onChange={(e) => handleEvent(e)} />
                                 <Label for="useTemplate" className="form-check-label">
                                    Use Template
                                 </Label>
                              </div>
                           </Col>
                           <Col md="12">
                              <div className="form-check form-switch mt-2">
                                 <Input type="switch" name="addIcons" id="addIcons" checked={lockProductArea.status.addIcons} onChange={(e) => handleEvent(e)} />
                                 <Label for="addIcons" className="form-check-label">
                                    Add Icons
                                 </Label>
                              </div>
                           </Col>
                        </Row>

                     </div>
                  </div>
               </Col>

               <Col md="12">
                  <div className="mb-2">
                     <Button color="primary" onClick={() => onSubmit()}>
                        { lockProductArea.id === undefined ? 'Add Product' : 'Edit Product'}
                     </Button>
                  </div>
               </Col>
            </Row>
         </Form>
      </Sidebar>
   );
};

export default SidebarCreateProduct;
