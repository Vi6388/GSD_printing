// ** React Imports
import { useState, Fragment } from 'react';

// ** Third Party Components
import classnames from 'classnames';
import Flatpickr from 'react-flatpickr';
import { Editor } from 'react-draft-wysiwyg';
import Select, { components } from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { EditorState, ContentState } from 'draft-js';
import { X, Star, Trash, ChevronLeft, ChevronRight } from 'react-feather';

// ** Reactstrap Imports
import {
  Modal,
  ModalBody,
  Button,
  ButtonGroup,
  Form,
  Input,
  Label,
  FormFeedback,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap';

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils';

// ** Assignee Avatars
import img1 from '@src/assets/images/portrait/small/avatar-s-3.jpg';
import img2 from '@src/assets/images/portrait/small/avatar-s-1.jpg';
import img3 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import img4 from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import img5 from '@src/assets/images/portrait/small/avatar-s-2.jpg';
import img6 from '@src/assets/images/portrait/small/avatar-s-11.jpg';

// ** Styles Imports
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/react-select/_react-select.scss';

// ** Function to capitalize the first letter of string
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

import { getSelectedWorkspaceData } from '../../apps/workspace/store';

// ** Modal Header
const ModalHeader = (props) => {
  // ** Props
  const {
    children,
    store,
    handleTaskSidebar,
    setDeleted,
    deleted,
    important,
    setImportant,
    deleteTask,
    dispatch
  } = props;

  // ** Function to delete task
  const handleDeleteTask = () => {
    setDeleted(!deleted);
    dispatch(deleteTask(store.selectedTask.id));
    handleTaskSidebar();
  };

  return (
    <div className="modal-header d-flex align-items-center justify-content-between mb-1">
      <h5 className="modal-title">{children}</h5>
      <div className="task-item-action d-flex align-items-center">
        {store && !isObjEmpty(store.selectedTask) ? (
          <Trash className="cursor-pointer mt-25" size={16} onClick={() => handleDeleteTask()} />
        ) : null}
        <span className="task-item-favorite cursor-pointer mx-75">
          <Star
            size={16}
            onClick={() => setImportant(!important)}
            className={classnames({
              'text-warning': important === true
            })}
          />
        </span>
        <X className="fw-normal mt-25" size={16} onClick={handleTaskSidebar} />
      </div>
    </div>
  );
};

const TaskListSidebar = (props) => {
  // ** Props
  const { open, handleTaskSidebar, store, dispatch, updateTask, selectTask, addTask, deleteTask } =
    props;

  // ** States
  const [assignee, setAssignee] = useState({
    value: 'pheobe',
    label: 'Pheobe Buffay',
    img: img1
  });
  const [labels, setTags] = useState([]);
  const [desc, setDesc] = useState('');
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState('1');
  const [rSelected, setRSelected] = useState(null);

  const toggleCalendar = (id) => {
    openCalendar === id ? setOpenCalendar() : setOpenCalendar(id);
  };

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { title: '' }
  });

  // ** Assignee Select Options
  const assigneeOptions = [
    { value: 'pheobe', label: 'Pheobe Buffay', img: img1 },
    { value: 'chandler', label: 'Chandler Bing', img: img2 },
    { value: 'ross', label: 'Ross Geller', img: img3 },
    { value: 'monica', label: 'Monica Geller', img: img4 },
    { value: 'joey', label: 'Joey Tribbiani', img: img5 },
    { value: 'Rachel', label: 'Rachel Green', img: img6 }
  ];

  // ** Tag Select Options
  const tagOptions = [
    { value: 'team', label: 'Team' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'update', label: 'Update' }
  ];

  // ** Custom Assignee Component
  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <img
            className="d-block rounded-circle me-50"
            src={data.img}
            height="26"
            width="26"
            alt={data.label}
          />
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  // ** Returns sidebar title
  const handleSidebarTitle = () => {
    if (store && store.selectedTask && !isObjEmpty(store.selectedTask)) {
      return (
        <Button
          outline
          size="sm"
          onClick={() => setCompleted(!completed)}
          color={completed === true ? 'success' : 'secondary'}
        >
          {completed === true ? 'Completed' : 'Mark Complete'}
        </Button>
      );
    } else {
      return 'Add Goal';
    }
  };

  // ** Function to run when sidebar opens
  const handleSidebarOpened = () => {
    const { selectedTask } = store;
    console.log(selectedTask);
    if (!isObjEmpty(selectedTask)) {
      setValue('title', selectedTask.title);
      setCompleted(selectedTask.isCompleted);
      setImportant(selectedTask.isImportant);
      if (selectedTask.assignedTo.length) {
        const arr = [];
        selectedTask.assignedTo.map((assignee) => {
          arr.push({ value: assignee.title, label: assignee.title, img: assignee.img });
        });
        setAssignee(arr);
      }
      setDueDate(selectedTask.dueDate);
      setDesc(selectedTask.description);
      // if (selectedTask.description !== null && typeof selectedTask.description === 'string') {
      //   setDesc(
      //     EditorState.createWithContent(ContentState.createFromText(selectedTask.description))
      //   );
      // } else {
      //   setDesc('');
      // }
      //  else {
      //   const obj = selectedTask.description._immutable.currentContent.blockMap;
      //   const property = Object.keys(obj).map((val) => val);

      //   setDesc(EditorState.createWithContent(ContentState.createFromText(obj[property].text)));
      // }

      if (selectedTask.labels.length) {
        const labels = [];
        selectedTask.labels.map((label) => {
          labels.push({ value: label, label: capitalize(label) });
        });
        setTags(labels);
      }
    }
  };

  // ** Function to run when sidebar closes
  const handleSidebarClosed = () => {
    setTags([]);
    setDesc('');
    setValue('title', '');
    setAssignee({ value: 'pheobe', label: 'Pheobe Buffay', img: img1 });
    setCompleted(false);
    setImportant(false);
    setDueDate(new Date());
    dispatch(selectTask({}));
  };

  // ** Function to reset fileds
  const handleResetFields = () => {
    const descValue = EditorState.createWithContent(
      ContentState.createFromText(store.selectedTask.description)
    );

    setValue('title', store.selectedTask.title);
    setDesc(descValue);
    setCompleted(store.selectedTask.isCompleted);
    setImportant(store.selectedTask.isImportant);
    setDeleted(store.selectedTask.isDeleted);
    setDueDate(store.selectedTask.dueDate);
    // if (store.selectedTask.assignee.fullName !== assignee.label) {
    //   setAssignee({
    //     value: store.selectedTask.assignee.fullName,
    //     label: store.selectedTask.assignee.fullName,
    //     img: store.selectedTask.assignee.avatar
    //   });
    // }
    if (store.selectedTask.labels.length) {
      const labels = [];
      store.selectedTask.labels.map((label) => {
        labels.push({ value: label, label: capitalize(label) });
      });
      setTags(labels);
    }
  };

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (store && !isObjEmpty(store.selectedTask)) {
      return (
        <Fragment>
          <Button color="primary" className="update-btn update-task-item me-1">
            Update
          </Button>
          <Button color="secondary" onClick={handleResetFields} outline>
            Reset
          </Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button color="primary" className="add-task-item me-1">
            Add
          </Button>
          <Button color="secondary" onClick={handleTaskSidebar} outline>
            Cancel
          </Button>
        </Fragment>
      );
    }
  };

  const onSubmit = (data) => {
    const newTaskTag = [];
    const { selectedTask } = store;
    console.log(store.selectedTask);
    console.log('labels', labels);
    console.log('data', data);
    console.log('assignee', assignee);

    if (data.title.length) {
      const labelsArr = [];
      const assignedArr = [];

      if (assignee !== null) {
        assignee.map((item) => {
          assignedArr.push({ title: item.label, img: item.img });
        });
      }

      if (labels !== []) {
        labels.map((label) => {
          labelsArr.push(label.label);
        });
      }
      const postData = new FormData();
      postData.append('selectedTask', JSON.stringify(selectedTask));
      postData.append('data', JSON.stringify(data));
      postData.append('dueDate', dueDate);
      postData.append('labels', labelsArr);
      postData.append('description', desc);
      postData.append('assignedTo', JSON.stringify(assignedArr));
      // postData.append('file', files[0]);

      // if (files.length && typeof files[0] !== 'string' && files[0].path !== undefined) {
      if (selectedTask.coverImage) postData.append('coverImage', selectedTask.coverImage);
      // }
      dispatch(updateTask(postData)).then(() => {
        dispatch(getSelectedWorkspaceData(store.selectedWorkspace._id));
      });
      handleTaskSidebar();
    } else {
      setError('title');
    }
    // if (labels.length) {
    //   labels.map((label) => newTaskTag.push(label.value));
    // }

    // const newAssignee = {
    //   fullName: assignee.label,
    //   avatar: assignee.img
    // };
    // const state = {
    //   dueDate,
    //   title: data.title,
    //   labels: newTaskTag,
    //   description: desc,
    //   isCompleted: completed,
    //   isDeleted: deleted,
    //   isImportant: important,
    //   assignee:
    //     doesInclude || assignee.label === undefined ? store.selectedTask.assignee : newAssignee
    // };

    // if (data.title.length) {
    //   if (isObjEmpty(errors)) {
    //     if (
    //       isObjEmpty(store.selectedTask) ||
    //       (!isObjEmpty(store.selectedTask) && !store.selectedTask.title.length)
    //     ) {
    //       dispatch(addTask(state));
    //     } else {
    //       dispatch(updateTask({ ...state, id: store.selectedTask.id }));
    //     }
    //     handleTaskSidebar();
    //   }
    // } else {
    //   setError('title', {
    //     type: 'manual'
    //   });
    // }
  };
  return (
    <Modal
      isOpen={open}
      toggle={handleTaskSidebar}
      className="sidebar-lg"
      contentClassName="p-0"
      onOpened={handleSidebarOpened}
      onClosed={handleSidebarClosed}
      modalClassName="modal-slide-in sidebar-task-modal"
    >
      <Form id="form-modal-task" className="task-modal" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader
          store={store}
          deleted={deleted}
          dispatch={dispatch}
          important={important}
          deleteTask={deleteTask}
          setDeleted={setDeleted}
          setImportant={setImportant}
          handleTaskSidebar={handleTaskSidebar}
        >
          {handleSidebarTitle()}
        </ModalHeader>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <div className="mb-1">
            <Accordion open={openCalendar} toggle={toggleCalendar} className="accordion-margin">
              <AccordionItem>
                <AccordionHeader targetId="1">Calnedar</AccordionHeader>
                <AccordionBody accordionId="1">
                  <div className="d-flex justify-content-between mb-1">
                    <div className="d-flex align-items-center">
                      <ChevronLeft size={20} />
                      <span className="ms-1">Jan</span>
                      <span className="ms-1 me-1">2022</span>
                      <ChevronRight size={20} />
                    </div>
                    <div>
                      <span className="me-1">Sat</span>
                      <span>14</span>
                    </div>
                  </div>
                  <hr />
                  <div className="container mb-3">
                    <div className="row mb-1">
                      <div className="col fw-bold" color="primary">
                        Su
                      </div>
                      <div className="col fw-bold" color="primary">
                        Mo
                      </div>
                      <div className="col fw-bold" color="primary">
                        Tu
                      </div>
                      <div className="col fw-bold" color="primary">
                        We
                      </div>
                      <div className="col fw-bold" color="primary">
                        Th
                      </div>
                      <div className="col fw-bold" color="primary">
                        Fr
                      </div>
                      <div className="col fw-bold" color="primary">
                        Sa
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col">
                        <span className="date-done">01</span>
                      </div>
                      <div className="col">
                        <span className="date-miss">02</span>
                      </div>
                      <div className="col">
                        <span className="date-done">03</span>
                      </div>
                      <div className="col">
                        <span className="date-done">04</span>
                      </div>
                      <div className="col">
                        <span className="date-done">05</span>
                      </div>
                      <div className="col">
                        <span className="date-done">06</span>
                      </div>
                      <div className="col">
                        <span className="date-done">07</span>
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col">
                        <span className="date-done">01</span>
                      </div>
                      <div className="col">
                        <span className="date-miss">02</span>
                      </div>
                      <div className="col">
                        <span className="date-done">03</span>
                      </div>
                      <div className="col">
                        <span className="date-done">04</span>
                      </div>
                      <div className="col">
                        <span className="date-done">05</span>
                      </div>
                      <div className="col">
                        <span className="date-done">06</span>
                      </div>
                      <div className="col">
                        <span className="date-done">07</span>
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col">
                        <span className="date-done">01</span>
                      </div>
                      <div className="col">
                        <span className="date-miss">02</span>
                      </div>
                      <div className="col">
                        <span className="date-done">03</span>
                      </div>
                      <div className="col">
                        <span className="date-done">04</span>
                      </div>
                      <div className="col">
                        <span className="date-done">05</span>
                      </div>
                      <div className="col">
                        <span className="date-done">06</span>
                      </div>
                      <div className="col">
                        <span className="date-done">07</span>
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col">
                        <span className="date-done">01</span>
                      </div>
                      <div className="col">
                        <span className="date-miss">02</span>
                      </div>
                      <div className="col">
                        <span className="date-done">03</span>
                      </div>
                      <div className="col">
                        <span className="date-done">04</span>
                      </div>
                      <div className="col">
                        <span className="date-done">05</span>
                      </div>
                      <div className="col">
                        <span className="date-done">06</span>
                      </div>
                      <div className="col">
                        <span className="date-done">07</span>
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col">
                        <span className="date-done">01</span>
                      </div>
                      <div className="col">
                        <span className="date-miss">02</span>
                      </div>
                      <div className="col">
                        <span className="date-done">03</span>
                      </div>
                      <div className="col">
                        <span className="date-done">04</span>
                      </div>
                      <div className="col">
                        <span className="date-done">05</span>
                      </div>
                      <div className="col">
                        <span className="date-done">06</span>
                      </div>
                      <div className="col">
                        <span className="date-done">07</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Todays work done?</span>
                    <Button
                      outline
                      size="sm"
                      onClick={() => setCompleted(!completed)}
                      color={completed === true ? 'success' : 'secondary'}
                    >
                      {completed === true ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="2">Edit Goal</AccordionHeader>
                <AccordionBody accordionId="2">
                  <div className="mb-1">
                    <Label className="form-label" for="task-title">
                      Title <span className="text-danger">*</span>
                    </Label>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="task-title"
                          placeholder="Title"
                          className="new-task-item-title"
                          invalid={errors.title && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.title && <FormFeedback>Please enter a valid task title</FormFeedback>}
                  </div>
                  <div className="mb-1">
                    <Label className="form-label" for="task-assignee">
                      Assignee
                    </Label>
                    <Select
                      id="task-assignee"
                      className="react-select"
                      classNamePrefix="select"
                      isClearable={false}
                      options={assigneeOptions}
                      theme={selectThemeColors}
                      isMulti={true}
                      value={assignee}
                      onChange={(data) => setAssignee(data)}
                      components={{
                        Option: AssigneeComponent
                      }}
                    />
                  </div>
                  <div className="mb-1">
                    <Label className="form-label" for="due-date">
                      Due Date
                    </Label>
                    <Flatpickr
                      id="due-date"
                      name="due-date"
                      className="form-control"
                      onChange={(date) => setDueDate(date[0])}
                      value={dueDate}
                      options={{ dateFormat: 'Y-m-d' }}
                    />
                  </div>
                  <div className="mb-1">
                    <Label className="form-label" for="task-tags">
                      Tags
                    </Label>
                    <Select
                      isMulti
                      id="task-tags"
                      className="react-select"
                      classNamePrefix="select"
                      isClearable={false}
                      options={tagOptions}
                      theme={selectThemeColors}
                      value={labels}
                      onChange={(data) => {
                        setTags(data !== null ? [...data] : []);
                      }}
                    />
                  </div>
                  <div className="mb-1">
                    <Label for="task-desc" className="form-label">
                      Description
                    </Label>
                    <Input
                      type="textarea"
                      value={desc}
                      name="text"
                      id="task-description"
                      rows="3"
                      placeholder="Description..."
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                  <div>{renderFooterButtons()}</div>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
};

export default TaskListSidebar;
