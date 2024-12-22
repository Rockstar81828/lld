import React, { useState } from "react";
import "./ColorCircles.css";

const ColorCircles = () => {
  const colors = [
    "#2c3e50",
    "#34495e",
    "#c0392b",
    "#e74c3c",
    "#27ae60",
    "#3498db",
    "#f39c12",
    "#f1c40f",
  ];

  const [circles, setCircles] = useState([]);
  const [removedCircles, setRemovedCircles] = useState([]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    console.log(e);
    const currentCircle = {
      left: e.clientX - 50,
      top: e.clientY - 50,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    };
    setCircles([...circles, currentCircle]);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setCircles([]);
  };

  const handleUndo = (e) => {
    e.preventDefault();
    const circlesCopy = [...circles];
    const undoCircle = circlesCopy.pop();
    setRemovedCircles([...removedCircles, undoCircle]);
    setCircles([...circlesCopy]);
  };

  const handleRedo = (e) => {
    e.preventDefault();
    const removedCirclesCopy = [...removedCircles];
    const redoCirlce = removedCirclesCopy.pop();
    setRemovedCircles([...removedCirclesCopy]);
    setCircles([...circles, redoCirlce]);
  };

  return (
    <div>
      <div>ColorCircles</div>
      <div className="color-btns">
        <button disabled={!circles.length} onClick={handleUndo}>
          Undo
        </button>
        <button disabled={!removedCircles.length} onClick={handleRedo}>
          Redo
        </button>
        <button disabled={!circles.length} onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="color-circles-container" onMouseDown={handleMouseDown}>
        {circles.map((circle, i) => (
          <div
            className="circle"
            style={{
              left: circle.left,
              top: circle.top,
              backgroundColor: circle.backgroundColor,
            }}
            key={i}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorCircles;
