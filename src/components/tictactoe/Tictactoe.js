import React, { useEffect, useState } from "react";
import "./Tictactoe.css";

const Tictactoe = () => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [matrix, setMatrix] = useState({});
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [xPositions, setXPositoins] = useState([]);
  const [oPositions, setOPositoins] = useState([]);
  const [win, setWin] = useState(false);
  const [draw, setDraw] = useState(false);
  const [totalSteps, setTotalSteps] = useState(rows * columns);
  const [resetTime, setResetTime] = useState(5);

  const matrixValues = {};
  const winningSets = [];

  const computeMatrixValues = () => {
    const leftDiagonal = [];
    const rightDiagonal = [];
    for (let i = 0; i < rows; i++) {
      const horizontal = [];
      for (let j = 0; j < columns; j++) {
        if (i === j) {
          leftDiagonal.push(i * rows + j + 1);
        }
        if (rows - i - 1 === j) {
          rightDiagonal.push(i * rows + j + 1);
        }
        horizontal.push(i * rows + j + 1);
        matrixValues[i * rows + j + 1] = "";
      }
      winningSets.push(horizontal);
    }
    for (let i = 0; i < winningSets[0].length; i++) {
      const vertical = [];
      for (let j = 0; j < rows; j++) {
        if (!vertical.length) {
          vertical.push(winningSets[0][i]);
        } else {
          vertical.push(vertical[vertical.length - 1] + rows);
        }
      }
      winningSets.push(vertical);
    }
    winningSets.push(leftDiagonal);
    winningSets.push(rightDiagonal);
  };

  const renderBox = () => {
    computeMatrixValues();
    const boxes = [];

    for (let i = 0; i < rows; i++) {
      boxes[i] = [];
      for (let j = 0; j < columns; j++) {
        boxes[i].push(
          <div
            position={i * rows + j + 1}
            key={i * rows + j + 1}
            className="box"
          >
            {matrix[i * rows + j + 1]}
            {/* {i * rows + j + 1} */}
          </div>
        );
      }
    }
    return boxes;
  };

  const checkWinner = () => {
    const checkPositions = isPlayerX ? oPositions : xPositions;
    let isWinnerFound = false;
    for (let i = 0; i < winningSets.length && !isWinnerFound; i++) {
      let counter = 0;
      for (let j = 0; j < checkPositions.length; j++) {
        if (winningSets[i].includes(checkPositions[j])) {
          counter += 1;
          if (counter >= rows) {
            isWinnerFound = true;
            break;
          }
        }
      }
    }
    return isWinnerFound;
  };

  const reset = () => {
    setXPositoins([]);
    setOPositoins([]);
    setWin(false);
    setDraw(false);
    setMatrix(matrixValues);
    setIsPlayerX(true);
  };

  const playGame = (e) => {
    if (matrix[e.target.getAttribute("position")] || win) {
      return;
    } else {
      if (isPlayerX) {
        setXPositoins([
          ...xPositions,
          Number(e.target.getAttribute("position")),
        ]);
      } else {
        setOPositoins([
          ...oPositions,
          Number(e.target.getAttribute("position")),
        ]);
      }
      setMatrix({
        ...matrix,
        [e.target.getAttribute("position")]: isPlayerX ? "X" : "O",
      });
      setIsPlayerX(!isPlayerX);
    }
  };

  useEffect(() => {
    setMatrix(matrixValues);
    console.log("==> winningSets", winningSets);
  }, []);

  useEffect(() => {
    const isWin = checkWinner();
    isWin && setWin(isWin);

    if (xPositions.length + oPositions.length >= totalSteps) {
      setDraw(true);
    }
  }, [xPositions, oPositions]);

  useEffect(() => {
    if (win || draw) {
      setTimeout(() => {
        reset();
      }, resetTime * 1000);
    }
  }, [win, draw]);

  return (
    <>
      <div className="tictactoe-header">tictactoe</div>
      <div className="flex-center">
        <div className="tictactoe-container">
          {renderBox().map((cur, i) => {
            return (
              <div onClick={playGame} className="row-container" key={i}>
                {cur}
              </div>
            );
          })}
        </div>
      </div>
      {win && <div>Winner is {isPlayerX ? "O" : "X"}</div>}
      {draw && <div>Match Draw</div>}
      {win || draw ? <div>Game will reset in {resetTime} seconds</div> : null}
    </>
  );
};

export default Tictactoe;
