import React, { useEffect, useState } from "react";
import "./GridLights.css";

const GridLights = () => {
  const [squares, setSquares] = useState(1);
  const [sqauresData, setSquaresData] = useState([]);
  const [clickedCount, setClickedCount] = useState(0);
  const [clickedOrder, setClikcedOrder] = useState([]);
  const [sqaureInterval, setSquareInterval] = useState(500);
  const [range, setRange] = useState(1);

  useEffect(() => {
    formSquareData();
  }, [squares]);

  useEffect(() => {
    if (clickedCount >= squares) {
      console.log("do the logic");
      let count = 0;
      let clickedOrderReverse = clickedOrder.toReversed();
      let interval = setInterval(() => {
        const sqauresDataCopy = [...sqauresData];
        const curOrder = clickedOrderReverse[count];
        for (let i = 0; i < sqauresDataCopy.length; i++) {
          if (sqauresDataCopy[i].id === curOrder) {
            sqauresDataCopy[i].isClicked = false;
            count += 1;
            break;
          }
        }
        setSquaresData(sqauresDataCopy);
        if (count >= squares) {
          clearInterval(interval);
          resetData();
        }
      }, sqaureInterval);
    }
  }, [clickedCount]);

  const formSquareData = () => {
    const data = [];
    for (let i = 0; i < squares; i++) {
      const curData = {
        id: i,
        isClicked: false,
        isDisabled: false,
      };
      data.push(curData);
    }
    setSquaresData(data);
  };

  const getSqaureClassNames = ({ isClicked }) => {
    if (isClicked) {
      return "sqaure clicked";
    } else {
      return "sqaure";
    }
  };

  const onSqaureClick = ({ id, isClicked, isDisabled }) => {
    if (isDisabled) {
      return;
    }
    const sqauresDataCopy = [...sqauresData];
    for (let i = 0; i < sqauresDataCopy.length; i++) {
      if (sqauresDataCopy[i].id === id) {
        sqauresDataCopy[i].isClicked = true;
        sqauresDataCopy[i].isDisabled = true;
        break;
      }
    }
    setSquaresData(sqauresDataCopy);
    setClickedCount((count) => count + 1);
    setClikcedOrder([...clickedOrder, id]);
  };

  const resetData = () => {
    formSquareData();
    setClikcedOrder([]);
    setClickedCount(0);
  };

  const handleRangeChange = (e) => {
    console.log(e.target.value);
    resetData();
    setRange(e.target.value);
    setSquares(() => e.target.value * e.target.value);
  };

  return (
    <div className="grid-main">
      <div className="header">Grid Lights</div>
      <div className="grid-container" style={{ width: `${range * 100}px` }}>
        {sqauresData.map((sqaure) => {
          return (
            <span
              key={sqaure.id}
              className={getSqaureClassNames({
                isClicked: sqaure.isClicked,
              })}
              // style={{
              //   height: `${(4 - squares) * 100}px`,
              //   width: `${(4 - squares) * 100}px`,
              // }}
              onClick={(e) => onSqaureClick({ ...sqaure })}
            ></span>
          );
        })}
      </div>
      <div className="range-container">
        <input
          value={range}
          onChange={handleRangeChange}
          type="range"
          min={1}
          max={5}
        />
      </div>
    </div>
  );
};

export default GridLights;
