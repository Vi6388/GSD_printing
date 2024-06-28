import { Fragment, useMemo, useState } from 'react';

import Avatar from '@components/avatar';

import { Button, ButtonGroup, Input } from 'reactstrap';

// import { Share2, MessageSquare, PhoneCall } from 'react-feather'

import { uploadTodoAnsFile } from './store/action';
import { todoFileUploadingInit, todoFileUploadingReset } from './store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../../../lib/useMessage';
import moment from 'moment';

const useTodoList = ({ selectedWorkingCheckList, setSelectedWorkingCheckList, taskTab }) => {
  const [todoList, setTodoList] = useState([]);

  useMemo(() => {
    if (taskTab !== '') {
      setTodoList([]);
    }
  }, [taskTab]);

  function setTodoValue(todo, value) {
    var AnsCheckList = [...selectedWorkingCheckList?.schedule[0]?.checkList];
    var fineExistingTodoIndex = Array.from(AnsCheckList).findIndex(
      (x) => String(x.checkListId) === String(todo?._id)
    );

    if (fineExistingTodoIndex > -1) {
      // AnsCheckList[fineExistingTodoIndex].ans =
      AnsCheckList[fineExistingTodoIndex] = {
        ...AnsCheckList[fineExistingTodoIndex],
        ans: value,
        touched: true
      };
    } else {
      AnsCheckList.push({
        scheduleTaskId: selectedWorkingCheckList.schedule[0]._id,
        checkListId: todo?._id,
        ans: value,
        _date: new Date()
      });
    }

    // AnsCheckList
    // set value to props state
    setSelectedWorkingCheckList((p) => {
      return {
        ...p,
        schedule: [
          {
            ...p.schedule[0],
            checkList: AnsCheckList
          }
        ]
      };
    });
  }

  function columnValue(each) {
    let found = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === each?._id
    );
    if (found) {
      return found.ans;
    }
    return null;
  }

  const dispatch = useDispatch();

  const { todoFileUploading } = useSelector((state) => state.tasks);
  const { loading, success: uploadSuccess, todo, file } = todoFileUploading;

  const { success } = useMessage();

  useMemo(() => {
    if (uploadSuccess) {
      setTodoValue(todo, file?.url);
      success('Upload done ! please save all changes');
      // Reset redux state
      dispatch(todoFileUploadingReset());
    }
  }, [uploadSuccess]);

  // File Upload
  function uploadPhoto(todo, file) {
    const form = new FormData();
    form.append('file', file);
    // Initialize Uplaoding
    dispatch(todoFileUploadingInit(todo));
    dispatch(uploadTodoAnsFile(form));
  }

  function TodosMethod(each) {
    const name = each?.proofType;
    if (name === 'check') {
      return (
        <Input
          value={columnValue(each) || 'false'}
          checked={columnValue(each) === 'true' ? true : false}
          onClick={(e) => {
            setTodoValue(each, e.target.value === 'false' ? 'true' : 'false');
          }}
          type="checkbox"
        />
      );
    }

    if (name === 'yesNo') {
      return (
        <>
          <ButtonGroup className="mb-1">
            <Button
              className={columnValue(each) === 'yes' ? 'active' : ''}
              onClick={(e) => {
                setTodoValue(each, 'yes');
              }}
              outline
              color="primary"
            >
              <span>Yes</span>
            </Button>
            <Button
              className={columnValue(each) === 'no' ? 'active' : ''}
              onClick={(e) => {
                setTodoValue(each, 'no');
              }}
              outline
              color="primary"
            >
              <span>No</span>
            </Button>
          </ButtonGroup>
        </>
      );
    }

    if (name === 'input') {
      return (
        <Input
          value={columnValue(each) || ''}
          onChange={(e) => {
            setTodoValue(each, e.target.value);
          }}
        />
      );
    }

    if (name === 'photo') {
      return (
        <Input
          onChange={(e) => {
            uploadPhoto(each, e?.target?.files[0]);
          }}
          type="file"
        />
      );
    }

    if (name === 'qrCode') {
      return (
        <Input
          value={columnValue(each) || ''}
          onChange={(e) => {
            setTodoValue(each, e.target.value);
          }}
          placeholder="scan QR Code"
        />
      );
    }

    if (name === 'barCode') {
      return (
        <Input
          value={columnValue(each) || ''}
          onChange={(e) => {
            setTodoValue(each, e.target.value);
          }}
          placeholder="scan Bar Code"
        />
      );
    }

    if (name === 'measurement') {
      return (
        <Input
          value={columnValue(each) || ''}
          onChange={(e) => {
            setTodoValue(each, e.target.value);
          }}
          placeholder="Measurement Value"
        />
      );
    }

    if (name === 'ratingToFive') {
      return (
        <ButtonGroup className="mb-1">
          <Button
            className={parseInt(columnValue(each)) >= 1 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '1' ? '' : '1');
            }}
            outline
            color="primary"
          >
            <span>1</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 2 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '2' ? '' : '2');
            }}
            outline
            color="primary"
          >
            <span>2</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 3 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '3' ? '' : '3');
            }}
            outline
            color="primary"
          >
            <span>3</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 4 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '4' ? '' : '4');
            }}
            outline
            color="primary"
          >
            <span>4</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 5 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '5' ? '' : '5');
            }}
            outline
            color="primary"
          >
            <span>5</span>
          </Button>
        </ButtonGroup>
      );
    }

    if (name === 'ratingToTen') {
      return (
        <ButtonGroup className="mb-1">
          <Button
            className={parseInt(columnValue(each)) >= 1 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '1' ? '' : '1');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>1</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 2 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '2' ? '' : '2');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>2</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 3 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '3' ? '' : '3');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>3</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 4 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '4' ? '' : '4');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>4</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 5 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '5' ? '' : '5');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>5</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 6 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '6' ? '' : '6');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>6</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 7 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '7' ? '' : '7');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>7</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 8 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '8' ? '' : '8');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>8</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 9 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '9' ? '' : '9');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>9</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 10 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '10' ? '' : '10');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>10</span>
          </Button>
        </ButtonGroup>
      );
    }

    return <>{name}</>;
    // <Input type="file" />
  }

  const { userData } = useSelector((state) => state.auth);

  function renderStaffName(todo) {
    const isTodoCompleted = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === todo?._id
    );

    if (!isTodoCompleted) {
      return <></>;
    }

    // if has Answer but employee Id null ... mark as admin
    if (isTodoCompleted && isTodoCompleted.employeeId === null) {
      return <>{userData?.fullName}</>;
    }

    if (!isTodoCompleted._id) {
      return <></>;
    }

    // Else Render Employee
    return <>{isTodoCompleted?.employee[0]?.fullName} </>;
  }

  function renderStaffDesignation(todo) {
    const isTodoCompleted = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === todo?._id
    );

    if (!isTodoCompleted) {
      return <></>;
    }

    // if has Answer but employee Id null ... mark as admin
    if (isTodoCompleted && isTodoCompleted.employeeId === null) {
      return <>Admin</>;
    }

    if (!isTodoCompleted._id) {
      return <></>;
    }

    // Else Render Employee
    return <>{isTodoCompleted?.employee[0]?.position}</>;
  }

  function renderStafPhoto(todo) {
    const isTodoCompleted = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === todo?._id
    );

    if (!isTodoCompleted) {
      return <></>;
    }

    // if has Answer but employee Id null ... mark as admin
    if (isTodoCompleted && isTodoCompleted.employeeId === null) {
      return <Avatar content="AD" imgHeight="38" imgWidth="38" />;
    }

    if (!isTodoCompleted._id) {
      return <></>;
    }

    // Else Render Employee
    let nameArr = String(isTodoCompleted?.employee[0]?.fullName).split(' ');

    let nameLastPart = '';
    if (nameArr[1]) {
      nameLastPart = nameArr[1].length > 0 ? nameArr[1][0] : '';
    }

    return <Avatar content={`${nameArr[0][0]} ${nameLastPart}`} imgHeight="38" imgWidth="38" />;
  }

  useMemo(() => {
    // setTodoList(demo)
    if (selectedWorkingCheckList) {
      // checkList
      let list = selectedWorkingCheckList?.checkList;

      if (list.length > 0) {
        // Lets build List
        let data = [];
        let serial = 0;
        for (let each of list) {
          // console.log(each)
          serial++;
          data.push({
            title: each?.title,
            icon: <span>{serial}</span>,
            content: <div>{TodosMethod(each)}</div>,
            meta: moment(each?._date).format('MMMM Do YYYY, h:mm:ss a'),
            customContent: (
              <div className="d-flex align-items-center">
                {renderStafPhoto(each)}
                <div className="ms-50">
                  <h6 className="mb-0">
                    {/* // If Aadmin then show Admin Name otherwise show employee name  */}
                    {renderStaffName(each)}
                  </h6>
                  <span>{renderStaffDesignation(each)}</span>
                </div>
              </div>
            )
          });
        }

        // After Finish List Draw List
        setTodoList(data);
      } else {
        setTodoList([]);
      }
    }
  }, [selectedWorkingCheckList]);

  useMemo(() => {
    setTimeout(() => {
      // console.clear()
    }, [1000]);
  }, []);

  return {
    todoList
  };
};

export default useTodoList;
