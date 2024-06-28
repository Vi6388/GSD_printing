import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { CustomHeader } from './CustomHeader';
import { fetchLocationdata } from '../../requests/location/LocationAPI';
import { fetchUsersdata } from '../../requests/users/UsersAPI';
import { fetchAdmindata } from '../../requests/admin/AdminAPI';
import { fetchOperatordata } from '../../requests/operators/OperatorsAPI';
import { fetchMemberdata } from '../../requests/member/GetMembers';
import { getMemberShip } from '../../requests/memberships/membershipAPI';

export const TableData = ({
  reloadData,
  tableColumns,
  addMemberPopUp,
  addNewLocation,
  addMemberShipsPopUp,
  selectedId,
  showModal,
  showMembershipData
}) => {
  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(true);

  let newData = reloadData.location
    ? fetchLocationdata().data
    : reloadData.users
    ? fetchUsersdata().data
    : reloadData.admin
    ? fetchAdmindata().data
    : reloadData.operators
    ? fetchOperatordata().data
    : reloadData.members
    ? fetchMemberdata().data
    : reloadData.memberShipData || showMembershipData
    ? getMemberShip().data
    : [];

  useEffect(() => {
    setTableData(newData);
    setLoading(false);
  }, [showMembershipData, reloadData, newData, tableColumns]);

  const [selectCustomerData, setSelectCustomerData] = useState([]);
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactImportModal, setContactImportModal] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [showdelete, setShowdelete] = useState(false);

  const handlePagination = async (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
  };

  const CustomPagination = () => {
    const count = Math.ceil('');
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    );
  };
  const dataToRender = () => tableData;
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const handleRowSelected = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      setSelectCustomerData(selectedRows);
      setShowdelete(true);
    } else {
      setShowdelete(false);
      setSelectCustomerData([]);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive={true}
            progressPending={loading}
            paginationServer
            columns={tableColumns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            subHeaderComponent={
              <CustomHeader
                setContactImportModal={setContactImportModal}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                showdelete={showdelete}
                setIsMergeModalOpen={setIsMergeModalOpen}
                selectCustomerData={selectCustomerData}
                setSelectCustomerData={setSelectCustomerData}
                addMemberPopUp={addMemberPopUp}
                addNewLocation={addNewLocation}
                addMemberShipsPopUp={addMemberShipsPopUp}
                selectedId={selectedId}
                showModal={showModal}
              />
            }
            onSelectedRowsChange={handleRowSelected}
            selectableRows
          />
        </div>
      </Card>
    </>
  );
};
