import React from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);
const customConfirmClass = 'w-40 btn btn-danger';
const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';
import { editUserTypeAction } from '../users/store/action';

const changeUserType = (props) => {
  const { dispatch, userId, demoteTo, promoteTo, locationData, locationId, refetch } = props;
  return MySwal.fire({
    showCancelButton: true,
    title: `Really ${promoteTo ? 'Promote' : 'Demote'} to ${promoteTo || demoteTo}?`,
    customClass: {
      confirmButton: customConfirmClass,
      cancelButton: customCancelClass
    },
    showClass: {
      popup: 'animate__animated animate__bounceIn'
    },
    buttonsStyling: false,
    // style='margin-left:10px; flex:1; min-height:  0px!important;'
    html: `<div class="d-flex justify-content-start align-items-center fw-bolder mt-1">
            <div class="d-flex" >
                ${
                  locationData
                    ? `<span class="me-1">Select Location</span>
                    <Select id="swal-select-location" class="select__control css-1s2u09g-control" style="width: 200px;">
                    ${locationData.map((item) => {
                      return `<option value=${item._id}>${item.name}</option>`;
                    })}
                    </Select>`
                    : ``
                }
            </div>
        </div>`,
    focusConfirm: false,
    preConfirm: () => {
      let payload = {
        demoteTo: demoteTo,
        promoteTo: promoteTo,
        userId: userId,
        locationId: locationId ? locationId : document.getElementById('swal-select-location')?.value
      };
      dispatch(editUserTypeAction(payload, refetch));
    }
  });
};

export default changeUserType;
