// Import necessary libraries
import { Fragment, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Sidebar from './Sidebar';
import { Button, Card, CardHeader, CardBody, Row, Col, Badge } from "reactstrap";
import { AiOutlineEdit } from 'react-icons/ai'; // Import the edit icon from react-icons (example)
import Img1 from "../../../assets/images/avatars/10.png"
import { Trash } from 'react-feather';
import BreadCrumbs from '@components/breadcrumbs';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { deleteUserData, getUsersData } from '../../../requests/admin/userAPI';
import { toast } from "react-toastify";

const __baseUrl = "http://localhost:8080";

// Functional component
const UserList = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = async () => {
        const response = await getUsersData();
        if(response?.status === true) {
            setUserList(response?.list);
        }
    }

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        getUserList();
        if(sidebarOpen) {
            setSelectedUser({});
        }
    };

    const editRow = (row) => {
        setSelectedUser(row);
        toggleSidebar();
    }

    const deleteRow = async (row) => {
        const response = await deleteUserData(row?._id);
        if(response?.status === true) {
            toast.success(
                <div className="toastify-header">
                    <div className="title-wrapper">
                        <h6 className="toast-title fw-bold">{response?.message}</h6>
                    </div>
                </div>
            );
            getUserList();
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
            name: 'Profile',
            cell: row => {
                return <img src={`${__baseUrl}/${row.profileImage}`} alt="User" style={{ width: '50px', height: '50px' }} />;
            }
        },
        {
            name: 'Name',
            selector: row => row.firstName + " " + row.lastName,
        },
        
        {
            name: 'Mobile No.',
            selector: row => row.phoneNumber ? row.phoneNumber : "",
        },
        {
            name: 'Email ID',
            selector: row => row.email,
        },
        {
            name: 'Status',
            cell: row => 
            <>
            { row.active ? 
                <Badge size='sm' color="success" className='me-1'>Active</Badge> :
                <Badge size='sm' color="warning" className='me-1'>InActive</Badge>
            }
            </>
        , 
        },
        {
            name: 'Action',
            cell: row => 
            <>
            <Button size='sm' color="danger" onClick={() => deleteRow(row)}><Trash  size={16}/></Button>
            </>
        , 
        },
    ];


    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle="Users"
                breadCrumbParent="Dashboard"
                breadCrumbActive="Users"
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
                                   Add User
                                </Button>
                            </CardHeader>
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={userList}
                                onRowClicked={(row) => editRow(row)}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Sidebar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
                selectedUser={selectedUser}
            />
        </Fragment>
    );
};

export default UserList;
