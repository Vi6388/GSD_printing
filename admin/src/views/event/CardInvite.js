import { Link, useParams } from 'react-router-dom';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Button,
  Row,
  Col,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
  Label,
  Input
} from 'reactstrap';
import Select from 'react-select';

// ** Icons Import
import { Facebook, Twitter, Instagram, Link2, Mail, Send, Settings } from 'react-feather';

// ** Images
import illustration from '@src/assets/images/banner/banner-7.jpg';

// ** Utils
import { selectThemeColors } from '@utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const CardInvite = (props) => {
  const { event } = props;

  const awardOption = [
    { value: 'Standard', label: 'Standard' },
    { value: 'Friendly', label: 'Friendly' },
    { value: 'Competitive', label: 'Competitive' }
  ];

  const [awardType, setAwardType] = useState({ value: 'Standard', label: 'Standard' });
  const [modal, setModal] = useState(false);
  const [divisionOption, setDivisionOption] = useState([{ value: 'all', label: 'All' }]);
  const [selectDivision, setSelectDivision] = useState({ value: 'all', label: 'All' });
  const [checkView, setCheckView] = useState(false);
  const [checkSplit, setCheckSplit] = useState(false);
  const [checkParticipation, setCheckParticipation] = useState(false);

  const toggle = () => setModal(!modal);

  const progressionStore = useSelector((state) => state.progression);

  useEffect(() => {
    progressionStore.progressionCategoriesDivision &&
      event &&
      event.divisions &&
      setDivisionOption([
        { value: 'all', label: 'All Division' },
        ...event.divisions.map((item, index) => {
          let divisionData = progressionStore.progressionCategoriesDivision.filter(
            (divisionItem) => divisionItem._id === item.divisionId
          )[0];
          if (divisionData) return { value: item.divisionId, label: divisionData.divisionName };
        })
      ]);
  }, [event, progressionStore]);

  return (
    <>
      <Card>
        <CardHeader>Invitation Details</CardHeader>
        <div className="d-flex flex-column ms-2">
          <div className="pb-1">
            <img src={illustration} height="85" />
          </div>
          <div className="d-flex flex-column">
            <span className="h4 bold fw-bold">Developer Meetup</span>
            <Link to={`/event-preview/${event?._id}`}>
              <span>Preview Invitation</span>
            </Link>
          </div>
        </div>

        <CardBody>
          <div className="mb-1">
            <div className="h4">Send Invitation</div>
            <ButtonGroup className="mb-1">
              <Button outline color="primary">
                <Link2 size={15} />
              </Button>
              <Button outline color="primary">
                <Mail size={15} />
              </Button>
              <Button outline color="primary">
                <Send size={15} />
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <Row>
              <Col md={6}>
                <div className="d-flex flex-row justify-content-between">
                  <div className="h4">Award</div>
                  <Settings size={20} className="ms-2" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Select
                  isClearable={false}
                  menuPortalTarget={document.querySelector('body')}
                  placeholder={'Award Type'}
                  value={awardType}
                  options={awardOption}
                  onChange={(e) => setAwardType(e)}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                />
              </Col>
              <Col md={6}>
                <Button color="primary" onClick={toggle}>
                  View
                </Button>
              </Col>
            </Row>
            {/* <ButtonGroup className="mb-1">
            <Button outline color="primary">
              <Facebook size={15} />
            </Button>
            <Button outline color="primary">
              <Twitter size={15} />
            </Button>
            <Button outline color="primary">
              <Instagram size={15} />
            </Button>
          </ButtonGroup> */}
          </div>
        </CardBody>
      </Card>
      <Modal
        fullscreen="md"
        size="lg"
        centered="true"
        scrollable="false"
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>View Award </ModalHeader>
        <ModalBody style={{ minHeight: '400px' }}>
          <Row>
            <Col md="3">
              <Label for="division-select">Divisions</Label>
              <Select
                menuPortalTarget={document.querySelector('modal')}
                isClearable={false}
                id="division-select"
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                options={divisionOption}
                value={selectDivision}
                onChange={(e) => {
                  setSelectDivision(e);
                }}
              />
            </Col>
            <Col md="3">
              <Label>View</Label>
              <div className="mt-1">
                <Input
                  type="checkbox"
                  id="view-select"
                  value={checkView}
                  onChange={(e) => {
                    setCheckView(e.target.checked);
                  }}
                />
                <Label className="mx-1" for="view-select">
                  View All
                </Label>
              </div>
            </Col>

            <Col md="3">
              <Label>Split</Label>
              <div className="mt-1">
                <Input
                  type="checkbox"
                  id="split-select"
                  value={checkSplit}
                  onChange={(e) => {
                    setCheckSplit(e.target.checked);
                  }}
                />
                <Label className="mx-1" for="split-select">
                  Split Award
                </Label>
              </div>
            </Col>

            <Col md="3">
              <Label> Participation</Label>
              <div className="mt-1">
                <Input
                  type="checkbox"
                  id="participation-select"
                  value={checkParticipation}
                  onChange={(e) => {
                    setCheckParticipation(e.target.checked);
                  }}
                />
                <Label className="mx-1" for="participation-select">
                  Participation Award
                </Label>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => {}} color="primary" outline>
            Confirm
          </Button>
          <Button color="primary" outline onClick={() => {}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CardInvite;
