import React from "react";
import Game from "./Game";

const ColorPair = () => {
  const totalBoxes = 16;
  const columns = 4;
  return (
    <div>
      <div>ColorPair</div>
      <Game totalBoxes={totalBoxes} columns={columns} />
    </div>
  );
};

export default ColorPair;
