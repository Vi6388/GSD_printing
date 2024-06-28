// ** Reactstrap Imports
import { Card, CardHeader } from 'reactstrap';

// ** Third Party Components
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss';

export const columns = [
  {
    name: 'Operator Name',
    width: '200px',
    selector: (row) => `${row.firstName} ${row.lastName}`
  },
  {
    name: 'Phone',
    selector: (row) => row?.auth.phone
  },
  {
    name: 'Email',
    width: '200px',
    selector: (row) => row?.auth.email
  },
  {
    name: 'Gender',
    selector: (row) => row.gender
  },
  {
    name: 'Available In',
    selector: (row) => row.locations.length
  }
];

const OperatorsList = ({ locationOperators }) => {
  return (
    <Card>
      <CardHeader tag="h4">Operators List</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={locationOperators}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default OperatorsList;
