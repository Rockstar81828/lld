import React, { Fragment, useState } from "react";
import "./Stepper.css";

const Stepper = () => {
  const steps = ["Plan", "Prepare", "Persistence", "Proud"];

  const [curStep, setCurStep] = useState(0);
  const getStepColor = (idx) => {
    const style = {};
    if (idx !== 3) {
      style.left = `${idx * (100 / 3)}%`;
    } else {
      style.right = 0;
    }
    if (idx === curStep) {
      style.background = "blue";
    } else if (idx < curStep) {
      style.background = "green";
    }
    return style;
  };

  const contentComponents = {
    0: <div>Start the plan</div>,
    1: <div>Start the preparation</div>,
    2: <div>Be patient and consistent</div>,
    3: <div>Time to feel Proud</div>,
    4: <div>Its time to celebrate</div>,
  };

  const renderContent = (activeStep) => {
    return contentComponents[activeStep];
  };
  return (
    <div className="stepper-root">
      <div>Stepper</div>
      <div className="step-main">
        <div className="stepper-container">
          <div className="stepper-line"></div>
          <div className="steps">
            {steps.map((step, i) => (
              <Fragment key={i}>
                <span
                  //   style={i !== 3 ? { left: `${i * (100 / 3)}%` } : { right: 0 }}
                  className="step"
                  key={i}
                  onClick={() => setCurStep(i)}
                  style={getStepColor(i)}
                >
                  <span className="step-name">{step}</span>
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="content-container">{renderContent(curStep)}</div>
      <div className="stepper-button-container">
        <button
          onClick={() => setCurStep((prev) => prev - 1)}
          disabled={curStep === 0}
          className="prev"
        >
          Prev
        </button>
        <button
          onClick={() => setCurStep((prev) => prev + 1)}
          disabled={curStep === steps.length}
          className="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
