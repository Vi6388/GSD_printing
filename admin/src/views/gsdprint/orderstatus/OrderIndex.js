// Import necessary libraries
import { Fragment, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
// import Sidebar from './Sidebar';
import { Button, Card, CardHeader, CardBody, Row, Col, Badge } from "reactstrap";
import { AiOutlineEdit } from 'react-icons/ai'; // Import the edit icon from react-icons (example)
import Img1 from "../../../assets/images/gsdprint/sp-1.jpg"
import { Trash } from 'react-feather';
import BreadCrumbs from '@components/breadcrumbs';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { getOrderStatusData } from '../../../requests/admin/orderStatusAPI';
import { toast } from "react-toastify";

// Define columns for DataTable
const columns = [
    {
        name: 'Order ID',
        selector: row => row._id,
    },
    {
        name: 'Product Image',
        cell: row => <img src={Img1} alt="Product" style={{ width: '50px', height: 'auto' }} />, // Display image in a cell
    },
    {
        name: 'Product Name',
        selector: row => row.productName,
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
        name: 'User Name',
        selector: row => row.firstName + " " + row.lastName,
    },
    {
        name: ' Mobile No.',
        selector: row => row.phoneNumber,
    },
    {
        name: ' Email ID',
        selector: row => row.email,
    },
    {
        name: 'Order Date',
        selector: row => row.date,
    },
    {
        name: 'Order Time',
        selector: row => row.time,
    },
    {
        name: 'Status',
        cell: row => 
        <>
         <Badge size='sm' color="warning" className='me-1'>Pending</Badge>
        </>
       , // Display edit icon as an action
    },
    {
        name: 'Action',
        cell: row => 
        <>
         <Button size='sm' color="primary" className='me-1'><AiOutlineEdit  size={16} /></Button>
         <Button size='sm' color="danger"><Trash  size={16}/></Button>
        </>
       , // Display edit icon as an action
    },
];

// Functional component
const OrderIndex = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [orderStatusList, setOrderStatusList] = useState([]);
    const [selectedOrderStatus, setSelectedOrderStatus] = useState({});

    useEffect(() => {
        getOrderStatusList();
    }, []);

    const getOrderStatusList = async () => {
        const response = await getOrderStatusData();
        if(response?.status === true) {
            setOrderStatusList(response?.list);
        }
    }

    const editRow = (row) => {
        setSelectedOrderStatus(row);
        toggleSidebar();
    }

    const deleteRow = async (row) => {
      const response = await deletePaperType(row?.id);
      if(response?.status === true) {
          <div className="toastify-header">
             <div className="title-wrapper">
             <h6 className="toast-title fw-bold">{response?.message}</h6>
             </div>
          </div>
      } else {
          toast.error(response?.message);
      }
    }

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        getOrderStatusList();
    }

    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle="Order Status"
                breadCrumbParent="Dashboard"
                breadCrumbActive="Order Status"
            />
            <Row>
                <Col md='12'>
                    <Card>
                  
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={orderStatusList}
                                onRowClicked={(row) => editRow(row)}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {/* <Sidebar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
                selectedOrderStatus={selectedOrderStatus}
            /> */}
        </Fragment>
    );
};

export default OrderIndex;
