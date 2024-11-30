import React, { useState } from "react";
import File from "./File";
import { default as data } from "./fileData";
import { v4 as uuidv4 } from "uuid";

const FileTree = () => {
  const [fileData, setFileData] = useState(data);

  //   to add the newly created node to its correct place
  const addnodeToData = ({ parentId, isFolder, nodeName }) => {
    const newNode = {
      id: uuidv4(),
      isFolder,
      isExpanded: true,
      name: nodeName,
      childNodes: [],
      isShowChild: true,
      upperId: parentId,
    };

    const fileDataClone = structuredClone(fileData);

    const addnode = ({ parentId, curNode }) => {
      if (curNode.id === parentId) {
        curNode.childNodes.push(newNode);
        return;
      } else {
        curNode.childNodes.forEach((cur) => {
          addnode({ parentId, curNode: cur });
        });
      }
    };
    addnode({ parentId, curNode: fileDataClone[0] });
    setFileData(fileDataClone);
  };

  // edit the node data
  const editNodeData = ({ selectedId, newValue }) => {
    const updateNodeName = ({ curNode }) => {
      if (curNode.id === selectedId) {
        curNode.name = newValue;
        return;
      } else {
        curNode.childNodes.forEach((cur) => updateNodeName({ curNode: cur }));
      }
    };
    const fileDataClone = structuredClone(fileData);
    updateNodeName({ curNode: fileDataClone[0] });
    setFileData(fileDataClone);
  };

  //   to expand or collapse the child nodes
  const collapseOrExpand = ({ parentId, isExpand, nodeName }) => {
    const fileDataClone = structuredClone(fileData);

    const changeIsExpanded = ({ curNode, parentId }) => {
      if (curNode.id === parentId) {
        curNode.childNodes.forEach((e) => (e.isExpanded = isExpand));
        curNode.isShowChild = isExpand;
        return;
      } else {
        curNode.childNodes.forEach((cur) =>
          changeIsExpanded({ curNode: cur, parentId })
        );
      }
    };

    setFileData(fileDataClone);

    changeIsExpanded({ curNode: fileDataClone[0], parentId });
  };

  // to delete and update the state
  const deleteNode = ({ selectedId, parentId }) => {
    const deleteAndUpdate = ({ curNode }) => {
      if (curNode.id === parentId) {
        const newChilds = curNode.childNodes.filter(
          (cur) => cur.id !== selectedId
        );
        curNode.childNodes = newChilds;
        return;
      } else {
        curNode.childNodes.forEach((cur) => deleteAndUpdate({ curNode: cur }));
      }
    };
    const fileDataClone = structuredClone(fileData);
    deleteAndUpdate({ curNode: fileDataClone[0] });
    setFileData(fileDataClone);
  };

  return (
    <div>
      FileTree
      <File
        data={fileData[0]}
        addnodeToData={addnodeToData}
        collapseOrExpand={collapseOrExpand}
        editNodeData={editNodeData}
        deleteNode={deleteNode}
      />
    </div>
  );
};

export default FileTree;
