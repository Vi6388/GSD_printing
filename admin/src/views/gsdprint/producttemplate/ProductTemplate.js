// Import necessary libraries
import { Fragment, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit,FaPencilAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { Button, Card, CardHeader, CardBody, Row, Col, Badge } from "reactstrap";
import { AiOutlineEdit } from 'react-icons/ai'; // Import the edit icon from react-icons (example)
import Img1 from "../../../assets/images/gsdprint/sp-1.jpg"
import { Trash } from 'react-feather';
import BreadCrumbs from '@components/breadcrumbs';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { deleteProductTemplateData, getProductTemplatesData } from '../../../requests/admin/productTemplateAPI';
import { toast } from "react-toastify";

const __baseUrl = "http://localhost:8080";

// Functional component
const ProductTemplate = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [productTemplateList, setProductTemplateList] = useState([]);
    const [selectedProductTemplate, setSelectedProductTemplate] = useState({});

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        getProductTemplateList();
    };

    useEffect(() => {
        getProductTemplateList();
    }, [])

    const getProductTemplateList = async () => {
        const response = await getProductTemplatesData();
        if(response?.status === true) {
            setProductTemplateList(response?.list);
        }
    }

    const editRow = (row) => {
        setSelectedProductTemplate(row);
        toggleSidebar();
    }

    const editTemplate = (row) => {
        window.location.href = '/builder?templateID=' + row._id;
    }

    const deleteRow = async (row) => {
        const response = await deleteProductTemplateData(row?._id);
        if(response?.status === true) {
            toast.success(
                <div className="toastify-header">
                <div className="title-wrapper">
                    <h6 className="toast-title fw-bold">{response?.message}</h6>
                </div>
                </div>
            );
            getProductTemplateList();
        } else {
            toast.error(response?.message);
        }
      }

      // Define columns for DataTable
    const columns = [
        {
            name: 'ID',
            selector: (row, index) => index + 1,
        },
        {
            name: 'Template Image',
            cell: row => {
                return <img src={`${__baseUrl}/${row.templateImage}`} alt="User" style={{ width: '50px', height: '50px' }} />;
            }
        },
        {
            name: 'Template Name',
            selector: row => row.name,
        },
        {
            name: 'Category',
            selector: row => row.categoryName,
        },
        
        {
            name: 'SubCategory',
            selector: row => row.subCategoryName,
        },

        {
            name: 'Paper Type',
            selector: row => row.paperTypeName,
        },
    
        {
            name: 'Status',
            cell: row => 
            <>
            <Badge size='sm' color="success" className='me-1'>Active</Badge>
            </>
        , 
        },
        {
            name: 'Action',
            cell: row => 
            <>
                <Button size='sm' color="primary" className='me-1' onClick={() => editRow(row)}><AiOutlineEdit  size={16} /></Button>
                <Button size='sm' color="warning" className='me-1' onClick={() => editTemplate(row)}><FaPencilAlt  size={16} /></Button>
                <Button size='sm' color="danger" onClick={() => deleteRow(row)}><Trash  size={16}/></Button>
            </>
        },
    ];


    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle=" Product Template"
                breadCrumbParent="Dashboard"
                breadCrumbActive=" Product Template"
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
                                   Add Template
                                </Button>
                            </CardHeader>
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={productTemplateList}
                                onRowClicked={(row) => editRow(row)}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Sidebar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
                selectedProductTemplate={selectedProductTemplate}
            />
        </Fragment>
    );
};

export default ProductTemplate;
