// ** React Imports
import React, { useState } from 'react';

// ** Icons Imports
import { Plus } from 'react-feather';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const ProjectTable = () => {
  const [modal, setModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [groups, setGroups] = useState([]);

  const toggle = () => setModal(!modal);

  const saveGroup = () => {
    if (newGroupName) {
      setGroups([...groups, newGroupName]);
      setNewGroupName('');
      toggle();
    }
  };

  function GroupTable({ name }) {
    const [columns, setColumns] = useState([
      { type: 'Text', title: 'Project' },
      { type: 'Timeline', title: 'Date' },
      { type: 'Select', title: 'Status' }
    ]);
    const [rows, setRows] = useState([{ name: '', date: '', status: '' }]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newColumnType, setNewColumnType] = useState('');

    const addColumn = () => {
      setModalOpen(true);
    };

    const handleColumnSelect = (e) => {
      setNewColumnType(e.target.value);
    };

    const saveColumn = () => {
      setColumns([...columns, { type: newColumnType, title: newColumnType }]);
      setModalOpen(false);
    };

    const addRow = () => {
      const newRow = {};
      columns.forEach((column) => {
        newRow[column.title.toLowerCase()] = '';
      });
      setRows([...rows, newRow]);
    };

    const handleChange = (e, i, j) => {
      const newRows = [...rows];
      newRows[i][columns[j].title.toLowerCase()] = e.target.value;
      setRows(newRows);
    };

    return (
      <div>
        <Row>
          <Col sm="2" className="py-2">
            <h2>{name}</h2>
          </Col>
        </Row>
        <Table bordered responsive>
          <thead>
            <tr>
              {columns.map((column, i) => (
                <th key={i}>{column.title}</th>
              ))}

              <div class="ml-4">
                <Button color="primary" size="sm" onClick={addColumn} className="ml-2">
                  <Plus size={14}></Plus>{' '}
                </Button>
              </div>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {columns.map((column, j) => (
                  <td key={j}>
                    {column.type === 'Text' ? (
                      <Input
                        type="text"
                        value={row[column.title.toLowerCase()]}
                        onChange={(e) => handleChange(e, i, j)}
                      />
                    ) : column.type === 'Timeline' ? (
                      <Input
                        type="date"
                        value={row[column.title.toLowerCase()]}
                        onChange={(e) => handleChange(e, i, j)}
                      />
                    ) : (
                      <Input
                        type="select"
                        className="item-details"
                        id="selectStatus"
                        name="selectStatus"
                        placeholder="Select Status"
                        value={row[column.title.toLowerCase()]}
                        onChange={(e) => handleChange(e, i, j)}
                      >
                        <option value="">Select Status</option>
                        <option value="Working">Working</option>
                        <option value="Stuck">Stuck</option>
                        <option value="Completed">Completed</option>
                        <option value="Zero Progress">Zero Progress</option>
                      </Input>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={addRow}>Add New Project</Button>
        <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
          <ModalHeader>Select Column Type</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input
                  type="select"
                  className="item-details"
                  id="selectStatus"
                  name="selectStatus"
                  placeholder="Select Status"
                  onChange={handleColumnSelect}
                >
                  <option value="">Select a type</option>
                  <option value="Text">Text</option>
                  <option value="Timeline">Timeline</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" size="sm" onClick={saveColumn}>
              Save
            </Button>
            <Button size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <Row>
        <Col sm="12" className="px-1 pb-2">
          <Button color="primary" size="md" className="btn-add-new" onClick={toggle}>
            <Plus size={14} className="me-25"></Plus>{' '}
            <span className="align-middle">New Group</span>
          </Button>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Group</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="groupName">Group Name</Label>
              <Input
                type="text"
                name="groupName"
                id="groupName"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" size="sm" onClick={saveGroup}>
            Save
          </Button>{' '}
          <Button size="sm" color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {groups.map((group, index) => (
        <GroupTable key={index} name={group} />
      ))}
    </div>
  );
};

export default ProjectTable;
