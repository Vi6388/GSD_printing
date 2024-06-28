// ** React
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// ** React Component
import { Card, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import Select, { components } from 'react-select';
import DataTable from 'react-data-table-component';

// ** React Icons
import { Trash } from 'react-feather';

// ** Third Party Component
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Actions
import { editParticularEventAction } from '../store/actions';

const MySwal = withReactContent(Swal);

// // ** Styles
// import '@styles/react/libs/react-select/_react-select.scss';
// import '@styles/react/libs/editor/editor.scss';
// ** Extra style
const customConfirmClass = 'w-40 btn btn-success';
const customCancelClass = 'w-40 ms-1 btn btn-outline-success';

const DisableDivisions = (props) => {
  // ** import props
  const { event, divisions } = props;

  // ** Store Variables
  const dispatch = useDispatch();

  // ** State
  const [selectDivision, setSelectDivision] = useState({
    _id: '',
    value: '',
    label: 'Sport > Sport Category > division'
  });

  // ** Coloumn
  const columns = [
    {
      name: 'Divisin Name',
      selector: (row) => row.label
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="column-action">
          <Trash
            size={16}
            className="cursor-pointer"
            onClick={() => {
              MySwal.fire({
                icon: 'success',
                showCancelButton: true,
                text: `Division Name:${' '}${row.label}`,
                title: '<p class="text-success">Are you sure you want to enable this division?</p>',
                customClass: {
                  confirmButton: customConfirmClass,
                  cancelButton: customCancelClass
                },
                showClass: {
                  popup: 'animate__animated animate__bounceIn'
                },
                buttonsStyling: false
              }).then((willDelete) => {
                if (willDelete.isConfirmed) {
                  let divisionsData = divisions.map((divisionItem) => {
                    if (divisionItem._id.toString() === row._id.toString()) {
                      return {
                        _id: divisionItem.value,
                        divisionId: divisionItem._id,
                        isDisabled: false
                      };
                    } else {
                      return {
                        _id: divisionItem.value,
                        divisionId: divisionItem._id,
                        isDisabled: divisionItem.isDisabled
                      };
                    }
                  });
                  dispatch(
                    editParticularEventAction(
                      event._id,
                      { divisions: divisionsData },
                      'Enable Forced Division'
                    )
                  );
                }
              });
            }}
          />
        </div>
      )
    }
  ];

  return (
    <>
      <h5>Disable Divisions</h5>
      <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
        <div>
          <div className="">
            Removes the division from registration. For example, my event does not offer Breaking.
            Whether or not something is in the list depends on the Division Rules you chose during
            event creation/editing.
          </div>
          <div className="mt-1">
            <span>
              Your current Division Rules: <b>Champions</b>
            </span>
          </div>
          <div>
            <span>
              Your affiliation is being displayed as: <b>CMA</b>
            </span>
          </div>
          <div className="mt-1">
            <div className="d-flex justify-content-start align-items-center fw-bolder mt-1">
              <div style={{ width: '350px' }}>
                <Select
                  id="division"
                  className="react-select"
                  classNamePrefix="select"
                  isClearable={false}
                  options={divisions
                    .filter((item) => item.isDisabled === false)
                    .map((item) => {
                      return { ...item, value: item._id };
                    })}
                  value={selectDivision}
                  theme={selectThemeColors}
                  onChange={(data) => setSelectDivision(data)}
                  bsSize="sm"
                />
              </div>{' '}
              <span className="ms-1"> Select Division </span>
            </div>
            <button
              type="button"
              className="btn btn-primary mt-1"
              disabled={selectDivision._id === ''}
              onClick={() => {
                let divisionsData = divisions.map((divisionItem) => {
                  if (divisionItem._id.toString() === selectDivision._id.toString()) {
                    return {
                      _id: selectDivision.value,
                      divisionId: selectDivision._id,
                      isDisabled: true
                    };
                  } else {
                    return {
                      _id: divisionItem.value,
                      divisionId: divisionItem._id,
                      isDisabled: divisionItem.isDisabled
                    };
                  }
                });
                dispatch(
                  editParticularEventAction(
                    event._id,
                    { divisions: divisionsData },
                    'Disabled Division'
                  )
                );
                setSelectDivision({
                  _id: '',
                  value: '',
                  label: 'Sport > Sport Category > division'
                });
              }}
            >
              Add Disabled Division
            </button>
          </div>
        </div>
      </Card>
      <h5>Disable Divisions Already Added</h5>
      <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
        <div className="react-dataTable">
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={divisions.filter((item) => item.isDisabled === true)}
            className="react-dataTable"
          />
        </div>
      </Card>
    </>
  );
};

export default DisableDivisions;
