// ** React Imports
import { useState, useMemo } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  ButtonGroup,
  InputGroup,
  InputGroupText
} from 'reactstrap';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';

import useMessage from '../../../../lib/useMessage';

// ** Icons Imports
import { CheckCircle, Calendar, Star } from 'react-feather';

// ** actions
import { addTaskAction } from '../store/action';

import { useDispatch, useSelector } from 'react-redux';

// reducer
import { addTaskReset } from '../store/reducer';

const AddTaskSidebar = (props) => {
  const { open, toggleSidebar, selectedTask } = props;

  // ** State
  const [picker, setPicker] = useState(new Date());
  const [cSelected, setCSelected] = useState([]);
  const { error, success } = useMessage();
  const dispatch = useDispatch();

  const onCheckboxBtnClick = (selected) => {
    let selectedDays = [...cSelected];
    const index = selectedDays.indexOf(selected);

    if (index < 0) {
      selectedDays.push(selected);
    } else {
      selectedDays.splice(index, 1);
    }
    setCSelected([...selectedDays]);
  };

  const initialTask = {
    _id: '',
    taskName: '',
    startDate: '',
    points: 0,
    repeat: [],
    allowAsNa: false,
    isActive: false
  };

  const [task, setTask] = useState(initialTask);
  function changeHandler(event) {
    const { name, value } = event.target;
    setTask((p) => ({ ...p, [name]: value }));
  }

  // Add redux state
  const { addTask } = useSelector((state) => state.tasks);

  const { loading, success: addSuccess, error: addError } = addTask;

  useMemo(() => {
    if (addSuccess) {
      // if add success
      success('New Task Added');

      // Reset Value
      setCSelected([]);
      setTask(initialTask);

      dispatch(addTaskReset());
      // Close Sidebar
      toggleSidebar();
    }
  }, [addSuccess]);

  function addTaskHandler() {
    const { taskName, startDate, points, repeat } = task;
    // validation
    if (taskName === '') {
      error('Task name must not empty !');
      return;
    }
    // submit / Dispatch with date and repeat array
    dispatch(
      addTaskAction({
        ...task,
        repeat: cSelected,
        startDate: picker
      })
    );
  }

  useMemo(() => {
    if (selectedTask) {
      if (selectedTask?._id !== task?._id) {
        setTask(selectedTask);
        setCSelected(selectedTask?.repeat);
        setPicker(selectedTask?.startDate);
      }
    }
  }, [selectedTask]);

  // console.log(selectedTask)

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Add New Task"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => {
        toggleSidebar();
        //reset state
        setTask(initialTask);
      }}
      // onClosed={handleSidebarClosed}
    >
      <Form>
        <Row>
          <Col sm="12">
            <Label className="form-label" for="nameVerticalIcons">
              Task Name
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText>
                <CheckCircle size={15} />
              </InputGroupText>
              <Input
                type="text"
                name="taskName"
                onChange={changeHandler}
                id="nameVerticalIcons"
                placeholder="Task Name"
                value={task?.taskName}
              />
            </InputGroup>
          </Col>
          <Col sm="12">
            <Label className="form-label" for="date-time">
              Starting Date & Time
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText className="border-end-0">
                <Calendar size={15} />
              </InputGroupText>
              <Flatpickr
                value={picker}
                data-enable-time
                id="date-time-picker"
                className="form-control"
                onChange={(date) => setPicker(date)}
              />
            </InputGroup>
          </Col>
          <Col sm="12">
            <Label className="form-label" for="points">
              Points
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText>
                <Star size={15} />
              </InputGroupText>
              <Input
                onFocus={(e) => e.target.select()}
                type="number"
                name="points"
                onChange={changeHandler}
                id="point"
                placeholder="Employee get points for completion"
                value={task?.points}
              />
            </InputGroup>
          </Col>
          <Col sm="12">
            <Label className="form-label" for="repeat">
              Repeat
            </Label>
            <div>
              <ButtonGroup className="mb-3">
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('sunday')}
                  active={cSelected.includes('sunday')}
                  outline
                >
                  S
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('monday')}
                  active={cSelected.includes('monday')}
                  outline
                >
                  M
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('tuesday')}
                  active={cSelected.includes('tuesday')}
                  outline
                >
                  T
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('wednesday')}
                  active={cSelected.includes('wednesday')}
                  outline
                >
                  w
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('thursday')}
                  active={cSelected.includes('thursday')}
                  outline
                >
                  T
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('friday')}
                  active={cSelected.includes('friday')}
                  outline
                >
                  F
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('saturday')}
                  active={cSelected.includes('saturday')}
                  outline
                >
                  S
                </Button>
              </ButtonGroup>
            </div>
          </Col>
          <Col sm="12" className="mb-2">
            <div className="form-check">
              <Input
                type="checkbox"
                id="remember-me-vertical-icons"
                defaultChecked={task?.allowAsNa || false}
                onClick={(e) => {
                  setTask((p) => ({
                    ...p,
                    allowAsNa: !p.allowAsNa
                  }));
                }}
              />
              <Label className="form-check-label" for="remember-me-vertical-icons">
                Allow user to mark as N/A
              </Label>
            </div>
          </Col>
          <Col sm="12" className="mb-3">
            <div className="form-check form-switch">
              <Input
                type="switch"
                name="customSwitch"
                id="exampleCustomSwitch"
                defaultChecked={task?.isActive || false}
                onClick={(e) => {
                  setTask((p) => ({
                    ...p,
                    isActive: !p.isActive
                  }));
                }}
              />
              <Label for="exampleCustomSwitch" className="form-check-label">
                Toggle this switch to Activate this Task
              </Label>
            </div>
          </Col>
          <Col sm="12">
            <div className="d-flex">
              <Button
                className="me-1"
                color="primary"
                type="button"
                onClick={addTaskHandler}
                disabled={loading}
              >
                {loading ? 'loading...' : ' Submit'}
              </Button>
              <Button
                outline
                color="secondary"
                type="reset"
                // onClick={toggleSidebar}
              >
                Reset
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  );
};

export default AddTaskSidebar;
