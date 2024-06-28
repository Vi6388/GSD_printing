import React, { memo, useState } from 'react';
import { Card } from 'reactstrap';
const ProfileAvatar = React.lazy(() => import('../../apps/text/Profile'));
const UserChatList = React.lazy(() => import('../../apps/text/userchatlist/Index'));
const ChatRoomHeader = React.lazy(() => import('./chatroomHeader'));
const ChatRoom = React.lazy(() => import('./chartroom/index'));
const MessageInput = React.lazy(() => import('./MessageServes/index'));
// ** Third Party Components
import classnames from 'classnames';
import msgImg from '../../../assets/images/messages/unselect_msg.png';
// // ** Styles
// import '@styles/react/apps/app-text.scss'

function Layout() {
  const [studentType, setStudentType] = useState('');
  const [loading, setLoading] = useState(true);

  const handleEventType = async (e) => {
    let { value } = e;
    await setLoading(true);
    await setStudentType(value);
    await setLoading(false);
  };
  // its dummy variable
  let chatTextListIndex = 'dummy data';
  return (
    <div style={{ display: 'flex' }}>
      <div className="app-text-chat">
        <Card className="shadow-sm">
          <ProfileAvatar
            // getDataBack={GET_MEMBER_CONTACTS_DETAILS}
            loading={loading}
            setLoading={setLoading}
            studentType={studentType}
            handleEventType={handleEventType}
          />
          <UserChatList loading={loading} setLoading={setLoading} studentType={studentType} />
        </Card>
      </div>
      {chatTextListIndex === null ? (
        <div className="w-100">
          <Card style={{ backgroundColor: '#FAFBFF' }} className="rounded-0 shadow-sm">
            <div
              style={{
                position: 'relative',
                overflow: 'auto',
                height: '60vh',
                justifyContent: 'center',
                display: 'flex'
              }}
              className="w-100"
            >
              <img src={msgImg} alt="logo" className="mr-1" />
            </div>
          </Card>
        </div>
      ) : (
        <div className="w-100">
          <ChatRoomHeader />
          <Card className="rounded-0 shadow-sm">
            <div
              style={{
                position: 'relative',
                overflow: 'auto',
                height: '65vh'
              }}
            >
              <ChatRoom />
            </div>
            <MessageInput />
          </Card>
        </div>
      )}
    </div>
  );
}

export default memo(Layout);
