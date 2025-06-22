import React from "react";
import "./Checkbox.css";

const Checkbox = ({ data, onChangeHandler }) => {
  const onCheckboxClickHandler = () => {
    onChangeHandler({ id: data.id });
  };
  return (
    <div className="checkbox-container">
      <input
        onChange={onCheckboxClickHandler}
        id={data.id}
        type="checkbox"
        checked={data.isChecked}
      />
      <label htmlFor={data.id}>{data.labelText}</label>
      {data.children.map((curData) => (
        <Checkbox
          key={curData.id}
          data={curData}
          onChangeHandler={onChangeHandler}
        />
      ))}
    </div>
  );
};

export default Checkbox;
