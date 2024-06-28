import React, { useState } from "react";
import ResizableRect from "react-resizable-rotatable-draggable";

const Rotate = () => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [top, setTop] = useState(100);
  const [left, setLeft] = useState(100);
  const [rotateAngle, setRotateAngle] = useState(0);

  const handleResize = (style, isShiftKey, type) => {
    let { top, left, width, height, text } = style;
    top = Math.round(top);
    left = Math.round(left);
    width = Math.round(width);
    height = Math.round(height);
    setTop(top);
    setLeft(left);
    setWidth(width);
    setHeight(height);
  };

  const handleRotate = (rotateAngle) => {
    setRotateAngle(rotateAngle);
  };

  const handleDrag = (deltaX, deltaY) => {
    setLeft(left + deltaX);
    setTop(top + deltaY);
  };

  return (
    <div className="App">
      <ResizableRect
        left={left}
        top={top}
        width={width}
        height={height}
        rotateAngle={rotateAngle}
        zoomable="n, w, s, e, nw, ne, se, sw"
        onRotate={handleRotate}
        onResize={handleResize}
        onDrag={handleDrag}
      />
    </div>
  );
};

export default Rotate;
