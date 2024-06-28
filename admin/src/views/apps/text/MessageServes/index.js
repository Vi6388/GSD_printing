import React, { memo, useState, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import TextTemplate from './Template/index';
import { FaMeh } from 'react-icons/fa';
import { MdAttachment } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { addText, addTextReducer, getMessageContacts, getText, getTextContacts } from '../store';
import { toast } from 'react-toastify';

function MessageInput() {
  const dispatch = useDispatch();
  const { ActiveContact } = useSelector(({ text }) => text);
  const { userData } = useSelector(({ auth }) => auth);

  const [inputvalue, setinputvalue] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  // GET CONTACTS LIST

  useEffect(() => {
    dispatch(getTextContacts());
  }, []);

  const handaleSendingsms = async (e) => {
    let user = JSON.parse(localStorage.getItem('userData'));

    e.preventDefault();
    if (inputvalue.length == 0) {
      toast.error('Please Enter Message');
    } else if (Object.keys(ActiveContact).length == 0) {
      toast.error('Please Select Contact');
    } else {
      let data = {
        id: user?.id,
        uid: ActiveContact?.uid,
        userId: user?.id,
        email: ActiveContact?.email,
        textContent: inputvalue,
        phone: ActiveContact?.phone
      };

      dispatch(addText(data));
      setinputvalue('');
    }
    // setinputvalue('')
    // setShowPicker(false)
    //   let { uid } = activeStudent2sendtextChat
    //   if (inputvalue.length) {
    //       let message = {
    //           userId: localStorage.getItem('user_id'),
    //           uid: uid,
    //           textContent: inputvalue,
    //           isSent: true
    //       }
    //       let result = await SEND_TEXT_MESSAGE_V2(message)
    //       if (result.success) {
    //           props.UPDATE_MEMBER_CONTACTS_DETAILS(contacts, {
    //               uid,
    //               textContent: inputvalue,
    //               time: new Date().toLocaleString('en-US', {
    //                   timeZone: 'America/New_York'
    //               })
    //           })
    //       } else {
    //           toast.error(result.message.replace(/\\/g, ''), toastCSS())
    //       }
    //   }
  };

  const onEmojiClick = (emojiObject) => {
    setinputvalue((prevInput) => prevInput + emojiObject?.emoji);
    setShowPicker(true);
  };

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          bottom: '6%'
        }}
      >
        {showPicker && <Picker onEmojiClick={onEmojiClick} height={500} width={400} />}
      </div>
      <form onSubmit={handaleSendingsms}>
        <div className={`d-flex justify-content-between`}>
          <div className="mt-1 d-flex justify-content-start align-items-center w-100">
            <div className="goal-search-box d-flex justify-content-start align-items-center pl-1 pr-1 w-100">
              {/* <TextTemplate /> */}
              <Button
                // outline
                color="link"
                onClick={() => setShowPicker((val) => !val)}
                size="sm"
                className="btn-icon"
              >
                <FaMeh size={16} />
              </Button>
              <Button
                // outline
                color="link"
                size="sm"
                className="btn-icon"
              >
                <MdAttachment size={20} />
              </Button>

              <Input
                className="w-100"
                type="text"
                placeholder="Type a message here..."
                value={inputvalue}
                onChange={(e) => {
                  setinputvalue(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mt-1 d-flex justify-content-start align-items-center">
            <div className="d-flex justify-content-start align-items-center pl-1 pr-1 w-100">
              <Button color="primary" outline onClick={handaleSendingsms}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default memo(MessageInput);
