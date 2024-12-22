import React, { useEffect, useState } from "react";
import "./Circles.css";

const Circles = () => {
  const [leftCircle, setLeftCircle] = useState({
    hasCircle: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [rightCircle, setRightCircle] = useState({
    hasCircle: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const doelementOverlap = (leftCircle, rightCircle) => {
    const leftCircleRadius = leftCircle.width / 2;
    const rightCircleRadius = rightCircle.width / 2;

    const leftCenter = {
      x: leftCircle.x + leftCircleRadius,
      y: leftCircle.y + leftCircleRadius,
    };

    const rightCenter = {
      x: rightCircle.x + rightCircleRadius,
      y: rightCircle.y + rightCircleRadius,
    };

    const distanceBetweenCenters = Math.sqrt(
      Math.pow(leftCenter.x - rightCenter.x, 2) +
        Math.pow(leftCenter.y - rightCenter.y, 2)
    );
    return distanceBetweenCenters < leftCircleRadius + rightCircleRadius;
  };

  useEffect(() => {
    const isInterSecting = doelementOverlap(leftCircle, rightCircle);
    console.log("==> interscting", isInterSecting);
  }, [leftCircle, rightCircle]);

  const handleMouseClick = (e) => {
    // e.preventDefault();
    console.log(e.clientX, e.clientY);
    if (e.button) {
      console.log(
        "==> right",
        [e.clientX, e.clientY],
        [leftCircle.x, leftCircle.y]
      );

      const dimension = Math.round(Math.random()) * Math.random() * 100 + 50;
      const dimensionPx = `${dimension}px`;
      setRightCircle({
        hasCircle: true,
        x: e.clientX,
        y: e.clientY,
        // x: e.clientX - Math.floor(dimension / 2),
        // y: e.clientY - Math.floor(dimension / 2),
        height: dimensionPx,
        width: dimensionPx,
      });
    } else {
      console.log(
        "==> left",
        [e.clientX, e.clientY],
        [rightCircle.x, rightCircle.y]
      );

      const dimension = Math.round(Math.random()) * Math.random() * 100 + 50;
      const dimensionPx = `${dimension}px`;
      setLeftCircle({
        hasCircle: true,
        x: e.clientX,
        y: e.clientY,
        // x: e.clientX - Math.floor(dimension / 2),
        // y: e.clientY - Math.floor(dimension / 2),
        height: dimensionPx,
        width: dimensionPx,
      });
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <div className="circles-container" onMouseDown={handleMouseClick}>
      {leftCircle.hasCircle && (
        <div
          className="left-circle"
          style={{
            left: leftCircle.x,
            top: leftCircle.y,
            height: leftCircle.height,
            width: leftCircle.width,
          }}
        ></div>
      )}
      {rightCircle.hasCircle && (
        <div
          className="right-circle"
          style={{
            left: rightCircle.x,
            top: rightCircle.y,
            height: rightCircle.height,
            width: rightCircle.width,
          }}
        ></div>
      )}
    </div>
  );
};

export default Circles;
