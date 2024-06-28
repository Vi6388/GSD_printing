import React, { useContext, useState, useEffect, useRef, cloneElement } from 'react';
import { Button } from 'reactstrap';
import { DocumentContext } from '../../../../../utility/context/Document';
import Draggable from 'react-draggable';
import { Framer } from 'react-feather';

export default function BtnFormula({ customField }) {
  // ** Contexts

  const {
    recipients,
    board,
    setBoard,
    setOpenProps,
    setSelectedItem,
    currentPage,
    scale,
    offset,
    setOffset,
    setIsUndoRedo
  } = useContext(DocumentContext);

  // ** States

  const [controlledPosition, setControlledPosition] = useState({ x: 0, y: 0 });
  const [item, setItem] = useState();

  const onStart = () => {
    setControlledPosition({ x: 0, y: 0 });
    setIsUndoRedo(false);
  };

  const onStop = (e, position) => {
    if (e.srcElement.id === 'dropDiv') {
      const src = e.srcElement.getBoundingClientRect();

      let y = 0;
      y = e.pageY - src.y;
      const pages = board.filter((x) => x.page === currentPage);
      const z = pages.length > 0 ? offset + pages[pages.length - 1].height : 0;
      if (customField) {
        setItem({
          ...customField,
          left: e.x - src.x,
          top: y,
          id: board.length + 1,
          dataLabel: `Formula ${board.length + 1}`,
          page: currentPage,
          recipient: recipients.find((x) => x.active === true),
          scale: scale,
          offset: z,
          height: 50,
          icon: <Framer />
        });
      } else {
        setItem({
          type: 'formula',
          color: recipients.filter((x) => x.active === true)[0]?.color,
          _type: 'btn',
          title: 'Formula',
          icon: <Framer />,
          formatting: 100,
          tooltip: '',
          required: true,
          readOnly: false,
          bold: false,
          font: 'Arial',
          fontColor: 'black',
          fontSize: '12',
          italic: false,
          underline: false,
          left: e.x - src.x,
          top: y,
          id: board.length + 1,
          dataLabel: `Formula ${board.length + 1}`,
          page: currentPage,
          recipient: recipients.find((x) => x.active === true),
          scale: scale,
          offset: z,
          height: 50
        });
      }
      //open props menu
      setOpenProps(true);
      setOffset(z);
      setControlledPosition({ x: 0, y: 0 });
    }
  };
  useEffect(() => {
    if (item) {
      setBoard([...board, item]);
      setSelectedItem(item);
    }
  }, [item]);

  const dragHandlers = { onStop: onStop, onStart: onStart };
  return (
    <>
      <Draggable {...dragHandlers} position={controlledPosition} defaultPosition={{ x: 0, y: 0 }}>
        <div className="box">
          <div className="d-block">
            <Button color="transparent" className="text-start w-100 ps-0">
              <Framer
                style={{
                  border: `solid 1px grey`,
                  padding: '2px',
                  borderRadius: '2px',
                  marginRight: '5px',
                  backgroundColor: recipients.filter((x) => x.active === true)[0]?.color
                }}
              />
              Formula
            </Button>
          </div>
        </div>
      </Draggable>
    </>
  );
}
