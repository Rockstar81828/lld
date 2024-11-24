import React, { useEffect, useRef, useState } from "react";
import "./Snackbar.css";
import Toast from "./Toast";

const Snackbar = () => {
  const [config, setConfig] = useState({
    horizontal: "Left",
    vertical: "Top",
    type: "Normal",
    message: "Snacbar message",
  });
  const { horizontal, vertical, type, message } = config;
  const horizontalOptions = ["Left", "Right"];
  const verticalOptions = ["Top", "Bottom"];
  const typeOptions = ["Normal", "Info", "Warning", "Error", "Success"];
  const [time, setTime] = useState(5000);
  const [show, setShow] = useState(false);

  const [toasts, setToasts] = useState([]);

  const handleSelectChange = (e, field) => {
    setConfig({ ...config, [field]: e.target.value });
  };

  const generateToastClassName = (horizontal, vertical) => {
    let toastClass = "";
    if (horizontal === "Left" && vertical === "Top") {
      toastClass += "toast top-left";
    } else if (horizontal === "Left" && vertical === "Bottom") {
      toastClass += "toast bottom-left";
    } else if (horizontal === "Right" && vertical === "Top") {
      toastClass += "toast top-right";
    } else if (horizontal === "Right" && vertical === "Bottom") {
      toastClass += "toast bottom-right";
    }
    return toastClass;
  };

  const deleteToast = (id) => {
    setToasts((prevToasts) => {
      const toastsClones = [...prevToasts];
      const filteredToasts = toastsClones.filter((t) => t.id !== id);
      return filteredToasts;
    });
  };

  const showToast = () => {
    setShow(true);
    const id = new Date().getTime();
    const newToast = {
      msg: message,
      h: horizontal,
      v: vertical,
      showToast: true,
      id: id,
      t: type,
    };
    setToasts([...toasts, newToast]);

    setTimeout(() => {
      deleteToast(id);
    }, time);
  };

  return (
    <div>
      <div className="flex">snackbar main</div>
      <div className="snacbar-container">
        <div className="snacbar-config-container">
          <div>
            <select
              value={horizontal}
              onChange={(e) => handleSelectChange(e, "horizontal")}
            >
              {horizontalOptions.map((e, i) => (
                <option key={i}>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={vertical}
              onChange={(e) => handleSelectChange(e, "vertical")}
            >
              {verticalOptions.map((e, i) => (
                <option key={i}>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={type}
              onChange={(e) => handleSelectChange(e, "type")}
            >
              {typeOptions.map((e, i) => (
                <option key={i}>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <button onClick={showToast}>Show Toast</button>
          </div>
          <div className={generateToastClassName(horizontal, vertical)}>
            {toasts?.map(({ msg, t, id, h, v }, i) => {
              return (
                <Toast
                  key={i}
                  message={msg}
                  type={t}
                  deleteToast={deleteToast}
                  id={id}
                  horizontal={h}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
