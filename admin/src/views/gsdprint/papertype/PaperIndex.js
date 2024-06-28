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
import { getPaperTypesData, deletePaperType } from "../../../requests/admin/paperTypeAPI";
import { toast } from "react-toastify";

const __baseUrl = "http://localhost:8080";

// Functional component
const PaperIndex = () => {
    const [list, setList] = useState([]);
    const [selectedPaperType, setSelectedPaperType] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        getPaperTypeList();
    };

    useEffect(() => {
        getPaperTypeList();
    }, []);

    const getPaperTypeList = async () => {
        const response = await getPaperTypesData();
        if(response?.status === true) {
            setList(response?.list)
        }
    }

    const editPaperType = (row) => {
        setSelectedPaperType(row);
        toggleSidebar();
    }

    const deleteRow = async (row) => {
      const response = await deletePaperType(row?._id);
      if(response?.status === true) {
        toast.success(
            <div className="toastify-header">
            <div className="title-wrapper">
                <h6 className="toast-title fw-bold">{response?.message}</h6>
            </div>
            </div>
        );
        getPaperTypeList();
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
      name: 'Paper Image',
      cell: row => {
        return <img src={`${__baseUrl}/${row.paperImage}`} alt="Product" style={{ width: '50px', height: '50px' }} />;
    }
    },
    {
      name: 'Paper Name',
      selector: (row) => row.paperName,
    },
    {
      name: 'Paper Type',
      selector: (row) => row.paperType,
    },
    {
      name: 'Action',
      cell: (row) => (
        <>
          <Button size="sm" color="primary" className="me-1" onClick={() => editPaperType(row)}>
            <AiOutlineEdit size={16} />
          </Button>
          <Button size="sm" color="danger" onClick={() => deleteRow(row)}>
            <Trash size={16} />
          </Button>
        </>
      ),
    },
];  


    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle="Paper Type"
                breadCrumbParent="Dashboard"
                breadCrumbActive="Paper Type"
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
                                   Add Paper
                                </Button>
                            </CardHeader>
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={list}
                                onRowClicked={(row) => editPaperType(row)}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Sidebar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
                editPaperType={selectedPaperType}
            />
        </Fragment>
    );
};

export default PaperIndex;
