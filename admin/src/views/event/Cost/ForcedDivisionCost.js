// ** React
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// ** ReactStrap Component
import { Card, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import Select, { components } from 'react-select';
import DataTable from 'react-data-table-component';

// ** React Icon
import { Trash } from 'react-feather';

// ** Third Party Component
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

// ** Actions
import { editParticularEventAction } from '../store/actions';

// ** Utils
import { selectThemeColors } from '@utils';
const MySwal = withReactContent(Swal);
const customConfirmClass = 'w-40 btn btn-danger';
const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';

const ForcedDivisionCost = (props) => {
  const { event, divisions } = props;

  const dispatch = useDispatch();
  const [selectDivision, setSelectDivision] = useState({
    _id: '',
    value: '',
    label: 'Sport > Sport Category > division',
    divisionFee: 0
  });

  const columns = [
    {
      name: 'Divisin Name',
      selector: (row) => row.divisionName
    },
    {
      name: 'Division Fee',
      selector: (row) => row.divisionFee + ' $'
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
                icon: 'info',
                showCancelButton: true,
                title: 'Delete Forced Division?',
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
                    if (divisionItem._id === row._id) {
                      return {
                        _id: divisionItem.value,
                        divisionId: divisionItem._id,
                        divisionFee: 0
                      };
                    } else {
                      return {
                        _id: divisionItem.value,
                        divisionId: divisionItem._id,
                        divisionFee: divisionItem.divisionFee
                      };
                    }
                  });
                  dispatch(
                    editParticularEventAction(
                      event._id,
                      { divisions: divisionsData },
                      'Delete Forced Division Fee'
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
      <h5 className="fw-bolder"> Forced Cost Divisions</h5>
      <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
        <div>
          <div className="">
            Forces a division to cost a certain amount. Removes the division from the normal
            registration count. For example, Team Forms may cost $40 no matter what, while Olympic
            Sparring and Forms may fall under normal registration costs.
          </div>
          <div className="mt-1">
            <div className="d-flex justify-content-start align-items-center fw-bolder mt-1">
              <div style={{ width: '350px' }}>
                <Select
                  id="division"
                  className="react-select"
                  classNamePrefix="select"
                  isClearable={false}
                  options={divisions}
                  value={selectDivision}
                  onChange={(data) => setSelectDivision(data)}
                  bsSize="sm"
                  theme={selectThemeColors}
                />
              </div>{' '}
              <span className="ms-1"> Select Division </span>
            </div>
            <div className="d-flex justify-content-start align-items-center fw-bolder mt-1">
              <InputGroup style={{ width: '350px' }}>
                <Input
                  type="number"
                  bsSize="sm"
                  value={selectDivision?.divisionFee}
                  disabled={!selectDivision?._id}
                  onChange={(e) => {
                    setSelectDivision({
                      ...selectDivision,
                      divisionFee: e.target.value ? parseInt(e.target.value) : 0
                    });
                  }}
                />
                <InputGroupText>$</InputGroupText>
              </InputGroup>
              <span className="ms-1">
                {' '}
                Cost Normal Registration (ends{' '}
                {new Date(
                  event?.endRegistrationDate && event.endRegistrationDate
                ).toLocaleDateString()}
                ){' '}
              </span>
            </div>
            <button
              type="button"
              className="btn btn-primary mt-1"
              disabled={
                selectDivision?._id === '' ||
                divisions.filter((divisionItem) => divisionItem._id === selectDivision._id)
                  .length === 0 ||
                (divisions.filter((divisionItem) => divisionItem._id === selectDivision._id)
                  .length > 0 &&
                  selectDivision?.divisionFee ===
                    divisions.filter((divisionItem) => divisionItem._id === selectDivision._id)[0]
                      .divisionFee)
              }
              onClick={() => {
                let divisionsData = divisions.map((divisionItem) => {
                  if (divisionItem._id === selectDivision._id) {
                    return {
                      _id: selectDivision.value,
                      divisionId: selectDivision._id,
                      divisionFee: selectDivision.divisionFee
                    };
                  } else {
                    return {
                      _id: divisionItem.value,
                      divisionId: divisionItem._id,
                      divisionFee: divisionItem.divisionFee
                    };
                  }
                });
                dispatch(
                  editParticularEventAction(
                    event._id,
                    { divisions: divisionsData },
                    divisions.filter((divisionItem) => divisionItem._id === selectDivision._id)
                      .length === 0
                      ? 'Added Division Fee'
                      : divisions.filter(
                          (divisionItem) => divisionItem._id === selectDivision._id
                        )[0].divisionFee === 0
                      ? 'Added Division Fee'
                      : 'Edited Division Fee'
                  )
                );

                setSelectDivision({
                  value: '',
                  label: 'Sport > Sport Category > division',
                  divisionFee: 0
                });
              }}
            >
              {divisions.filter((divisionItem) => divisionItem._id === selectDivision._id)
                .length === 0
                ? 'Add'
                : divisions.filter((divisionItem) => divisionItem._id === selectDivision._id)[0]
                    .divisionFee === 0
                ? 'Add'
                : 'Edit'}{' '}
              Forced Division Cost
            </button>
          </div>
        </div>
      </Card>
      <h5 className="fw-bolder"> Forced Division Costs Already Added</h5>

      <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
        <div className="react-dataTable">
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={divisions.filter((divisionItem) => divisionItem.divisionFee !== 0)}
            className="react-dataTable"
          />
        </div>
      </Card>
    </>
  );
};

export default ForcedDivisionCost;
