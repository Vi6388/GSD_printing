import React, { useState, useContext, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Download } from 'react-feather';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function SignBoard({ item, handleDisabled }) {
  const drag = useRef();
  // ** Contexts
  const { setOpenProps, setSelectedItem, setUndoList, undoList, isUndoRedo, setIsUndoRedo } =
    useContext(DocumentContext);

  // ** States
  const [state, setState] = useState(item);
  const [defaultPosition, setDefaultPosition] = useState({
    x: item.left,
    y: item.top - item.offset
  });

  const onStart = (e, ui) => {
    handleDisabled();
    setIsUndoRedo(false);
  };
  const onStop = (e, position) => {
    setOpenProps(true);

    setState({ ...item, top: position.y, left: position.x, _type: 'board' });
    handleDisabled();
  };

  useEffect(() => {
    setSelectedItem(state);
    setUndoList([...undoList, state]);
  }, [state]);

  return (
    <Draggable
      bounds="parent"
      defaultPosition={defaultPosition}
      position={isUndoRedo && { x: item.left, y: item.top }}
      id={item.id}
      onStop={onStop}
      onStart={onStart}
      onDrag={() => setOpenProps(true)}
      ref={drag}
    >
      <div className="box" style={{ width: '130px' }}>
        <div
          className=" border border-dark text-center"
          style={{
            backgroundColor: item.recipient.color,
            color: item.fontColor,
            font: item.font,
            fontSize: `${item.fontSize}px`,
            fontStyle: item.italic ? 'italic' : 'normal',
            fontWeight: item.bold ? 'bold' : 'normal',
            textDecoration: item.underline ? 'underline' : 'normal',
            transform: `scale(${state.formatting / 100})`,

            //scale: item.formatting/100,
            width: '70px',
            height: '50px'
          }}
        >
          Sign
          <br />
          <Download />
        </div>
      </div>
    </Draggable>
  );
}
