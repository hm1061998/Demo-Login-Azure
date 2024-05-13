import React, { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const CustomModal = (props, ref) => {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    },
  }));

  function closeModal() {
    setVisible(false);
  }

  return (
    <Modal
      isOpen={visible}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <h2>Hello</h2>
      <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
};

export default forwardRef(CustomModal);
