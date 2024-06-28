// ** Reactstrap Imports
import { Card, CardHeader } from 'reactstrap';

// ** Third Party Components
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss';

export const columns = [
  {
    name: 'First Name',
    // width: '200px',
    selector: (row) => row.firstName
  },
  {
    name: 'Last Name',
    // width: '200px',
    selector: (row) => row.lastName
  },
  {
    name: 'Phone',
    // width: '200px',
    selector: (row) => row.phone
  },
  {
    name: 'Email',
    // width: '200px',
    selector: (row) => row.email
  }
];

const UsersList = ({ usersData, locationID }) => {
  const locationChecked = usersData?.map((element) => {
    return {
      ...element,
      locations: element.locations.filter((location) => location._id == locationID)
    };
  });
  const tableData = locationChecked?.filter((item) => item.locations.length !== 0);

  return (
    <Card>
      <CardHeader tag="h4">User's List</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          data={tableData}
          columns={columns}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UsersList;
