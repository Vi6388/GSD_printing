import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import Select, { components } from 'react-select';
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';

import { editParticularEventAction } from '../store/actions';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const MySwal = withReactContent(Swal);
const customConfirmClass = 'w-40 btn btn-danger';
const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';

const SpectatorPass = (props) => {
  const { event } = props;

  const dispatch = useDispatch();

  const [spectatorPassName, setspectatorPassName] = useState('');
  const [spectatorPassAmount, setspectatorPassAmount] = useState(0);

  const columns = [
    {
      name: 'Spectator Pass Name',
      selector: (row) => row.spectatorPassName
    },
    {
      name: 'Spectator Pass Amount',
      selector: (row) => row.spectatorPassAmount
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="column-action">
          <Edit
            size={16}
            className="cursor-pointer me-2"
            onClick={() => {
              MySwal.fire({
                icon: 'info',
                showCancelButton: true,
                title: `Reset spectatorPass`,
                customClass: {
                  confirmButton: customConfirmClass,
                  cancelButton: customCancelClass
                },
                showClass: {
                  popup: 'animate__animated animate__bounceIn'
                },
                buttonsStyling: false,
                html:
                  `<div class="d-flex justify-content-start align-items-center fw-bolder mt-1">
                    <Input id="swal-input-spectatorPass-name" class="form-control-sm form-control" style="width: 180px;" value=${row.spectatorPassName}>
                      <span class="ms-1">
                        spectatorPass Name
                      </span>
                  </div>` +
                  `<div class="d-flex justify-content-start align-items-center fw-bolder mt-1">
                    <input type="number" id="swal-input-spectatorPass-amount" class="form-control-sm form-control" value=${row.spectatorPassAmount}
                      style="width: 150px; border-top-right-radius: 0; border-bottom-right-radius: 0;" />
                    <span
                      style="width: 30px;
                        height: 30px;
                        border: 1px solid #d8d6de;
                        border-radius: 0.325rem;
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                        line-height: 1.8;"
                      >
                      $
                    </span>
                    <span class="ms-1">spectatorPass Amount</span>
                  </div>`,
                focusConfirm: false,
                preConfirm: () => {
                  let editspectatorPass = {
                    _id: row._id,
                    spectatorPassName: document.getElementById('swal-input-spectatorPass-name')
                      .value,
                    spectatorPassAmount:
                      parseInt(document.getElementById('swal-input-spectatorPass-amount').value) ===
                      NaN
                        ? 0
                        : parseInt(document.getElementById('swal-input-spectatorPass-amount').value)
                  };
                  let prevspectatorPassItem = event.spectatorPasses.filter(
                    (spectatorPassItem) => spectatorPassItem._id === editspectatorPass._id
                  )[0];
                  if (
                    editspectatorPass.spectatorPassName ===
                      prevspectatorPassItem.spectatorPassName &&
                    editspectatorPass.spectatorPassAmount ===
                      prevspectatorPassItem.spectatorPassAmount
                  )
                    return toast.warning('Not changed!');
                  if (
                    editspectatorPass.spectatorPassName !==
                      prevspectatorPassItem.spectatorPassName &&
                    event.spectatorPasses.filter(
                      (spectatorPassItem) =>
                        spectatorPassItem.spectatorPassName === editspectatorPass.spectatorPassName
                    ).length === 1
                  )
                    return toast.warning(
                      'There are same spectatorPass name, Reset spectatorPass name!'
                    );

                  let spectatorPassesData = [];
                  event.spectatorPasses.map((spectatorPassItem) => {
                    if (spectatorPassItem._id.toString() === editspectatorPass._id.toString())
                      spectatorPassesData.push(editspectatorPass);
                    else spectatorPassesData.push(spectatorPassItem);
                  });
                  dispatch(
                    editParticularEventAction(
                      event._id,
                      { spectatorPasses: spectatorPassesData },
                      'Edited Select Spectator Pass'
                    )
                  );
                }
              });
            }}
          />
          <Trash
            size={16}
            className="cursor-pointer"
            onClick={() => {
              MySwal.fire({
                icon: 'info',
                showCancelButton: true,
                title: 'Deleted Spectator Pass ?',
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
                  let spectatorPassesData = [];
                  event.spectatorPasses.map((spectatorPassItem) => {
                    if (spectatorPassItem.spectatorPassName !== row.spectatorPassName) {
                      spectatorPassesData.push(spectatorPassItem);
                    }
                  });
                  dispatch(
                    editParticularEventAction(
                      event._id,
                      { spectatorPasses: spectatorPassesData },
                      'Deleted Select Spectator Pass'
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
      <h5 className="fw-bolder"> Spectator Pass </h5>
      <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
        <div>
          <div className="">
            This section allows you to add new evntellaneous fees. For example, allow spectactor
            fees to be collected now. If you add a fee here it will be offered during registration.
          </div>

          <div className="d-flex justify-content-start align-items-center fw-bolder mt-1">
            <Input
              type="text"
              bsSize="sm"
              style={{ width: '300px' }}
              value={spectatorPassName}
              onChange={(e) => setspectatorPassName(e.target.value)}
            />
            <span className="ms-1"> Spectator Pass Name </span>
          </div>
          <div className="d-flex justify-content-start align-items-center fw-bolder mt-1">
            <InputGroup style={{ width: '300px' }}>
              <Input
                type="number"
                bsSize="sm"
                name="spectatorPassAmount"
                value={spectatorPassAmount}
                onChange={(e) => {
                  setspectatorPassAmount(e.target.value ? parseInt(e.target.value) : null);
                }}
              />
              <InputGroupText>$</InputGroupText>
            </InputGroup>
            <span className="ms-1">
              {' '}
              Spectator Pass Amount. (ends{' '}
              {new Date(
                event?.endRegistrationDate && event.endRegistrationDate
              ).toLocaleDateString()}
              )
            </span>
          </div>
          <button
            type="button"
            disabled={
              spectatorPassAmount <= 0 ||
              !spectatorPassName ||
              event.spectatorPasses.filter(
                (spectatorPassItem) => spectatorPassItem.spectatorPassName === spectatorPassName
              ).length > 0
            }
            className="btn btn-primary mt-1"
            onClick={() => {
              let spectatorPassesData = [];
              event.spectatorPasses.map((spectatorPassItem) => {
                spectatorPassesData.push(spectatorPassItem);
              });
              spectatorPassesData.push({
                spectatorPassName,
                spectatorPassAmount
              });
              dispatch(
                editParticularEventAction(
                  event._id,
                  { spectatorPasses: spectatorPassesData },
                  'Created New Spectator Pass'
                )
              );
              setspectatorPassName('');
              setspectatorPassAmount(0);
            }}
          >
            Add Spectator Pass
          </button>
        </div>
      </Card>
      <h5 className="fw-bolder"> Spectator Passes Already Added</h5>

      <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
        <div className="react-dataTable">
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={event?.spectatorPasses ? event.spectatorPasses : []}
            className="react-dataTable"
          />
        </div>
      </Card>
    </>
  );
};

export default SpectatorPass;
