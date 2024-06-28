// Import necessary libraries
import { Fragment, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Sidebar from '../category/Sidebar';
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { AiOutlineEdit } from 'react-icons/ai'; // Import the edit icon from react-icons (example)
import Img1 from "../../../assets/images/gsdprint/sp-1.jpg"
import { Trash } from 'react-feather';
import BreadCrumbs from '@components/breadcrumbs';

import { getCategoriesData, deleteCategoryData } from "../../../requests/admin/categoryAPI";
import { it } from 'date-fns/locale';
import { toast } from 'react-toastify';

const __baseUrl = "http://localhost:8080";

// Functional component
const CreateCategoryIndex = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const response = await getCategoriesData();
        if(response?.status === true) {
            setCategories(response?.categories);
        }
    }

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        if(sidebarOpen) {
            getCategories();
            setSelectedCategory({})
        }
    };

    const clickRow = (row) => {
        setSelectedCategory(row);
        toggleSidebar();
    }

        // Define columns for DataTable
    const columns = [
        {
            name: 'ID',
            selector: (row, index) => index + 1,
        },
        {
            name: 'Category Image',
            cell: row => {
                return <img src={`${__baseUrl}/${row.categoryImage}`} alt="Product" style={{ width: '50px', height: '50px' }} />;
            }
        },
        {
            name: 'Category',
            selector: row => row.categoryName,
        },
        {
            name: 'Parent Category',
            selector: row => row.parentCategoryName,
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

    const editRow = (row) => {
        setSelectedCategory(row);
        toggleSidebar();
    }

    const deleteRow = async (row) => {
        const response = await deleteCategoryData(row._id);
        if(response.status === true) {
            toast.success(
                <div className="toastify-header">
                  <div className="title-wrapper">
                    <h6 className="toast-title fw-bold">{response?.message}</h6>
                  </div>
                </div>
              );
              getCategories();
        } else {
            toast.error(response?.message);
        }
    }

    return (
        <Fragment>
             <BreadCrumbs
                breadCrumbTitle="Category"
                breadCrumbParent="Shop"
                breadCrumbActive="Category"
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
                                    Create Category
                                </Button>
                            </CardHeader>
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={categories}
                                onRowClicked={(row) => clickRow(row)}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Sidebar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
                editCategory={selectedCategory}
            />
        </Fragment>
    );
};

export default CreateCategoryIndex;
