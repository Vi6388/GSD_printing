// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';

// ** Todo App Components
import Tasks from './Tasks';
import TaskSidebar from './TaskSidebar';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTasksApi,
  addTask,
  updateTask,
  handleSelectTask,
  reorderTasks,
  deleteTask
} from '../../apps/kanban/store';
import { fetchWorkspaceApi } from '../../apps/workspace/store';

// ** Styles
import '@src/assets/styles/task-list.scss';
import { Row, Col, Collapse } from 'reactstrap';

const TODO = () => {
  // ** States
  const [collapse, setCollapse] = useState(false);
  const [mainSidebar, setMainSidebar] = useState(false);
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return {
      ...state.kanban,
      ...state.workspace
    };
  });

  // ** Function to handle Left sidebar & Task sidebar
  const handleMainSidebar = () => setMainSidebar(!mainSidebar);
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);
  const handleWorkspaceCollapse = () => setCollapse(!collapse);

  // ** Get Tasks on mount & based on dependency change
  useEffect(() => {
    dispatch(fetchTasksApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWorkspaceApi());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="content-body">
        <Tasks
          collapse={collapse}
          store={store}
          tasks={store.tasks}
          dispatch={dispatch}
          updateTask={updateTask}
          selectedWorkspace={store.selectedWorkspace}
          selectTask={handleSelectTask}
          reOrderTasks={reorderTasks}
          handleMainSidebar={handleMainSidebar}
          handleTaskSidebar={handleTaskSidebar}
          handleWorkspaceCollapse={handleWorkspaceCollapse}
        />

        <TaskSidebar
          store={store}
          addTask={addTask}
          dispatch={dispatch}
          open={openTaskSidebar}
          updateTask={updateTask}
          selectTask={handleSelectTask}
          deleteTask={deleteTask}
          handleTaskSidebar={handleTaskSidebar}
        />
      </div>
    </Fragment>
  );
};

export default TODO;
