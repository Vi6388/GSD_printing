// ** React Imports
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';

// ** Third Party Imports
import Select, { components } from 'react-select';
import { Row, Col, Input, Label, Button } from 'reactstrap';
import AvatarGroup from '@components/avatar-group';
import { toast } from 'react-toastify';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

// ** Action Imports
import { fetchRankAllData } from '../../../../requests/settings/sport-management';
import { fetchMemberRankData } from '../../../../requests/member/GetMembers';
import { getMemberShipData } from '../../../../requests/memberships/membershipAPI';
import {
  // fetchEventRegistrantByRegistrantTypeData,
  fetchEventRegistrantData
} from '../../../../requests/event/event-registrant';
// ** Images Imports
import profilepic from '../../../../assets/images/profile/user-uploads/user-13.jpg';

// ** Utils
import { calculateAge, convertUnit } from '../../../../utility/Utils';
const MySwal = withReactContent(Swal);
const customConfirmClass = 'w-40 btn btn-danger';
const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';

const SelectingMember = (props) => {
  const { stepper, payload, setPayload, event, registrantType, memberData } = props;

  // ** Vars
  const history = useHistory();

  // ** State
  const [members, setMembers] = useState([]);
  const [weight, setWeight] = useState(null);
  const [weightUnit, setWeightUnit] = useState({ value: 'kilograms', label: 'Kg' });

  const { data: rankAllData } = fetchRankAllData();
  const { data: memberRankAllData } = fetchMemberRankData();
  // const { data: registrantByTypeData } = useQuery(
  //   ['get-event-registrant-by-type-data', event?._id, registrantType],
  //   fetchEventRegistrantByRegistrantTypeData
  // );
  const { data: registrantData } = useQuery(
    ['event-registrant-table', event?._id],
    fetchEventRegistrantData
  );

  const { data: membershipData } = getMemberShipData();

  const weightUnits = [
    { value: 'kilograms', label: 'Kg' },
    { value: 'pounds', label: 'LBS' }
  ];

  // ** Effects
  useEffect(() => {
    let tmp = [];
    memberData &&
      memberData.map((member, index) => {
        if (
          registrantData?.filter((item) => item.memberId.toString() === member._id.toString())
            .length === 0
        ) {
          let memberRankData =
            memberRankAllData &&
            memberRankAllData.filter(
              (memberRankItem) =>
                memberRankItem.memberId === member._id && memberRankItem.type === 'member'
            );
          let rankData =
            memberRankData?.length > 0 &&
            memberRankData.map(
              (memberRankItem) =>
                rankAllData &&
                rankAllData.filter((rankItem) => rankItem._id === memberRankItem.rankId)[0]
            );
          tmp.push({
            value: member._id,
            label:
              member.firstName +
              (member.middleName ? ' ' + member.middleName : '') +
              (member.lastName ? ' ' + member.lastName : ''),
            rank: rankData,
            data: member
          });
        }
      });
    setMembers(tmp);
  }, [memberData, registrantData, memberRankAllData, rankAllData]);
  // ** Handlers
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };
  const handleWeightUnitChange = (e) => {
    setWeightUnit(e.target.value);
  };
  const handleNextClick = (e) => {
    if (
      membershipData?.length > 0 &&
      membershipData.filter(
        (membershipItem) =>
          membershipItem.memberId.toString() === payload?.member?.data?._id?.toString() &&
          new Date(membershipItem.endDate) > new Date()
      ).length > 0
    ) {
      setPayload({
        ...payload,
        weight: { value: weight, unit: weightUnit ? weightUnit : 'kilograms' }
      });
      stepper.next();
    } else
      return MySwal.fire({
        icon: 'info',
        showCancelButton: true,
        title:
          membershipData?.length > 0 &&
          membershipData.filter(
            (membershipItem) =>
              membershipItem.memberId.toString() === payload?.member?.data?._id?.toString()
          ).length > 0
            ? `Your membership's period is past.<br/> Extend your membership.`
            : `You can't register.<br/> Need the membership.`,
        customClass: {
          confirmButton: customConfirmClass
          // cancelButton: customCancelClass
        },
        confirmButtonText: 'Buy Membership',
        showCancelButton: false,
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        buttonsStyling: false
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          history.push({
            state: { memberId: payload?.member?.data?._id, url: window.location.pathname },
            pathname: '/membership'
          });
        }
      });
  };
  return (
    <>
      <Row>
        <Col sm={6}>
          <Label className="mb-50">Members:</Label>
          <Select
            id="member"
            options={members}
            value={payload?.member}
            className="react-select"
            classNamePrefix="select"
            isClearable={false}
            onChange={(data) => {
              setPayload({ ...payload, member: data, memberId: data.value });
              if (data.data.weight) {
                setWeight(data.data.weight.value);
                setWeightUnit(data.data.weight.unit);
              }
            }}
          />
        </Col>
        <Col sm={6}>
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
      {payload?.member ? (
        <div className="my-2">
          <div className="d-flex align-items-center">
            <img
              src={payload.member?.data?.avatar ? payload.member.data.avatar : profilepic}
              alt=""
              className="round-img mx-2"
              style={{ borderRadius: '50%', height: '60px', width: '60px' }}
            />
            <h4>
              {payload.member.label}
              {payload.member.data.dateOfBirth && (
                <p style={{ fontSize: '14px', color: '#000', fontWeight: '300' }}>
                  {calculateAge(payload.member.data.dateOfBirth).toString() + ' years old'}
                </p>
              )}
            </h4>
            <div className="mx-2">
              <h5 style={{ color: '#000', fontWeight: '300' }}>
                {payload.member.data.height?.value === undefined
                  ? ' 0 CM '
                  : payload.member.data.height?.value +
                    ' ' +
                    convertUnit(payload.member.data.height?.unit)}
              </h5>
              <h5 style={{ color: '#000', fontWeight: '300' }}>
                {payload.member.data.weight?.value === undefined
                  ? ' 0 KG'
                  : payload.member.data.weight?.value +
                    ' ' +
                    convertUnit(payload.member.data.weight?.unit)}
              </h5>
            </div>
            <div className="ms-2">
              {payload.member.rank ? (
                <AvatarGroup
                  data={payload.member.rank.map((rankItem, index) => {
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
      ) : (
        <></>
      )}
      <div className="d-flex justify-content-end mt-1">
        <Button color="secondary" outline disabled className="me-1">
          Previous
        </Button>
        <Button
          color="primary"
          disabled={!(weight && payload?.member)}
          onClick={(e) => handleNextClick()}
        >
          NEXT
        </Button>
      </div>
    </>
  );
};

export default SelectingMember;
