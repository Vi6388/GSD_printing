// Import necessary libraries
import { Fragment, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { fabric } from 'fabric';
import Sidebar from '../createproduct/Sidebar';
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { AiOutlineEdit } from 'react-icons/ai'; // Import the edit icon from react-icons (example)
import Img1 from "../../../assets/images/gsdprint/sp-1.jpg"
import { Trash } from 'react-feather';
import BreadCrumbs from '@components/breadcrumbs';

import { getProductsData, deleteProductData } from "../../../requests/admin/productAPI";
import { toast } from "react-toastify";
import { getCategoriesData } from '../../../requests/admin/categoryAPI';

const __baseUrl = "http://localhost:8080";
// Define columns for DataTable

// Functional component
const CreateProductIndex = () => {
    
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});

    const [categories, setCategories] = useState([]);

    const getProductList = async() => {
        const response = await getProductsData();
        if(response?.status === true) {
            setProductList(response?.products);
        }
    }

    useEffect(() => {
        getCategories();
        getProductList();
    }, []);

    const getCategories = async () => {
        const response = await getCategoriesData();
        if(response.status === true) {
           let list = [];
           response.categories?.map((item) => {
              list.push({
                 value: item._id,
                 label: item.categoryName
              })
           })
           setCategories(list);
        }
     }

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        if(sidebarOpen) {
            getProductList();
            setSelectedProduct({})
        }
    };

    const editRow = (row) => {
        setSelectedProduct(row);
        toggleSidebar();
    }

    const deleteRow = async (row) => {
        const response = await deleteProductData(row._id);
        if(response.status === true) {
           toast.success(
            <div className="toastify-header">
              <div className="title-wrapper">
                <h6 className="toast-title fw-bold">{response?.message}</h6>
              </div>
            </div>
          );
          getProductList();
        }
     }


    const columns = [
        {
            name: 'ID',
            selector: (row, index) => index + 1,
        },
        {
            name: 'Product Image',
            cell: row => {
                return <img src={`${__baseUrl}/${row.productImage}`} alt="Product" style={{ width: '50px', height: '50px' }} />;
            }
        },
        {
            name: 'Product Name',
            selector: row => row.productName,
        },
        {
            name: 'Category',
            selector: row => row.categoryName,
        },
        {
            name: 'Sub Category',
            // selector: row => categories.filter((item) => item._id === row.subCategoryID)[0]?.categoryName,
            selector: row => row.subCategoryName,
        },
        {
            name: 'Paper Type',
            selector: row => row.paperTypeName,
        },
        {
            name: 'Price',
            selector: row => row.price,
        },
        {
            name: 'Discount Price',
            selector: row => row.discountPrice,
        },
        {
            name: 'Action',
            cell: row => 
            <>
             <Button size='sm' color="primary" className='me-1' onClick={() => editRow(row)}><AiOutlineEdit  size={16} /></Button>
             <Button size='sm' color="danger" onClick={() => deleteRow(row)}><Trash  size={16}/></Button>
            </>
           , // Display edit icon as an action
        },
    ];


    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle="Create Product"
                breadCrumbParent="Shop"
                breadCrumbActive="Create Product"
            />
            <Row>
                <Col md='12'>
                    <Card>
                    <CardHeader>
                                <div className='text-end'>

                                </div>
                                <Button
                                    style={{ fontSize: "12px" }}
                                    className="add-new-user"
                                    color="primary"
                                    onClick={toggleSidebar}
                                >
                                    Create Product
                                </Button>
                            </CardHeader>
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={productList}
                                onRowClicked={(row) => editRow(row)}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Sidebar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
                editProduct={selectedProduct}
            />
        </Fragment>
    );
};

export default CreateProductIndex;
