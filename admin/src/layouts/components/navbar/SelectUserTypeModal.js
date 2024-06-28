// ** React Imports
import { Fragment, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// ** Context
import { AbilityContext } from '@src/utility/context/Can';
// ** Ajax Request
import { customInterIceptors } from '../../../lib/AxiosProvider';
const API = customInterIceptors();
// ** Custom Component
import Avatar from '@components/avatar';

import { toast, Slide } from 'react-toastify';
// ** Reactstrap Imports
import * as Icon from 'react-feather';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils';

import { handleChangeLocation, handleRoading } from '../../../redux/authentication';
const SelectUserTypeModal = (props) => {
  const dispatch = useDispatch();
  const ability = useContext(AbilityContext);
  const history = useHistory();
  // ** State
  const { selectModalOpen, setSelectModalOpen, selectedUserType, ToastContent, selectedAddress } =
    props;

  // ** Store
  // ** Redux store
  const authStore = useSelector((state) => state.auth);
  // ** Handlers
  const toggle = () => {
    setSelectModalOpen(!selectModalOpen);
  };
  const handleTypeClick = async (type) => {
    setSelectModalOpen(false);
    const permissions = await API.get('/permission', {
      params: { userType: type }
    });

    let newAbility = [
      {
        action: 'read',
        subject: 'base'
      }
    ];

    permissions.data &&
      permissions.data.length > 0 &&
      permissions.data.map((permission) => {
        if (permission.read === true) {
          newAbility.push({
            action: 'read',
            subject: permission.defaultId
          });
          if (permission.write === true) {
            newAbility.push({
              action: 'write',
              subject: permission.defaultId
            });
          }
          if (permission.update === true) {
            newAbility.push({
              action: 'update',
              subject: permission.defaultId
            });
          }
          if (permission.delete === true) {
            newAbility.push({
              action: 'delete',
              subject: permission.defaultId
            });
          }
        }
      });
    const data = {
      ability: newAbility,
      userType: type
    };
    dispatch(handleChangeLocation(data));
    ability.update(newAbility);

    history.push(getHomeRouteForLoggedInUser(type));
    toast.success(
      <ToastContent name={authStore.userData?.fullName || 'John Doe'} userType={type || 'admin'} />,
      {
        icon: false,
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      }
    );
  };
  return (
    <Fragment>
      <Modal isOpen={selectModalOpen} toggle={toggle} className="modal-md modal-dialog-centered">
        <ModalHeader toggle={toggle}>Select User type</ModalHeader>
        <ModalBody>
          <h4 className="font-small-4">
            You have access to {selectedUserType.length} accounts on this location.
          </h4>
          <h4 className="font-small-4">Please select one of them</h4>
          <div className="p-1 border">
            {selectedUserType &&
              selectedUserType.map((eachType, index) => (
                <div key={'usertype-' + index}>
                  <Button
                    onClick={(e) => handleTypeClick(eachType)}
                    color="link"
                    className="btn-skeleton btn-lg p-0 p-50"
                    outline
                  >
                    <Icon.CheckCircle size={20} className="me-1" />
                    {eachType}
                  </Button>
                </div>
              ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggle()} outline>
            cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
export default SelectUserTypeModal;
