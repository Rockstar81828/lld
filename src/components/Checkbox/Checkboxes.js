import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { checkboxMockData } from "./mockData";

const Checkboxes = () => {
  const [data, setData] = useState(checkboxMockData);

  const modifyChildChecked = ({ curData, curIsChecked }) => {
    curData.isChecked = curIsChecked;
    for (let i = 0; i < curData.children.length; i++) {
      modifyChildChecked({ curData: curData.children[i], curIsChecked });
    }
  };

  const modifyParentChecked = ({ curData, curIsChecked, data }) => {
    const curParent = findParent({
      id: curData.id,
      data,
    });
    if (curParent) {
      const isAllChecked = curParent.children.every((child) => child.isChecked);
      if (isAllChecked) {
        curParent.isChecked = true;
      } else {
        curParent.isChecked = false;
      }
      modifyParentChecked({ curData: curParent, curIsChecked, data });
    }
  };

  const modifyData = ({ id, curData, data }) => {
    if (curData.id === id) {
      curData.isChecked = !curData.isChecked;
      const curIsChecked = curData.isChecked;
      modifyChildChecked({ curData, curIsChecked });
      modifyParentChecked({ curData, curIsChecked, data });
      return;
    }
    for (let i = 0; i < curData.children.length; i++) {
      modifyData({ id, curData: curData.children[i], data });
    }
  };

  const findParent = ({ id, data }) => {
    for (let curData of data.children) {
      if (curData.id === id) {
        return data;
      }
    }
    for (let curData of data.children) {
      return findParent({ id, data: curData });
    }
  };

  const onChangeHandler = ({ id }) => {
    const dataCopy = structuredClone(data);
    modifyData({ id, curData: dataCopy, data: dataCopy });
    setData(dataCopy);
  };

  return <Checkbox data={data} onChangeHandler={onChangeHandler} />;
};

export default Checkboxes;
