import React, { memo, useState, useEffect } from 'react';
import Avatar from '@components/avatar';
import { useSelector } from 'react-redux';

function ChatRoomHeader() {
  const { userData } = useSelector((state) => state.auth);
  const { ActiveContact } = useSelector((state) => state.text);

  //** Vars
  const userAvatar = (userData && userData?.avatar) || null;

  const [shortName, setShortName] = useState('');

  useEffect(() => {
    if (ActiveContact) {
      if (userData?.fullName) {
        const nameOrArr = String(ActiveContact?.fullName).split(' ');
        const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : '';
        const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : '';
        setShortName(
          `${firstPart[0].toUpperCase()} ${lastPart[0] ? lastPart[0].toUpperCase() : ''}`
        );
      }
    } //
    return () => {};
  }, [ActiveContact]);

  return (
    <div>
      {ActiveContact && (
        <div
          style={{
            marginTop: '3%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center'
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
          <p className="pl-1 mb-0" style={{ paddingLeft: 10 }}>
            {ActiveContact?.fullName}
          </p>
        </div>
      )}
      {/* {isMobileView ? (
         <IconButton
             onClick={() => {
                 GoBack()
             }}
             className="text-gray rounded-circle"
             aria-label="add"
         >
             <ArrowBackIcon />
         </IconButton>
     ) : (
         <IconButton className="text-gray rounded-circle" aria-label="add">
             <StarBorderIcon />
         </IconButton>
     )} */}
    </div>
  );
}

export default memo(ChatRoomHeader);
