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
import { deleteTransactionData, getTransactionsData } from '../../../requests/admin/transactionAPI';
import { toast } from "react-toastify";

// Define columns for DataTable
const columns = [
    {
        name: 'ID',
        selector: row => row.id,
    },
    {
        name: 'Product Image',
        cell: row => <img src={Img1} alt="Product" style={{ width: '50px', height: 'auto' }} />, // Display image in a cell
    },
    {
        name: 'Product Name',
        selector: row => row.productname,
    },
    
    {
        name: 'Price',
        selector: row => row.price,
    },
    {
        name: 'Discount Price',
        selector: row => row.dsprice,
    },
    {
        name: 'User Name',
        selector: row => row.username,
    },
    {
        name: ' Mobile No.',
        selector: row => row.mobile,
    },
    {
        name: 'Trans. Amount',
        selector: row => row.amout,
    },
    {
        name: 'Date',
        selector: row => row.date,
    },
    {
        name: 'Time',
        selector: row => row.time,
    },
    {
        name: 'Status',
        cell: row => 
        <>
         <Badge size='sm' color="success" className='me-1'>done</Badge>
        </>
       , // Display edit icon as an action
    },
    {
        name: 'Action',
        cell: row => 
        <>
         {/* <Button size='sm' color="primary" className='me-1'><AiOutlineEdit  size={16} /></Button> */}
         <Button size='sm' color="danger"><Trash  size={16}/></Button>
        </>
       , // Display edit icon as an action
    },
];

// Define sample data
const data = [
    {
        id: 145445445,
        paperimage: 'path_to_your_image_or_URL_here', // Provide the path or URL of the product image
        productname: 'Business card',
        price: '$354',
        dsprice: '$54',
        username: 'John Smith',
        mobile: '123 4556 789',
        amout: '$354',
        date: '04-10-2024',
        time: '02:15 PM',
    },
    {
        id: 145445445,
        paperimage: 'path_to_your_image_or_URL_here', // Provide the path or URL of the product image
        productname: 'Business card',
        price: '$354',
        dsprice: '$54',
        username: 'John Smith',
        mobile: '123 4556 789',
        amout: '$354',
        date: '04-10-2024',
        time: '02:15 PM',
    },
    {
        id: 145445445,
        paperimage: 'path_to_your_image_or_URL_here', // Provide the path or URL of the product image
        productname: 'Business card',
        price: '$354',
        dsprice: '$54',
        username: 'John Smith',
        mobile: '123 4556 789',
        amout: '$354',
        date: '04-10-2024',
        time: '02:15 PM',
    },
    
];

// Functional component
const TransactionList = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [transactionList, setTransactionList] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    useEffect(() => {
        getTransactionList();
    }, []);

    const getTransactionList = async () => {
        const response = await getTransactionsData();
        if(response?.status === true) {
            setTransactionList(response?.list);
        }
    }

    const editRow = (row) => {
        setSelectedTransaction(row);
        toggleSidebar();
    }

    const deleteRow = async (row) => {
      const response = await deleteTransactionData(row?.id);
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
        getOrderStatatusList();
    }

    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle="Transaction List"
                breadCrumbParent="Dashboard"
                breadCrumbActive="Transaction List"
            />
            <Row>
                <Col md='12'>
                    <Card>
                  
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={transactionList}
                                onRowClicked={(row) => editRow(row)}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {/* <Sidebar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
                selectedTransaction={selectedTransaction}
            /> */}
        </Fragment>
    );
};

export default TransactionList;
