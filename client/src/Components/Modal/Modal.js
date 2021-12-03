import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./index.css";

//Author:Fahid Khan

const ModalConfirm = (props) => {
  const [step, setStep] = useState(1); //1, 2, 3 and 4 is finish dialog
  const [title, setTitle] = useState("Step 1: Choose Course Meal");
  const [count, setCount] = useState(1);
  const [change, setChange] = useState(false);

  const {
    textModal,
    data,
    modalBack,
    visibleModal,
    clickClose,
    clickConfirm,
    itemList,
  } = props;

  const onChange = () => {
    setChange(!change);
    console.log(itemList);
  };

  const plus = () => {
    var newCount = count + 1;
    setCount(newCount);
  };

  const minus = () => {
    var newCount;

    if (count > 1) newCount = count - 1;
    else newCount = count;

    setCount(newCount);
  };

  const { id, image, item, ingredient } = data;

  return (
    <Modal size="lg" show={visibleModal} onHide={clickClose} centered>
      <Modal.Body className="modalBody">
        <div className="title">{title}</div>
        <img src={image} className="photo" />
        <div className="itemRow">
          <div className="itemSelector">
            <div style={{ fontSize: "20px", paddingLeft: "20px" }}>{item}</div>
            <button className="whiteButton" onClick={() => onChange()}>
              Change
            </button>
          </div>
          <div className="itemCount">
            <div
              style={{
                fontSize: "20px",
                paddingRight: "20px",
                paddingLeft: "20px",
              }}
            >
              {count}
            </div>
            <button className="plusButton" onClick={() => plus()}>
              +
            </button>
            <button className="minusButton" onClick={() => minus()}>
              -
            </button>
          </div>
        </div>
        <div className="addMore">+ add more</div>
        <div className="buttons">
          <button className="nextButton" onClick={() => onChange()}>
            next
          </button>
          <button className="cancelButton" onClick={clickClose}>
            cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConfirm;
