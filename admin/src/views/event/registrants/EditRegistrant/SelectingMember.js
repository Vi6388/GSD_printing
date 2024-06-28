// ** React Imports
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

// ** Third Party Imports
import Select, { components } from 'react-select';
import { Row, Col, Input, Label, Button } from 'reactstrap';
import AvatarGroup from '@components/avatar-group';
import { toast } from 'react-toastify';

// ** Action Imports
import { fetchRankAllData } from '../../../../requests/settings/sport-management';
import { fetchMemberRankData } from '../../../../requests/member/GetMembers';
import { fetchEventRegistrantByRegistrantTypeData } from '../../../../requests/event/event-registrant';

// ** Utils
import { calculateAge } from '../../../../utility/Utils';

// ** Images Imports
import profilepic from '../../../../assets/images/profile/user-uploads/user-13.jpg';

const SelectingMember = (props) => {
  const { stepper, payload, setPayload, event, registrantType, selectMemberData } = props;
  const [members, setMembers] = useState([]);
  const [rankData, setRankData] = useState([]);
  const [weight, setWeight] = useState(null);
  const [weightUnit, setWeightUnit] = useState({ value: 'kilograms', label: 'Kg' });

  const { data: rankAllData } = fetchRankAllData();
  const { data: memberRankAllData } = fetchMemberRankData();
  const { data: eventRegistrantByTypeData } = useQuery(
    ['get-event-registrant-by-type-data', event?._id, registrantType],
    fetchEventRegistrantByRegistrantTypeData
  );

  const weightUnits = [
    { value: 'kilograms', label: 'Kg' },
    { value: 'pounds', label: 'LBS' }
  ];

  // ** Effects

  useEffect(() => {
    if (selectMemberData) {
      let memberRankData =
        memberRankAllData &&
        memberRankAllData.filter(
          (memberRankItem) =>
            memberRankItem.memberId === selectMemberData.memberId &&
            memberRankItem.type === 'member'
        );
      setRankData(
        memberRankData?.length > 0 &&
          memberRankData.map(
            (memberRankItem) =>
              rankAllData &&
              rankAllData.filter((rankItem) => rankItem._id === memberRankItem.rankId)[0]
          )
      );
      setWeight(selectMemberData.member[0].weight?.value);
      setWeightUnit(selectMemberData.member[0].weight?.unit);
    }
  }, [selectMemberData]);
  // ** Handlers
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };
  const handleWeightUnitChange = (e) => {
    setWeightUnit(e.target.value);
  };
  const handleNextClick = (e) => {
    setPayload({
      ...payload,
      weight: { value: weight, unit: weightUnit ? weightUnit : 'kilograms' }
    });
    stepper.next();
  };
  return (
    <>
      <Row>
        <Col sm={8}>
          {selectMemberData && (
            <div className="my-2">
              <div className="d-flex align-items-center">
                <img
                  src={
                    selectMemberData.member[0]?.avatar
                      ? selectMemberData.member[0].avatar
                      : profilepic
                  }
                  alt=""
                  className="round-img mx-2"
                  style={{ borderRadius: '50%', height: '60px', width: '60px' }}
                />
                <h4>
                  {selectMemberData &&
                    selectMemberData.member[0].firstName +
                      (selectMemberData.member[0].middleName
                        ? ' ' + selectMemberData.member[0].middleName
                        : null) +
                      (selectMemberData.member[0].lastName
                        ? ' ' + selectMemberData.member[0].lastName
                        : null)}
                  {selectMemberData.member[0].dateOfBirth && (
                    <p style={{ fontSize: '14px', color: '#000', fontWeight: '300' }}>
                      {calculateAge(selectMemberData.member[0].dateOfBirth).toString() +
                        ' years old'}
                    </p>
                  )}
                </h4>
                {selectMemberData.member[0].height?.value !== undefined && (
                  <div className="mx-2">
                    <h5 style={{ color: '#000', fontWeight: '300' }}>
                      {selectMemberData.member[0].height?.value +
                        ' ' +
                        selectMemberData.member[0].height?.unit}
                    </h5>
                    <h5 style={{ color: '#000', fontWeight: '300' }}>
                      {selectMemberData.member[0].weight?.value +
                        ' ' +
                        selectMemberData.member[0].weight?.unit}
                    </h5>
                  </div>
                )}
                <div className="ms-2">
                  {rankData ? (
                    <AvatarGroup
                      data={rankData.map((rankItem, index) => {
                        return {
                          _id: rankItem._id,
                          title: rankItem.rankName,
                          placement: 'bottom',
                          img: rankItem.rankImage,
                          imgHeight: 33,
                          imgWidth: 33
                        };
                      })}
                    />
                  ) : (
                    <h3> Not Rank</h3>
                  )}
                </div>
              </div>
            </div>
          )}
        </Col>
        <Col sm={4}>
          <Label className="mb-50">Weight:</Label>
          <div className="d-flex">
            <Input
              type="text"
              name="weight"
              onChange={(e) => handleWeightChange(e)}
              className="me-50"
              value={weight}
              style={{ flex: '5' }}
            />
            <Input
              type="select"
              name="weightUnit"
              id="weightUnit"
              style={{ flex: '1' }}
              value={weightUnit}
              onChange={(e) => handleWeightUnitChange(e)}
            >
              {weightUnits?.map((item, key) => {
                return (
                  <option key={key} value={item.value}>
                    {' '}
                    &nbsp; {item.label}
                  </option>
                );
              })}
            </Input>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-1">
        <Button color="secondary" outline disabled className="me-1">
          Previous
        </Button>
        <Button color="primary" disabled={!weight} onClick={(e) => handleNextClick()}>
          NEXT
        </Button>
      </div>
    </>
  );
};

export default SelectingMember;
