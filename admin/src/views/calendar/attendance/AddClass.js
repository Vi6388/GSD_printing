// ** React Imports
import { useState } from 'react';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';
import { CheckCircle, X } from 'react-feather';
import Select, { components } from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, Label, Input, Form } from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const AddClass = (props) => {
  // ** Props
  const { openAddClass, setOpenAddClass } = props;

  // ** States
  const [allDay, setAllDay] = useState(false);
  const [startPicker, setStartPicker] = useState(new Date());
  const [daysSelected, setDaysSelected] = useState([]);
  const [calendarLabel, setCalendarLabel] = useState([
    { value: 'Little Tiger', label: 'Little Tiger', color: 'primary' }
  ]);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // ** Select Options
  const options = [
    { value: 'Little Tiger', label: 'Little Tiger', color: 'primary' },
    { value: 'Personal', label: 'Personal', color: 'danger' },
    { value: 'Family', label: 'Family', color: 'warning' },
    { value: 'Holiday', label: 'Holiday', color: 'success' },
    { value: 'ETC', label: 'ETC', color: 'info' }
  ];
  const handleSelectedDays = async (item) => {
    let index = daysSelected.indexOf(item);
    if (index > -1) {
      daysSelected.splice(index, 1);
      setDaysSelected([...daysSelected]);
    } else {
      setDaysSelected([...daysSelected, item]);
    }
  };

  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`bullet bullet-${data.color} bullet-sm me-50`}></span>
        {data.label}
      </components.Option>
    );
  };

  // ** Close BTN
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={() => setOpenAddClass(!openAddClass)} />
  );

  return (
    <Modal
      isOpen={openAddClass}
      // className="sidebar-lg"
      style={{ width: '500px' }}
      toggle={() => setOpenAddClass(!openAddClass)}
      contentClassName="p-0 overflow-hidden"
      modalClassName="modal-slide-in event-sidebar"
    >
      <ModalHeader
        className="mb-1"
        toggle={() => setOpenAddClass(!openAddClass)}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Add Class</h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <Form>
            <div className="mb-1">
              <Label className="form-label" for="label">
                Program Name
              </Label>
              <Select
                id="label"
                value={calendarLabel}
                options={options}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                isClearable={false}
                onChange={(data) => setCalendarLabel([data])}
                components={{
                  Option: OptionComponent
                }}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="title">
                Class Name <span className="text-danger">*</span>
              </Label>
              <Input id="title" placeholder="Class Name" />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="startDate">
                Start Date & Time
              </Label>
              <Flatpickr
                required
                id="startDate"
                name="startDate"
                className="form-control"
                onChange={(date) => setStartPicker(date[0])}
                value={startPicker}
                options={{
                  enableTime: allDay === false,
                  dateFormat: 'Y-m-d H:i'
                }}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="startDate">
                End Date & Time
              </Label>
              <Flatpickr
                required
                id="endDate"
                name="endDate"
                className="form-control"
                onChange={(date) => setStartPicker(date[0])}
                value={startPicker}
                options={{
                  enableTime: allDay === false,
                  dateFormat: 'Y-m-d H:i'
                }}
              />
            </div>
            {/* <div className="mb-1">
                            <Label className="form-label" for="location">
                                Location
                            </Label>
                            <Input
                                id="location"
                                placeholder="Appointment Location"
                            />
                        </div>
                        */}
            <div className="mb-1">
              <Label className="form-label" for="description">
                Repeat Weekly on
              </Label>
              {/* <Input
                                type="textarea"
                                name="text"
                                id="description"
                                rows="3"
                                placeholder="Description"
                            /> */}
              <div className="p-1" style={{ border: '1px solid #82868b', borderRadius: '8px' }}>
                {days.map((item, i) => {
                  return (
                    <Button
                      key={i}
                      outline={daysSelected.includes(item) ? false : true}
                      size="sm"
                      color={daysSelected.includes(item) ? 'primary' : 'secondary'}
                      style={{
                        borderRadius: '40px',
                        marginLeft: '10px',
                        marginBottom: '5px',
                        padding: '5px'
                      }}
                      onClick={() => handleSelectedDays(item, i)}
                    >
                      <CheckCircle /> {item}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="d-flex mb-1">
              <Button className="me-1" type="submit" color="primary">
                Add
              </Button>
              <Button
                color="secondary"
                type="reset"
                onClick={() => setOpenAddClass(!openAddClass)}
                outline
              >
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export default AddClass;
