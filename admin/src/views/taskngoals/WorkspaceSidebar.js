// ** React Imports
import { useState, Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { Plus, ChevronLeft, ChevronRight } from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
import { isEmptyObject } from 'jquery';
// import { Briefcase, UserCheck } from 'react-feather';

// ** Components
// import ImpactArea from './ImpactArea';
// import Filters from './Filters';
// import Tags from './Tags';

// ** Reactstrap Imports
import {
  Button,
  FormFeedback,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
  // Accordion,
  // AccordionBody,
  // AccordionHeader,
  // AccordionItem
} from 'reactstrap';

import { getSelectedWorkspaceData, handleSelectWorkspace } from '../apps/workspace/store';
import { sortedUniq } from 'pdf-lib';

const defaultValues = {
  workspaceTitle: ''
};

const WorkspaceSidebar = (props) => {
  // ** Props
  const { store, dispatch, collapse, params, addWorkspace, handleWorkspaceCollapse } = props;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });
  const [showAddworkspace, setShowAddWorkspace] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState(false);
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [newWSTitle, setNewWSTitle] = useState('');

  const userData = JSON.parse(localStorage.getItem('userData'));
  const WorkspaceSidebarName = `${userData.fullName}\nWorkspaces`;
  // ** States
  // const [openAccordion, setOpenAccordion] = useState('1');

  // const toggleAccordion = (id) => {
  //   openAccordion === id ? setOpenAccordion() : setOpenAccordion(id);
  // };

  // ** Functions To Handle List Item Filter
  const handleFilter = (filter) => {
    // dispatch(getTasks({ ...params, filter }));
  };

  // const handleTag = (tag) => {
  //   dispatch(getTasks({ ...params, tag }));
  // };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if ((params.filter && params.filter === value) || (params.tag && params.tag === value)) {
      return true;
    } else {
      return false;
    }
  };

  // const renderGoalsType = () => {
  //   return (
  //     <Fragment>
  //       <ListGroup tag="div" className="list-group-filters mb-1">
  //         <ListGroupItem
  //           action
  //           tag={Link}
  //           to={'/goals'}
  //           active={params.filter === '' && params.tag === ''}
  //           onClick={() => handleFilter('')}
  //         >
  //           <UserCheck className="me-75" size={18} />
  //           <span className="align-middle">Personal</span>
  //         </ListGroupItem>
  //         <ListGroupItem
  //           tag={Link}
  //           to={'/goals'}
  //           active={handleActiveItem('important')}
  //           onClick={() => handleFilter('important')}
  //           action
  //         >
  //           <Briefcase className="me-75" size={18} />
  //           <span className="align-middle">Business</span>
  //         </ListGroupItem>
  //       </ListGroup>
  //     </Fragment>
  //   );
  // };

  const handleOpenAddWorkspace = () => {
    setNewWorkspace(true);
  };

  const handleAddWorkspaceFormSubmit = (data) => {
    const param = { title: newWSTitle };
    dispatch(addWorkspace(param));
    setNewWorkspace(false);
  };

  const handleWorkspaceClick = (workspace, event) => {
    dispatch(getSelectedWorkspaceData(workspace._id));
    dispatch(handleSelectWorkspace(workspace));
  };

  const handleNewWorkspaceTitle = (e) => {
    setNewWSTitle(e.target.value);
    setCreateNewValidation(store.workspace.filter((x) => x.title === e.target.value).length === 0);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content task-sidebar">
        <div className="task-app-menu">
          <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
            <div className="p-1 d-flex justify-content-between align-items-center">
              <div style={{ fontSize: '20px', fontWeight: 800 }}>{WorkspaceSidebarName}</div>
              <Button className="btn-icon" color="flat-dark" onClick={handleWorkspaceCollapse}>
                {collapse ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </Button>
            </div>
            {store.workspace.map((workspace, index) => {
              return (
                <ListGroupItem
                  key={index}
                  active={store.selectedWorkspace.title === workspace.title ? true : false}
                  onClick={() => handleWorkspaceClick(workspace)}
                  action
                >
                  {workspace.title}
                </ListGroupItem>
              );
            })}
            <Button className="mt-1" color="primary" block outline onClick={handleOpenAddWorkspace}>
              <Plus size={14} className="me-25" />
              Create New Workspace
            </Button>
          </ListGroup>
        </div>
        <Modal
          isOpen={newWorkspace}
          toggle={() => setNewWorkspace(!newWorkspace)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setNewWorkspace(!newWorkspace)}>
            Create A New Workspace
          </ModalHeader>
          <ModalBody>
            <div>
              <Label className="form-label" for="validState">
                Workspace title
              </Label>
              <Input
                type="text"
                id="newWorkspaceTitle"
                name="newWorkspaceTitle"
                placeholder="My Workspace"
                onChange={handleNewWorkspaceTitle}
                valid={createNewValidation}
                invalid={!createNewValidation}
              />
              <FormFeedback valid={createNewValidation}>
                {createNewValidation
                  ? 'Sweet! That name is available.'
                  : 'Oh no! That name is already taken.'}
              </FormFeedback>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={handleAddWorkspaceFormSubmit}
              disabled={!createNewValidation || !newWSTitle}
            >
              Create
            </Button>
            <Button color="secondary" onClick={() => setNewWorkspace(!newWorkspace)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
