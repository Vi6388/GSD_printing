// ** React Imports
import { Fragment, useRef, useState, useEffect } from 'react';

// ** Redux Store
import { useSelector, useDispatch } from 'react-redux';
// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';
import CheckboxTreeView from '../../../event/CheckboxComponent/CheckboxTreeView';
// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormFeedback } from 'reactstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';
// ** Actions
import { sportFetchAction } from '../../../settings/tabs/progressiontab/store/actions';
import {
  progressionCategoriesDivisionFetchAction,
  progressionCategoriesRankFetchAction
} from '../../../settings/tabs/progressiontab/store/actions';
import { eventPointTypeFetchAction } from '../../store/actions';

// ** Utils
import { selectThemeColors } from '@utils';
import { eventPointTypeDefaultData } from '../../../../utility/Utils';

const Title = ({ stepper, type, eventForm }) => {
  const dispatch = useDispatch();

  // ** States
  const [eventType, setEventType] = useState('tournament');
  const [eventTitle, setEventTitle] = useState('');
  const [treeOptions, setTreeOptions] = useState([]);
  // const [medalCountType, setMedalCountType] = useState('standard');
  const [pointType, setPointType] = useState({ value: 'None', label: 'None' });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [invalidEventTitle, setInvalidEventTitle] = useState(false);
  const [invalidDivisions, setInvalidDivisions] = useState(false);
  const [pointOption, setPointOption] = useState([]);

  // ** Selectors
  const progressionStore = useSelector((state) => state.progression);
  const eventPointTypeStore = useSelector((state) => state.eventMain.eventPointType);
  // ** Effects

  useEffect(() => {
    dispatch(progressionCategoriesDivisionFetchAction());
    dispatch(progressionCategoriesRankFetchAction());
    dispatch(sportFetchAction());
    dispatch(eventPointTypeFetchAction());
  }, []);

  useEffect(() => {
    if (eventPointTypeStore) {
      setPointOption([
        { value: 'None', label: 'None' },
        ...eventPointTypeStore.data.map((item) => {
          if (item.points.length > 0) return { value: item.name, label: item.name };
        })
      ]);
    } else {
      setPointOption([
        { value: 'None', label: 'None' },
        ...eventPointTypeDefaultData.map((item) => {
          return { value: item.name, label: item.name };
        })
      ]);
    }
  }, [eventPointTypeStore]);

  useEffect(() => {
    let tmp = [],
      tmpCategories = [],
      tmpDivisions = [];
    progressionStore.sportList &&
      progressionStore.sportList.map((sport, index1) => {
        if (sport.categoryId.length > 0) {
          tmpCategories = [];
          sport.categoryId.map((category, index2) => {
            tmpDivisions = [];
            progressionStore.progressionCategoriesDivision.map((division, index3) => {
              if (division.categoryId == category._id) {
                tmpDivisions.push({
                  name: division.divisionName,
                  id: division._id,
                  node: 'division',
                  checkProps: { checked: false }
                });
              }
            });
            if (tmpDivisions.length > 0) {
              tmpCategories.push({
                name: category.categoryName,
                id: category._id,
                checkProps: { checked: false },
                node: 'category',
                children: tmpDivisions
              });
            }
          });
          if (tmpCategories.length > 0)
            tmp.push({
              name: sport.sportName,
              id: sport._id,
              checkProps: { checked: false },
              node: 'sport',
              children: tmpCategories
            });
        }
      });

    setTreeOptions(tmp);
  }, [progressionStore]);
  useEffect(() => {
    if (selectedOptions.length > 0) setInvalidDivisions(false);
  }, [selectedOptions]);

  // ** Handlers
  const handleSubmit = () => {
    if (!eventTitle) {
      setInvalidEventTitle(true);
    }
    if (selectedOptions.length === 0) setInvalidDivisions(true);

    if (!eventTitle || selectedOptions.length === 0) return;
    let data = [];
    selectedOptions.map((option, index) => {
      if (option.node == 'division') {
        data = [...data, option.id];
      } else return;
    });
    eventForm.set('eventName', eventTitle);
    eventForm.set('eventType', eventType);
    eventForm.set('divisions', data);
    eventForm.set('pointType', pointType.value);

    stepper.next();
    // e.preventDefault()
  };

  return (
    <Fragment>
      <Row>
        <Col md="12" className="mb-1">
          <Label className="form-label" for="basicInput">
            Event Title
          </Label>
          <Input
            type="title"
            id="basicInput"
            placeholder="Enter Event Title"
            value={eventTitle}
            onChange={(e) => {
              setEventTitle(e.target.value);
              if (e.target.value) setInvalidEventTitle(false);
            }}
            invalid={invalidEventTitle && true}
          />
          {invalidEventTitle && <FormFeedback>Please Check Event Title</FormFeedback>}
        </Col>
        <Col md={12} className="mb-1">
          <Label className="form-label mb-1" for="eventType">
            Event Type
          </Label>
          <div className="d-flex">
            <div className="form-check me-2">
              <Input
                type="radio"
                id="tournament-active"
                name="eventType"
                value="tournament"
                defaultChecked
                onChange={(e) => setEventType(e.target.value)}
              />
              <Label className="form-check-label" for="tournament-active">
                Tournament
              </Label>
            </div>
            <div className="form-check me-2">
              <Input
                type="radio"
                id="testing-active"
                name="eventType"
                value="testing"
                onChange={(e) => setEventType(e.target.value)}
              />
              <Label className="form-check-label" for="testing-active">
                Testing
              </Label>
            </div>
            <div className="form-check me-2">
              <Input
                type="radio"
                id="guest-active"
                name="eventType"
                value="guest"
                onChange={(e) => setEventType(e.target.value)}
              />
              <Label className="form-check-label" for="guest-active">
                Guest
              </Label>
            </div>
            <div className="form-check me-2">
              <Input
                type="radio"
                id="instructor-active"
                name="eventType"
                value="instructor"
                onChange={(e) => setEventType(e.target.value)}
              />
              <Label className="form-check-label" for="instructor-active">
                Instructor
              </Label>
            </div>
            <div className="form-check me-2">
              <Input
                type="radio"
                id="seminar-active"
                name="eventType"
                value="seminar"
                onChange={(e) => setEventType(e.target.value)}
              />
              <Label className="form-check-label" for="seminar-active">
                Seminar
              </Label>
            </div>
          </div>
        </Col>
        <Col md={12} className="mb-1">
          <Label className="form-label">
            <h5 className="mb-0">Divisions</h5>
          </Label>
          <CheckboxTreeView options={treeOptions} setSelectedOptions={setSelectedOptions} />
          {invalidDivisions && <small className="text-danger my-5">Please Check Divisions</small>}
        </Col>
        <Col md={4} className="mb-1">
          <Label className="form-label mb-1">Point Type</Label>
          <div className="d-flex flex-column ms-1">
            <Select
              isClearable={false}
              menuPortalTarget={document.querySelector('body')}
              placeholder={'Point Type'}
              value={pointType}
              options={pointOption}
              onChange={(e) => setPointType(e)}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
            />
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-between">
        <Button color="secondary" className="btn-prev" outline disabled>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => handleSubmit()}>
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default Title;
