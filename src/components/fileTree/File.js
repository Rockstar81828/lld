import React, { useEffect, useRef, useState } from "react";
import "./File.css";

const File = ({
  data,
  addnodeToData,
  collapseOrExpand,
  editNodeData,
  deleteNode,
}) => {
  const { name, id, isExpanded, isFolder, childNodes, isShowChild, upperId } =
    data;
  const [showAddInput, setShowAddInput] = useState(false);
  const [addText, setAddText] = useState("");
  const [isFolderType, setIsFolderType] = useState(false);
  const addInputRef = useRef(null);
  const [showEditInput, setShowEditInput] = useState(false);
  const [editText, setEditText] = useState(name);
  const editInputRef = useRef(null);

  //   reset after add
  const cleanupAdd = () => {
    setShowAddInput(false);
    setAddText("");
  };

  //   reset after edit
  const cleanupEdit = () => {
    setShowEditInput(false);
    // setEditText();
  };

  //   add button on click event handler
  const onAdd = (parentId, type) => {
    setIsFolderType(type);
    setShowAddInput(true);
  };

  //   add input on blur event handler
  const addHandler = (parentId) => {
    if (addText) {
      addnodeToData({ parentId, isFolder: isFolderType, nodeName: addText });
    }
    cleanupAdd();
  };

  //   edit button on click event handler
  const onEdit = (selectedId) => {
    console.log("==> selected id", selectedId);
    setShowEditInput(true);
  };

  // edit inout on blur event handler
  const editHandler = (selectedId) => {
    console.log("==> sele", selectedId, "==> perv", name, "==> new", editText);
    if (name === editText || !editText) {
      cleanupEdit();
    } else {
      editNodeData({ selectedId, newValue: editText });
      cleanupEdit();
    }
    console.log("==> re");
  };

  //   delete button on click event handler
  const onDelete = (selectedId, parentId) => {
    console.log("==> selected id", selectedId, "==> pid", parentId);
    deleteNode({ selectedId, parentId });
  };

  //   need to optimize
  useEffect(() => {
    showAddInput && addInputRef?.current?.focus();
  }, [showAddInput]);

  useEffect(() => {
    showEditInput && editInputRef?.current?.focus();
  }, [showEditInput]);

  return (
    <>
      {isExpanded && (
        <div className="node-container">
          <div className="node">
            <span className="file-name">
              <span className="node-icon">
                {isFolder ? (
                  <i className="fa-solid fa-folder"></i>
                ) : (
                  <i className="fa-regular fa-file"></i>
                )}
              </span>
              {!showEditInput ? (
                <span>{name}</span>
              ) : (
                <span>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    ref={editInputRef}
                    onBlur={() => editHandler(id)}
                  />
                </span>
              )}
            </span>
            {!showEditInput && (
              <>
                {isFolder && (
                  <span className="node-button">
                    <button onClick={() => onAdd(id, true)}>
                      <i className="fa-solid fa-folder"></i>
                    </button>
                    <button onClick={() => onAdd(id, false)}>
                      <i className="fa-regular fa-file"></i>
                    </button>
                  </span>
                )}
                <span className="node-button">
                  <button>
                    <i
                      onClick={() => onEdit(id)}
                      className="fa-solid fa-pen-to-square"
                    ></i>
                  </button>
                </span>
                <span className="node-button">
                  <button>
                    <i
                      onClick={() => onDelete(id, upperId)}
                      className="fa-solid fa-trash"
                    ></i>
                  </button>
                </span>
              </>
            )}
            {isFolder && (
              <button
                onClick={() =>
                  collapseOrExpand({
                    nodeName: data.name,
                    isExpand: !isShowChild,
                    parentId: data.id,
                  })
                }
                className="toggle-button"
              >
                {isShowChild ? "-" : "+"}
              </button>
            )}
          </div>
          {data.childNodes.map((curData) => (
            <File
              key={curData.id}
              data={curData}
              addnodeToData={addnodeToData}
              collapseOrExpand={collapseOrExpand}
              editNodeData={editNodeData}
              deleteNode={deleteNode}
            />
          ))}
          {showAddInput && (
            <div className="add-input-container">
              <span>
                <input
                  value={addText}
                  onChange={(e) => setAddText(e.target.value)}
                  ref={addInputRef}
                  onBlur={() => addHandler(id)}
                />
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default File;
