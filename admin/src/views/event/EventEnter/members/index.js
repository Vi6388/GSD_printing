// ** React Imports
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Third Party Components
import DataTable from 'react-data-table-component';
import { ChevronDown, MoreVertical, Plus, Filter, Trash } from 'react-feather';

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  Button,
  Badge,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// ** Store & Actions
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { memberFetchAction } from '../../../members/stores/action';
import { formatDate } from '@utils';
import { calculateAge, calculateHeight, calculateWeight } from '../../../../utility/Utils';

const Members = () => {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);

  const [entryModal, setEntryModal] = useState(false);
  const [divisions, setDivisions] = useState([]);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [filterModal, setFilterModal] = useState(false);
  const toggleFilterModal = () => {
    setFilterModal(!filterModal);
  };

  const memberStore = useSelector((state) => state.memberContact?.members);
  const progressionStore = useSelector((state) => state.progression);

  const columns = [
    {
      name: 'Name',
      sortable: true,
      selector: (row) => (row.lastName ? row.firstName : row.firstName + row.lastName)
    },
    {
      name: 'Phone',
      sortable: true,
      selector: (row) => row.phoneNumber
    },
    {
      name: 'DOB',
      sortable: true,
      selector: (row) => formatDate(row.dateOfBirth)
    },
    {
      name: 'Gender',
      sortable: true,
      selector: (row) => row.gender
    },
    {
      name: 'Eligibility',
      sortable: true,
      selector: (row) => row.isEligible,
      cell: (row) => (
        <div className="font-small-4">
          {row.isEligible ? (
            <Badge color="primary">Eligible</Badge>
          ) : (
            <Badge color="warning">Ineligible</Badge>
          )}
        </div>
      )
    },
    {
      name: 'Action',
      allowOverflow: true,
      cell: () => {
        return (
          <Button
            color="primary"
            className="d-flex align-items-center btn-sm"
            onClick={(e) => toggleEntryModal()}
          >
            <Plus size={18} className="me-50" />
            <span>Enter</span>
          </Button>
        );
      }
    }
  ];
  const CustomHeader = ({}) => {
    return (
      <div className="text-nowrap w-100 my-75 d-flex align-items-center">
        <Button
          color="primary"
          className="d-flex align-items-center me-1"
          onClick={(e) => {
            handleFilterClick();
          }}
        >
          <Filter size={18} className="cursor-pointer" />
        </Button>
        <Button
          color="primary"
          className="d-flex align-items-center"
          onClick={() => {
            handleRemoveClick();
          }}
        >
          <Trash size={18} className="me-50" />
          <span>Remove All</span>
        </Button>
      </div>
    );
  };
  useEffect(() => {
    dispatch(memberFetchAction());
  }, []);
  useEffect(() => {
    let tmp = [];
    memberStore &&
      memberStore.data.map((member, index) => {
        let isEligible = false,
          age = calculateAge(member?.dateOfBirth);
        progressionStore.progressionCategoriesDivision.map((division, index2) => {
          if (
            age > division.ageFrom &&
            age < division.ageTo &&
            member.gender == division.gender &&
            calculateWeight(member.weight) > calculateWeight(division.weightFrom) &&
            calculateWeight(member.weight) < calculateWeight(division.weightTo) &&
            calculateHeight(member.height) > calculateHeight(division.heightFrom) &&
            calculateHeight(member.height) < calculateHeight(division.heightTo)
          ) {
            isEligible = true;
          } else {
            isEligible = false;
          }
        });
        isEligible == true
          ? (member = { ...member, isEligible: true })
          : (member = { ...member, isEligible: false });
        tmp.push(member);
      });
    setMembers(tmp);
  }, [memberStore, progressionStore?.progressionCategoriesDivision]);
  // ** Handlers
  const toggleEntryModal = () => {
    setEntryModal(!entryModal);
  };
  const handleRemoveClick = (e) => {};
  const handleFilterClick = () => {
    toggleEntryModal();
  };
  return (
    <>
      <div className="invoice-list-wrapper">
        <Card>
          <CardHeader className="py-1 d-flex">
            <CardTitle tag="h4">Enter Existing Member</CardTitle>
            <Button onClick={toggle}>Member Profile</Button>
          </CardHeader>
        </Card>
      </div>
      <div className="">
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            subHeader
            responsive
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            data={members}
          />
        </div>
      </div>

      {/* < 
        filterModal={filterModal}
        setFilterModal={setFilterModal}
        toggleFilterModal={toggleFilterModal}
      /> */}
    </>
  );
};

export default Members;
