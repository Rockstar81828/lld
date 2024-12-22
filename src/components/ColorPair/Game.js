import React, { useEffect, useState } from "react";
import "./Game.css";

const Game = ({ totalBoxes, columns }) => {
  const [boxes, setBoxes] = useState([]);
  const [trackClicks, setTrackClicks] = useState({
    firstClick: [],
    secondClick: [],
  });
  const [foundPairs, setFoundPairs] = useState(0);
  const [tries, setTries] = useState(0);
  const clearTime = 300;
  const hashCodes = [];

  const renderBoxes = () => {
    const allBoxes = [];
    console.log("==> render");

    for (let i = 0; i < totalBoxes / 2; i++) {
      const h = Math.random() * 100;
      const s = Math.random() * 100;
      const l = Math.random() * 100;
      const secretColor = `hsl(${h}, ${s}%, ${l}%)`;
      hashCodes.push({ idx: i, secretColor });
      hashCodes.push({ idx: i, secretColor });
    }

    for (let i = 0; i < totalBoxes; i++) {
      const secretHash = Math.floor(Math.random() * hashCodes.length);
      allBoxes.push({
        idx: i,
        color: i % columns,
        backGroundColor: "white",
        isClicked: false,
        isFound: false,
        hashCode: hashCodes[secretHash].idx,
        secretColor: hashCodes[secretHash].secretColor,
      });
      hashCodes.splice(secretHash, 1);
    }
    setBoxes(allBoxes);
  };

  const handleBoxClick = (e, curBox) => {
    e.preventDefault();
    if (curBox.isClicked) return;
    console.log("==> curBox", curBox);
    const { firstClick, secondClick } = trackClicks;
    const boxesCopy = [...boxes];
    const curClickedBox = boxesCopy.find((box) => box.idx === curBox.idx);
    curClickedBox.isClicked = true;
    setBoxes(boxesCopy);
    // if (firstClick.length && secondClick.length) {
    //   resetClicks();
    // }
    if (!firstClick.length) {
      setTrackClicks({
        ...trackClicks,
        firstClick: [curBox.idx, curBox.hashCode],
      });
    } else if (firstClick.length && firstClick[0] !== curBox.idx) {
      setTrackClicks({
        ...trackClicks,
        secondClick: [curBox.idx, curBox.hashCode],
      });
    }
  };

  const resetClicks = ({ isCorrect }) => {
    console.log("==> is", isCorrect);
    const { firstClick, secondClick } = trackClicks;

    if (!isCorrect) {
      const boxesCopy = [...boxes];
      for (let i = 0; i < boxesCopy.length; i++) {
        if (
          boxesCopy[i].idx === firstClick[0] ||
          boxesCopy[i].idx === secondClick[0]
        ) {
          console.log("==> render orange");
          //   boxesCopy[i].backGroundColor = "white";
          boxesCopy[i].isClicked = false;
        }
      }
      setBoxes(boxesCopy);
    } else {
      setFoundPairs((prevCount) => (prevCount += 1));
    }
    setTries((prev) => (prev += 1));
    setTrackClicks({ firstClick: [], secondClick: [] });
  };

  const resetGame = () => {
    renderBoxes();
    setFoundPairs(0);
    setTries(0);
  };

  useEffect(() => {
    renderBoxes();
  }, []);

  useEffect(() => {
    const { firstClick, secondClick } = trackClicks;
    let isCorrect = false;
    if (firstClick.length && secondClick.length) {
      if (firstClick[1] === secondClick[1]) {
        isCorrect = true;
        console.log("==> clicked correctly");
      } else {
        isCorrect = false;
        console.log("==> try again");
      }
      setTimeout(() => {
        resetClicks({ isCorrect });
      }, clearTime);
    }
  }, [trackClicks]);

  return (
    <>
      <div>Game</div>
      <div className="game-container">
        {foundPairs >= Math.floor(totalBoxes / 2) ? (
          <>
            <div>All Pairs Found after tries {tries}</div>
            <div>
              <button onClick={resetGame}>Reset the game</button>
            </div>
          </>
        ) : (
          <div className="box-container">
            {boxes.map((box) => (
              <div
                key={box.id}
                data={box}
                className="box"
                onClick={(e) => handleBoxClick(e, box)}
                style={{
                  backgroundColor: box.isClicked
                    ? box.secretColor
                    : box.backGroundColor,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
