import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiCalendarEvent } from 'react-icons/bi';
import { BsPrinter } from 'react-icons/bs';
import { CSVLink } from 'react-csv';
import { Share, FileText, File, TrendingUp, Download } from 'react-feather';
import {
  Row,
  Col,
  Input,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import AddProgression from '../members/list/AddProgression';
import { AddNewLocation } from '../cmacomponent/AddNewLocation';
import { AddNewMember } from '../cmacomponent/AddNewMember';
import { AddNewMemberShip } from '../cmacomponent/AddNewMembership';

export const CustomHeader = ({
  tableData,
  handlePerPage,
  showdelete,
  rowsPerPage,
  handleFilter,
  setContactImportModal,
  setIsMergeModalOpen,
  selectCustomerData,
  setSelectCustomerData,
  addMemberPopUp,
  addNewLocation,
  addMemberShipsPopUp
}) => {
  const [useraddModal, setUserAddModal] = useState(false);
  const [locationPopup, setLocationPopup] = useState(false);
  const [membershipPopup, setMembershipPopup] = useState(false);
  const headers = [
    { label: 'Serial', key: 'sl' },
    { label: 'Client Name', key: 'fullName' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Gender', key: 'gender' },
    { label: 'Address', key: 'address' },
    { label: 'Status', key: 'status' },
    { label: 'Note', key: 'note' },
    { label: 'Company Phone', key: 'companyPhone' },
    { label: 'Company Email', key: 'companyEmail' },
    { label: 'Type', key: 'type' },
    { label: 'Company', key: 'company' },
    { label: 'Position', key: 'position' },
    { label: 'Social Links', key: 'socialLinks' },
    { label: 'Payment Methods', key: 'paymentMethods' }
  ];

  const csvReport = {
    filename: 'clients.csv',
    headers: headers,
    data: ''
  };

  const [isHover, setIsHover] = useState(false);
  const [openAddProgression, setOpenAddProgression] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const columns = [
    { title: 'Sl', field: 'sl' },
    { title: 'Client', field: 'fullName' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone', type: 'numeric' },
    { title: 'Gender', field: 'gender' },
    { title: 'Address', field: 'address' },
    { title: 'Status', field: 'status' },
    { title: 'Note', field: 'note' },
    { title: 'Company Phone', field: 'companyPhone' },
    { title: 'Company Email', field: 'companyEmail' },
    { title: 'Type', field: 'type' },
    { title: 'Company', field: 'company' },
    { title: 'Position', field: 'position' },
    { title: 'Social Link', field: 'socialLink' },
    { title: 'Payment Methods', field: 'paymentMethods' }
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Client Details', 15, 10);
    doc.autoTable({
      styles: {
        fontSize: 8
      },
      theme: 'grid',
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: '',
      horizontalPageBreak: true,
      headStyles: {
        halign: 'center',
        valign: 'middle',
        fontSize: 7,
        fillColor: ['#f3f2f7'],
        textColor: '#202c33',
        tableWidth: 'auto'
      },
      bodyStyles: {
        textColor: 'black'
      }
    });
    doc.save('clients.pdf');
  };
  let typingTimer; //timer identifier
  let doneTypingInterval = 500; //time in ms (500 ms)
  function doneTyping(val) {
    handleFilter(val);
  }

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">Entries</label>
          </div>
        </Col>
        <Col
          xl="8"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              // value={tempValue}
              onChange={(e) => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => doneTyping(e.target.value), doneTypingInterval);
              }}
            />
          </div>

          <div className="d-flex text-center">
            {showdelete ? (
              <div>
                <Button
                  className="btn-icon me-1"
                  outline
                  color="primary"
                  // onClick={() => toggle ((p) => !p)}
                >
                  <AiOutlineDelete size={16} />
                </Button>
              </div>
            ) : (
              ''
            )}
            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setOpenAddProgression(true)}
                disabled={!showdelete}
              >
                {/* <BiUser size={16} /> */}
                <TrendingUp size={16} />
              </Button>
            </div>
            <div>
              <Button className="btn-icon me-1" outline color="primary">
                <BiCalendarEvent size={16} />
              </Button>
            </div>
            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setIsMergeModalOpen(true)}
              >
                <BsPrinter size={16} />
              </Button>
            </div>

            <div>
              <Button.Ripple
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setContactImportModal((p) => !p)}
              >
                <Download size={16} />
              </Button.Ripple>
            </div>
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  className="w-100"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    // downloadCSV(store.data)
                  }}
                >
                  <FileText className="font-small-4 me-50" />
                  {!tableData && (
                    <CSVLink {...csvReport}>
                      <span
                        className="align-middle"
                        style={{
                          color: isHover ? '#7367f0' : '#b4b7bd'
                        }}
                      >
                        CSV
                      </span>
                    </CSVLink>
                  )}
                </DropdownItem>
                {tableData && (
                  <DropdownItem className="w-100" onClick={() => downloadPdf()}>
                    <File className="font-small-4 me-50" />
                    <span className="align-middle">PDF</span>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
            {addMemberShipsPopUp && (
              <>
                <Button
                  style={{ fontSize: '12px' }}
                  className="add-new-user"
                  color="primary"
                  onClick={() => setMembershipPopup(true)}
                >
                  Add New Membership
                </Button>
              </>
            )}
            {membershipPopup && (
              <AddNewMemberShip
                membershipPopup={membershipPopup}
                setMembershipPopup={setMembershipPopup}
              />
            )}
            {addMemberPopUp && (
              <>
                <Button
                  style={{ fontSize: '12px' }}
                  className="add-new-user"
                  color="primary"
                  onClick={() => setUserAddModal(true)}
                >
                  Add New Member
                </Button>
                <AddNewMember setStepperModal={setUserAddModal} stepperModal={useraddModal} />
              </>
            )}
            {addNewLocation && (
              <Button
                style={{ fontSize: '12px' }}
                className="add-new-user"
                color="primary"
                onClick={() => setLocationPopup(true)}
              >
                Add New Location
              </Button>
            )}
            {locationPopup && (
              <AddNewLocation locationPopup={locationPopup} setLocationPopup={setLocationPopup} />
            )}
          </div>
        </Col>
      </Row>
      <AddProgression
        selectCustomerData={selectCustomerData}
        setSelectCustomerData={setSelectCustomerData}
        setOpenAddProgression={setOpenAddProgression}
        openAddProgression={openAddProgression}
      />
    </div>
  );
};
