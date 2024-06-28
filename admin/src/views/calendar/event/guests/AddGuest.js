// ** Components
import CardInvite from '../CardInvite';
import { useParams, useHistory } from 'react-router-dom';
import { customInterIceptors } from '../../../../lib/AxiosProvider';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setErrors, getEventInfo } from '../store';
import { toast, Slide } from 'react-toastify';
// ** Reactstrap Imports
import { Row, Col, Card, CardTitle, CardBody, Input, Label, Button } from 'reactstrap';

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/base/pages/dashboard-ecommerce.scss';
import Table from './Table';

const AddGuest = (props) => {
  const API = customInterIceptors();
  const eventId = useParams();
  const history = useHistory();
  const [addGuestByInput, setAddGuestByInput] = useState('');
  const [allData, setAllData] = useState([]);
  const [isCheckedClient, setIsCheckedClient] = useState(false);
  const [allClients, setAllClients] = useState([]);
  const [isCheckedVenders, setIsCheckedVenders] = useState(false);
  const [allVenders, setAllVenders] = useState([]);
  const [isCheckedLeads, setIsCheckedLeads] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [isCheckedEmployees, setIsCheckedEmployees] = useState(false);
  const [allLeads, setAllLeads] = useState([]);
  const [isCheckedRelationship, setIsCheckedRelationship] = useState(false);
  const [allRelationships, setAllRelationship] = useState([]);

  const eventInfo = useSelector((state) => state.event.eventInfo);
  useEffect(() => {
    dispatch(getEventInfo(eventId.eventId));
  }, []);
  const onChangeAddGuestByInput = (e) => {
    setAddGuestByInput(e.target.value);
  };
  const getClient = async () => {
    const response = await API.get(`client-contact/get-for-addevent`);
    let clients = [];
    response.data.map((item) => {
      if (eventInfo.guests.findIndex((guest) => guest.email == item.email) == -1)
        clients.push({
          id: item._id,
          name: item.fullName,
          email: item.email,
          phone: item.phone,
          category: 'Client'
        });
    });
    setAllClients(clients);
  };
  const getLead = async () => {
    const response = await API.get(`lead-contact/get-for-addevent`);
    let Leads = [];
    response.data.map((item) => {
      if (eventInfo.guests.findIndex((guest) => guest.email == item.email) == -1)
        Leads.push({
          id: item._id,
          name: item.fullName,
          email: item.email,
          phone: item.phone,
          category: 'Lead'
        });
    });
    setAllLeads(Leads);
  };
  const getVender = async () => {
    const response = await API.get(`vendor-contact/get-for-addevent`);
    let Venders = [];
    response.data.map((item) => {
      if (eventInfo.guests.findIndex((guest) => guest.email == item.email) == -1)
        Venders.push({
          id: item._id,
          name: item.fullName,
          email: item.email,
          phone: item.phone,
          category: 'Vender'
        });
    });
    setAllVenders(Venders);
  };
  const getEmployee = async () => {
    const response = await API.get(`employee-contact/get-for-addevent`);
    let Employees = [];
    response.data.map((item) => {
      if (eventInfo.guests.findIndex((guest) => guest.email == item.email) == -1)
        Employees.push({
          id: item._id,
          fullName: item.fullName,
          email: item.email,
          phone: item.phone,
          category: 'Employee'
        });
    });
    setAllEmployees(Employees);
  };
  const getRelationship = async () => {
    const response = await API.get(`relation-contact/get-for-addevent`);
    let Relationships = [];
    response.data.map((item) => {
      if (eventInfo.guests.findIndex((guest) => guest.email == item.email) == -1)
        Relationships.push({
          id: item._id,
          fullName: item.fullName,
          email: item.email,
          phone: item.phone,
          category: 'Relationshiop'
        });
    });
    setAllRelationship(Relationships);
  };
  const checkClient = (status) => {
    setIsCheckedClient(status);
    if (status) {
      getClient();
    } else {
      setAllClients([]);
    }
  };
  const checkLead = (status) => {
    setIsCheckedLeads(status);
    if (status) {
      getLead();
    } else {
      setAllLeads([]);
    }
  };
  const checkVender = (status) => {
    setIsCheckedVenders(status);
    if (status) {
      getVender();
    } else {
      setAllVenders([]);
    }
  };
  const checkEmployee = (status) => {
    setIsCheckedEmployees(status);
    if (status) {
      getEmployee();
    } else {
      setAllEmployees([]);
    }
  };
  const checkRelationship = (status) => {
    setIsCheckedRelationship(status);
    if (status) {
      getRelationship();
    } else {
      setAllRelationship([]);
    }
  };
  const event = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const addGuests = async () => {
    let isVaildEmail = true;
    let addEmailArray;
    if (addGuestByInput != '') {
      addEmailArray = addGuestByInput.split(',').map((item) => item.trim());
      let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      addEmailArray.map((item) => {
        if (!item.match(validRegex)) {
          isVaildEmail = false;
        }
      });
    }

    if (isVaildEmail == false) {
      toast.error('Invalid Email');
    } else {
      let guestsData = event.addGuests;
      if (addEmailArray) {
        addEmailArray.map(
          (email) =>
            (guestsData = [
              ...guestsData,
              {
                id: '',
                fullName: '',
                email: email,
                phone: '',
                category: ''
              }
            ])
        );
      }

      if (guestsData.length == 0) {
        toast.error('Select Guests!');
      } else {
        const response = await API.post(`event/add-guests`, {
          data: guestsData,
          _id: eventId.eventId
        }).catch(function (error) {
          if (error.response) {
            return error.response;
          }
        });

        if (response.status == 404) {
          toast.error(response.data.msg);
          dispatch(setErrors(response.data));
        }

        if (response.status == 200) {
          toast.success('OK! Guests added successfully');
          dispatch(getEventInfo(eventId.eventId));
          history.push(`/event-details/${eventId.eventId}`);
        }
      }
    }
  };

  return (
    <Row>
      <Col lg="8" md="8" sm="12">
        <Card>
          <CardBody>
            <CardTitle>Include Guests</CardTitle>
            <div className="mb-2">
              <div className="form-check form-check-inline me-1">
                <Input
                  type="checkbox"
                  id="basic-cb-unchecked"
                  defaultChecked={isCheckedClient}
                  onChange={() => checkClient(!isCheckedClient)}
                />
                <Label for="basic-cb-unchecked" className="form-check-label">
                  Clients
                </Label>
              </div>
              <div className="form-check form-check-inline me-1">
                <Input
                  type="checkbox"
                  id="basic-cb-unchecked"
                  defaultChecked={isCheckedVenders}
                  onChange={() => checkVender(!isCheckedVenders)}
                />
                <Label for="basic-cb-unchecked" className="form-check-label">
                  Vendors
                </Label>
              </div>
              <div className="form-check form-check-inline me-1">
                <Input
                  type="checkbox"
                  id="basic-cb-unchecked"
                  defaultChecked={isCheckedLeads}
                  onChange={() => checkLead(!isCheckedLeads)}
                />
                <Label for="basic-cb-unchecked" className="form-check-label">
                  Leads
                </Label>
              </div>
              <div className="form-check form-check-inline me-1">
                <Input
                  type="checkbox"
                  id="basic-cb-unchecked"
                  defaultChecked={isCheckedEmployees}
                  onChange={() => checkEmployee(!isCheckedEmployees)}
                />
                <Label for="basic-cb-unchecked" className="form-check-label">
                  Employees
                </Label>
              </div>
              <div className="form-check form-check-inline">
                <Input
                  type="checkbox"
                  id="basic-cb-unchecked"
                  defaultChecked={isCheckedRelationship}
                  onChange={() => checkRelationship(!isCheckedRelationship)}
                />
                <Label for="basic-cb-unchecked" className="form-check-label">
                  Relationships
                </Label>
              </div>
            </div>

            <div className="mb-1">
              <div className="mb-1 d-flex justify-content-between">
                <div>Or Enter emails</div>
                <div>
                  Total Found: <strong>45</strong>
                </div>
              </div>
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                rows="3"
                value={addGuestByInput}
                onChange={onChangeAddGuestByInput}
                placeholder="Seperated By Commas Ex. example1@gmail.com, example2@gmail.com ..."
              />
            </div>
            <div>
              <Button color="primary" onClick={addGuests}>
                Add Guests
              </Button>
            </div>
          </CardBody>
        </Card>
        <div className="app-user-list">
          <Table
            allClients={allClients}
            allLeads={allLeads}
            allVenders={allVenders}
            allEmployees={allEmployees}
            allRelationships={allRelationships}
          />
        </div>
      </Col>
      <Col lg="4" md="4" sm="12">
        <CardInvite eventInfo={{ url: eventInfo.eventBanner }} />
      </Col>
    </Row>
  );
};

export default AddGuest;
