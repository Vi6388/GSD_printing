import React, { memo, useState, useEffect } from 'react';
import { ListGroup, List } from 'reactstrap';
// ** Custom Components
import Avatar from '@components/avatar';
import { useSelector, useDispatch } from 'react-redux';
import TextAlert from './TextAlert';
import { activeTextContacts } from '../store';

function UserChatList({ loading, setLoading, studentType }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { contacts } = useSelector((state) => state.text);

  //** Vars
  const userAvatar = (userData && userData?.avatar) || null;

  const [shortName, setShortName] = useState('');

  useEffect(() => {
    if (userData) {
      if (userData?.fullName) {
        const nameOrArr = String(userData?.fullName).split(' ');
        const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : '';
        const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : '';
        setShortName(
          `${firstPart[0].toUpperCase()} ${lastPart[0] ? lastPart[0].toUpperCase() : ''}`
        );
      }
    } //
    return () => {};
  }, [userData]);
  const UserChatActivity = async (event, Info, index) => {
    dispatch(activeTextContacts(Info));
  };

  return (
    <div
      // className={classes.userlist}
      style={{
        display: 'flex',
        alignItems: 'flex-start'
      }}
    >
      <div style={{ width: '275px' }} dense>
        {contacts?.length > 0 ? (
          contacts?.map((item, i) => {
            return (
              <ListGroup
                className="app-text-userlist"
                // selected={chatTextListIndex === i}
                button
                onClick={(event) =>
                  UserChatActivity(
                    event,
                    {
                      fullName: item?.fullName,
                      email: item?.email,
                      uid: item?._id,
                      phone: item?.phone
                      // memberprofileImage:
                      //     item?.memberprofileImage
                    },
                    i
                  )
                }
                key={item?._id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  padding: '10px 0px 10px 0px'
                  // paddingLeft: '15px',
                }}
              >
                <div>
                  {userAvatar ? (
                    <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
                  ) : (
                    <>
                      <Avatar
                        // img={userAvatar}
                        color="primary"
                        imgHeight="40"
                        imgWidth="40"
                        status="online"
                        content={shortName || 'N/A'}
                      />
                    </>
                  )}
                </div>
                <div
                  className="w-100"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: '1rem'
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <p className="mb-0" variant="subtitle1">
                      {item.fullName}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '11rem'
                      }}
                    >
                      <p noWrap color="textSecondary" className={`mb-0`}>
                        {item?.firstName1}
                      </p>
                    </div>
                  </div>
                </div>
              </ListGroup>
            );
          })
        ) : (
          <p style={{ color: 'black' }}>No contacts Found</p>
        )}
      </div>
    </div>
  );
}

export default memo(UserChatList);
