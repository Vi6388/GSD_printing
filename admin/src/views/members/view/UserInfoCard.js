import { useState, Fragment, useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Button, Badge } from 'reactstrap';
import { FiEdit2, FiEye } from 'react-icons/fi';
import { editClientReset } from '../store/reducer';
import { Check, Briefcase } from 'react-feather';
import { useForm } from 'react-hook-form';
import { fetchSingleClientAction, uploadAvatarAction } from '../store/actions';
import Avatar from '@components/avatar';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import { EditMember } from './EditMember';
import { DetailsMember } from './detailsMember';

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
};

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
};

const UserInfoCard = ({ selectedUser }) => {
  const [show, setShow] = useState(false);
  const [centeredModal, setCenteredModal] = useState(false);
  const [picker, setPicker] = useState(new Date());
  const { id } = useParams();
  const dispatch = useDispatch();
  const { contact, isClientContactEditSuccess, isClientContactLoading } = useSelector(
    (state) => state.clientContact
  );

  useEffect(() => {
    dispatch(fetchSingleClientAction(id));
    setData(getValues());
  }, []);

  const initialData = {
    firstName: selectedUser?.firstName || '',
    middleName: selectedUser?.middleName || '',
    lastName: selectedUser?.lastName || '',
    email: selectedUser?.email || '',
    companyEmail: selectedUser?.companyEmail || '',
    companyPhone: selectedUser?.companyPhone || '',
    gender: selectedUser?.gender || '',
    dob: selectedUser?.dob || null,
    type: selectedUser?.type || 'individual',
    zipCode: selectedUser?.address?.zipCode || '',
    street: selectedUser?.address?.street || '',
    state: selectedUser?.address?.state || '',
    city: selectedUser?.address?.city || '',
    country: selectedUser?.address?.country || '',
    phone: selectedUser?.phone || '',
    company: selectedUser?.company || '',
    position: selectedUser?.position || 'owner',
    cZipCode: selectedUser?.companyAddress?.zipCode || '',
    cStreet: selectedUser?.companyAddress?.street || '',
    cState: selectedUser?.companyAddress?.state || '',
    cCity: selectedUser?.companyAddress?.city || '',
    cCountry: selectedUser?.companyAddress?.country || '',
    status: selectedUser?.status || 'inactive',
    note: selectedUser?.note || '',
    date: picker || null,
    tags: selectedUser?.tags || []
  };

  // ** Hook
  const { setError, getValues } = useForm({
    defaultValues: initialData
  });

  const [data, setData] = useState({
    ...initialData
  });

  const photoRef = useRef();

  function onChoosePhoto() {
    photoRef?.current?.click();
  }

  function uploadPhoto({ file, id }) {
    const form = new FormData();
    form.append('file', file);
    form.append('id', id);
    dispatch(uploadAvatarAction(form, id));
  }

  const ToastContent = ({ message }) => (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title fw-bold">{message}</h6>
        </div>
      </div>
    </Fragment>
  );

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser?.photo?.length) {
      return (
        <div onClick={onChoosePhoto} className="cic-dp">
          <img
            height="110"
            width="110"
            alt="user-avatar"
            src={selectedUser.photo}
            className="img-fluid rounded mt-3 mb-2"
          />
          <div className="cic-photo-edit">
            <FiEdit2 className="cic-photo-edit-icon" />
          </div>
        </div>
      );
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          'light-success',
          'light-danger',
          'light-warning',
          'light-info',
          'light-primary',
          'light-secondary'
        ],
        color = states[stateNum];
      return (
        <>
          <Avatar
            onClick={onChoosePhoto}
            initials
            color={color}
            className="rounded mt-3 mb-2"
            content={selectedUser?.firstName ? selectedUser?.firstName : ''}
            contentStyles={{
              borderRadius: 0,
              fontSize: 'calc(48px)',
              width: '100%',
              height: '100%'
            }}
            style={{
              height: '110px',
              width: '110px'
            }}
          />
        </>
      );
    }
  };

  useMemo(() => {
    if (isClientContactEditSuccess) {
      toast.success(<ToastContent message="Clients updated successfull" />);
      dispatch(editClientReset());
      setShow(false);
    }
  }, [isClientContactEditSuccess]);

  return (
    <Fragment>
      <input
        type="file"
        onChange={(e) => {
          uploadPhoto({ file: e.target.files[0], id });
        }}
        hidden
        ref={photoRef}
      />
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4 className="d-flex">
                    {selectedUser !== null ? selectedUser?.firstName : ''}{' '}
                    {selectedUser !== null ? selectedUser?.middleName : ''}{' '}
                    {selectedUser !== null ? selectedUser?.lastName : ''}
                    <div className="ms-1">
                      <FiEye className="cic-eye-icon" />
                    </div>
                  </h4>
                  {selectedUser !== null ? (
                    <>
                      <Badge color={roleColors[selectedUser.role]} className="text-capitalize me-1">
                        {selectedUser.role}
                      </Badge>
                      <Badge className="text-capitalize" color={statusColors[selectedUser.status]}>
                        {selectedUser.status}
                      </Badge>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">0</h4>
                <small>Tasks Done</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">0</h4>
                <small>Projects Done</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">Member Info</h4>
          <div className="info-container mb-3">
            {selectedUser !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Gender:</span>
                  <span>{selectedUser?.gender}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Primary Contact:</span>
                  <span>{selectedUser?.contact?.primary}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Secondary Contact:</span>
                  <span>{selectedUser?.contact?.secondary}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email:</span>
                  <span>{selectedUser?.contact?.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Address:</span>
                  <span>
                    {selectedUser?.address?.street && `${selectedUser?.address?.street},`}

                    {selectedUser?.address?.city && `${selectedUser?.address?.city},`}

                    {selectedUser?.address?.zipCode && `${selectedUser?.address?.zipCode},`}
                    {selectedUser?.address?.state && `${selectedUser?.address?.state},`}

                    {selectedUser?.address?.country && `${selectedUser?.address?.country}`}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Nationality:</span>
                  <span>{selectedUser?.nationality}</span>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="d-flex justify-content-center pt-2">
            <Button
              color="primary"
              onClick={() => {
                let updatebleState = {
                  fullName: selectedUser?.firstName,
                  email: selectedUser?.contact?.email,
                  gender: selectedUser?.gender,
                  dob: selectedUser?.dob,
                  type: selectedUser?.type,
                  zipCode: selectedUser?.address?.zipCode,
                  street: selectedUser?.address?.street,
                  state: selectedUser?.address?.state,
                  city: selectedUser?.address?.city,
                  country: selectedUser?.address?.country,
                  phone: selectedUser?.phone,
                  company: selectedUser?.company,
                  position: selectedUser?.position,
                  cZipCode: selectedUser?.companyAddress?.zipCode,
                  cStreet: selectedUser?.companyAddress?.street,
                  cState: selectedUser?.companyAddress?.state,
                  cCity: selectedUser?.companyAddress?.city,
                  cCountry: selectedUser?.companyAddress?.country,
                  status: selectedUser?.status,
                  note: selectedUser?.note,
                  tags: selectedUser?.tags,
                  companyEmail: selectedUser?.companyEmail,
                  companyPhone: selectedUser?.companyPhone
                };

                setData(updatebleState);

                setShow(true);
              }}
            >
              Edit
            </Button>
            <Button
              className="ms-1"
              color="primary"
              outline
              onClick={() => setCenteredModal(!centeredModal)}
            >
              Details
            </Button>
          </div>
        </CardBody>
      </Card>
      {/* User Edit Modal */}
      <EditMember setShow={setShow} show={show} id={selectedUser?._id} />
      {/* User Details Modal */}
      <DetailsMember
        centeredModal={centeredModal}
        setCenteredModal={setCenteredModal}
        data={data}
        selectedUser={selectedUser}
      />
    </Fragment>
  );
};

export default UserInfoCard;
