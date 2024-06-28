import React, { memo, useState, Fragment } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  CustomInput,
  Label,
  Input,
  Badge,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import Select from 'react-select';
import { Search } from 'react-feather';
// ** Utils
import { selectThemeColors } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { filterTextContacts, getTextContacts } from '../store';

function ProfileAvatar({ handleEventType, studentType, setLoading }) {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state?.text);
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'Active Trail', label: 'Active Trail' },
    { value: 'Former Student', label: 'Former Student' },
    { value: 'Former Trails', label: 'Former Trails' },
    { value: 'Former Lead', label: 'Former Lead' }
  ];
  let HandleSearch = async (e) => {
    let { value } = e.target;

    await setLoading(true);

    if (value?.length > 2) {
      let filterData =
        contacts?.length > 0 &&
        contacts?.flatMap((el) => {
          let { fullName } = el;

          if (fullName.toLowerCase().startsWith(value.toLowerCase())) {
            return el;
          }
        });

      let latestInfo =
        filterData?.length > 0 &&
        filterData?.filter(function (element) {
          return element !== undefined;
        });

      dispatch(filterTextContacts(latestInfo));
    } else if (value?.length === 0) {
      dispatch(getTextContacts());
    }
    if (value === '') {
      // await getDataBack()
    }
    await setLoading(false);
  };
  return (
    <div>
      <ListGroup>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Col xs="6" sm="6">
            Members
          </Col>
          <Col xs="6" sm="6">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={planOptions}
              value={currentPlan}
              onChange={(data) => {
                handleEventType(data), setCurrentPlan(data);
              }}
            />
          </Col>
        </Row>
      </ListGroup>
      <ListGroup>
        <div className="d-flex align-content-center justify-content-between w-100">
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
            <Input
              placeholder="Search contact"
              // value={query}
              onChange={HandleSearch}
            />
          </InputGroup>
        </div>
      </ListGroup>
    </div>
  );
}

export default memo(ProfileAvatar);
