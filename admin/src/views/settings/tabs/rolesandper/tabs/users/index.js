// ** React Imports
import { useState, useEffect } from 'react';
// ** Redux Store
import { useDispatch, useSelector } from 'react-redux';
// ** User List Component
import DataTable from 'react-data-table-component';

// ** Reactstrap Imports
import {
  Button,
  Col,
  Input,
  Row,
  Form,
  FormGroup,
  Label,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
// ** Icons
import { Save, Edit2 } from 'react-feather';
// ** Styles
import '@styles/react/apps/app-kanban.scss';
// ** Custom Components

import classnames from 'classnames';
import { getUserPermissionAction, savePermissionAction } from '../../store/action';

const UserPermission = () => {
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [permissions, setPermissions] = useState([]);
  // ** Redux Store
  const permissionStore = useSelector((state) => state.permission);

  // ** Effects
  useEffect(() => {
    dispatch(getUserPermissionAction());
  }, []);

  useEffect(() => {
    let tmp = [];
    permissionStore.links.length > 0 &&
      permissionStore.userPermission.data &&
      permissionStore.links.map((item, index) => {
        let isAlreadySet = permissionStore.userPermission.data.find(
          (userItem) => userItem.defaultId == item.id
        );
        if (isAlreadySet) {
          tmp.push(isAlreadySet);
        } else {
          tmp.push({
            elementTitle: item.elementTitle,
            elementParent: item.elementParent,
            navLink: item.navLink,
            read: false,
            write: false,
            update: false,
            delete: false,
            defaultId: item.id,
            userType: 'user'
          });
        }
      });
    setPermissions(tmp);
  }, [permissionStore.links, permissionStore.userPermission]);

  // ** Handlers
  const handleOnChange = (e, row) => {
    let p = permissions;
    p = permissions.map((x) => {
      let i = x;
      if (i.defaultId === row.defaultId) {
        i = { ...i, [e.target.name]: e.target.checked };
        if (e.target.name === 'read' && e.target.checked === false) {
          i = { ...i, read: false, write: false, delete: false, update: false };
        } else if (e.target.name !== 'read' && e.target.checked === true) {
          i = { ...i, read: true };
        }
      }
      return i;
    });
    setPermissions(p);
  };
  const columns = [
    {
      id: 'module',
      name: 'MODULE',
      selector: (row) => row.defaultId,
      width: '20%',
      cell: (row) => (
        <div className="d-flex justify-content-between module w-100">
          <span>{row.elementTitle}</span>
        </div>
      )
    },
    {
      name: 'READ',
      selector: (row) => row.read,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.read}
          name="read"
          disabled={isDisabled}
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'WRITE',
      selector: (row) => row.write,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.write}
          name="write"
          disabled={isDisabled}
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'UPDATE',
      selector: (row) => row.update,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.update}
          name="update"
          disabled={isDisabled}
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'DELETE',
      selector: (row) => row.delete,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.delete}
          name="delete"
          disabled={isDisabled}
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    }
  ];
  const handleEditClick = () => {
    setIsDisabled(!isDisabled);
  };
  const handleSaveClick = () => {
    dispatch(savePermissionAction({ permissions: permissions, userType: 'user' }));
  };

  return (
    <div className="m-1">
      <Col xl={12}>
        <div className="react-dataTable user-view-account-projects">
          <div className="card m-0 rounded-0 p-2">
            <div className="d-flex justify-content-end">
              <Button
                color="primary"
                onClick={(e) => handleEditClick()}
                className="d-flex align-items-center me-1"
              >
                <Edit2 size={18} className="me-50" />
                <span>Edit</span>
              </Button>
              <Button
                color="primary"
                onClick={(e) => handleSaveClick()}
                className="d-flex align-items-center"
                disabled={isDisabled}
              >
                <Save size={18} className="me-50" />
                <span>Save</span>
              </Button>
            </div>
          </div>
          <Row className="m-0">
            <Col sm={12} className="d-flex align-items-center">
              <span style={{ width: '20%' }}>Module</span>
              <Row className="flex-1 m-0 py-50">
                <Col sm={3} className="d-flex justify-content-center">
                  Read
                </Col>
                <Col sm={3} className="d-flex justify-content-center">
                  Write
                </Col>
                <Col sm={3} className="d-flex justify-content-center">
                  Update
                </Col>
                <Col sm={3} className="d-flex justify-content-center">
                  Delete
                </Col>
              </Row>
            </Col>
            <ListGroup flush className="p-0">
              {permissions &&
                permissions.length > 0 &&
                permissions.map((link, index1) => {
                  if (link.elementParent == null) {
                    return (
                      <ListGroupItem key={'parent-link' + index1}>
                        {permissions.find((item) => item.elementParent == link.defaultId) ? (
                          <>
                            <Form className="d-flex">
                              <Label className="parent-link" style={{ width: '20%' }}>
                                {link.elementTitle}
                              </Label>
                              <Row className="m-0 flex-1">
                                <Col sm={3} className="d-flex justify-content-center">
                                  <Input
                                    type="checkbox"
                                    checked={link?.read}
                                    name="read"
                                    disabled={isDisabled}
                                    onChange={(e) => handleOnChange(e, link)}
                                  />
                                </Col>
                                <Col sm={3} className="d-flex justify-content-center">
                                  <Input
                                    type="checkbox"
                                    checked={link?.write}
                                    name="write"
                                    disabled={isDisabled}
                                    onChange={(e) => handleOnChange(e, link)}
                                  />
                                </Col>
                                <Col sm={3} className="d-flex justify-content-center">
                                  <Input
                                    type="checkbox"
                                    checked={link?.update}
                                    name="update"
                                    disabled={isDisabled}
                                    onChange={(e) => handleOnChange(e, link)}
                                  />
                                </Col>
                                <Col sm={3} className="d-flex justify-content-center">
                                  <Input
                                    type="checkbox"
                                    checked={link?.delete}
                                    name="delete"
                                    disabled={isDisabled}
                                    onChange={(e) => handleOnChange(e, link)}
                                  />
                                </Col>
                              </Row>
                            </Form>
                            <ListGroup flush className="mt-50">
                              {permissions.map((link2, index2) => {
                                if (link2.elementParent == link.defaultId) {
                                  return (
                                    <ListGroupItem
                                      key={'childLink' + index2}
                                      className="px-0 border-0"
                                    >
                                      <Form className="d-flex">
                                        <Label
                                          className="ps-1 parent-link"
                                          style={{ width: '20%' }}
                                        >
                                          {link2.elementTitle}
                                        </Label>
                                        <Row className="m-0 flex-1">
                                          <Col sm={3} className="d-flex justify-content-center">
                                            <Input
                                              type="checkbox"
                                              checked={link2?.read}
                                              name="read"
                                              disabled={isDisabled}
                                              onChange={(e) => handleOnChange(e, link2)}
                                            />
                                          </Col>
                                          <Col sm={3} className="d-flex justify-content-center">
                                            <Input
                                              type="checkbox"
                                              checked={link2?.write}
                                              name="write"
                                              disabled={isDisabled}
                                              onChange={(e) => handleOnChange(e, link2)}
                                            />
                                          </Col>
                                          <Col sm={3} className="d-flex justify-content-center">
                                            <Input
                                              type="checkbox"
                                              checked={link2?.update}
                                              name="update"
                                              disabled={isDisabled}
                                              onChange={(e) => handleOnChange(e, link2)}
                                            />
                                          </Col>
                                          <Col sm={3} className="d-flex justify-content-center">
                                            <Input
                                              type="checkbox"
                                              checked={link2?.delete}
                                              name="delete"
                                              disabled={isDisabled}
                                              onChange={(e) => handleOnChange(e, link2)}
                                            />
                                          </Col>
                                        </Row>
                                      </Form>
                                    </ListGroupItem>
                                  );
                                } else return;
                              })}
                            </ListGroup>
                          </>
                        ) : (
                          <Form className="d-flex">
                            <Label className="parent-link" style={{ width: '20%' }}>
                              {link.elementTitle}
                            </Label>
                            <Row className="m-0 flex-1">
                              <Col sm={3} className="d-flex justify-content-center">
                                <Input
                                  type="checkbox"
                                  checked={link?.read}
                                  name="read"
                                  disabled={isDisabled}
                                  onChange={(e) => handleOnChange(e, link)}
                                />
                              </Col>
                              <Col sm={3} className="d-flex justify-content-center">
                                <Input
                                  type="checkbox"
                                  checked={link?.write}
                                  name="write"
                                  disabled={isDisabled}
                                  onChange={(e) => handleOnChange(e, link)}
                                />
                              </Col>
                              <Col sm={3} className="d-flex justify-content-center">
                                <Input
                                  type="checkbox"
                                  checked={link?.update}
                                  name="update"
                                  disabled={isDisabled}
                                  onChange={(e) => handleOnChange(e, link)}
                                />
                              </Col>
                              <Col sm={3} className="d-flex justify-content-center">
                                <Input
                                  type="checkbox"
                                  checked={link?.delete}
                                  name="delete"
                                  disabled={isDisabled}
                                  onChange={(e) => handleOnChange(e, link)}
                                />
                              </Col>
                            </Row>
                          </Form>
                        )}
                      </ListGroupItem>
                    );
                  } else {
                  }
                })}
            </ListGroup>
          </Row>
        </div>
      </Col>
    </div>
  );
};

export default UserPermission;
