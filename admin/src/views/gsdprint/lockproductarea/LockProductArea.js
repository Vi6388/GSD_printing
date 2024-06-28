// Import necessary libraries
import { Fragment, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Sidebar from './Sidebar';
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { AiOutlineEdit } from 'react-icons/ai'; // Import the edit icon from react-icons (example)
import Img1 from "../../../assets/images/gsdprint/sp-1.jpg"
import { Trash } from 'react-feather';
import BreadCrumbs from '@components/breadcrumbs';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { deleteLockProductAreaData, getLockProductAreasData } from '../../../requests/admin/lockProductAreaAPI';
import { toast } from "react-toastify";

// Functional component
const LockProductArea = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [list, setList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        getLockProductList();
    }, []);

    const getLockProductList = async () => {
        const response = await getLockProductAreasData();
        if(response?.status === true) {
            setList(response?.list)
        }
    }

    const editRow = (row) => {
        setSelectedItem(row);
        toggleSidebar();
    }

    const deleteRow = async (row) => {
      const response = await deleteLockProductAreaData(row?._id);
      if(response?.status === true) {
        toast.success(
            <div className="toastify-header">
                <div className="title-wrapper">
                    <h6 className="toast-title fw-bold">{response?.message}</h6>
                </div>
            </div>
        );
          getLockProductList();
      } else {
          toast.error(response?.message);
      }
    }

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        if(sidebarOpen) {
            getLockProductList();
            setSelectedItem({})
        }
    };

    // Define columns for DataTable
const columns = [
    {
        name: 'ID',
        selector: (row, index) => index + 1,
    },
    {
        name: 'Product',
        selector: row => row.productName,
    },
    {
        name: 'Category',
        selector: row => row.categoryName,
    },
    {
        name: 'Subcategory',
        selector: row => row.subCategoryName,
    },
    {
        name: 'Paper type',
        selector: row => row.paperTypeName,
    },
    {
        name: 'Lock Area on Product',
        selector: row => row.lockArea,
    },

    {
        name: 'Action',
        cell: row => 
        <>
         <Button size='sm' color="primary" className='me-1'><AiOutlineEdit  size={16}  onClick={() => editRow(row)}/></Button>
         <Button size='sm' color="danger"><Trash  size={16}  onClick={() => deleteRow(row)}/></Button>
        </>
       , // Display edit icon as an action
    },
];


    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle="Lock Product Area"
                breadCrumbParent="Dashboard"
                breadCrumbActive="Lock Product Area"
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
                                   Add Lock Product
                                </Button>
                            </CardHeader>
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={list}
                                onRowClicked={(row) => editRow(row)}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Sidebar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
                selectedLockProductArea={selectedItem}
            />
        </Fragment>
    );
};

export default LockProductArea;
