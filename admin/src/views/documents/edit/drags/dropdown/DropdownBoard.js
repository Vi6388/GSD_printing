import React, { useState, useContext, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ArrowDown, ChevronDown } from 'react-feather';
import { Input } from 'reactstrap';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function DropdownBoard({ item, handleDisabled }) {
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
      onDrag={() => setOpenProps(true)}
      ref={drag}
      onStart={onStart}
    >
      <div className="box" style={{ width: '150px' }}>
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
            transform: `scale(${state.formatting / 100})`
          }}
        >
          Select <ChevronDown />
        </div>
      </div>
    </Draggable>
  );
}
