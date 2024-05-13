import React, { memo } from "react";
import { Handle, useStore, Position } from "reactflow";
import Modal from "./Modal";

const CustomNode = ({ id, data, ...respt }) => {
  const modalRef = React.useRef(null);
  const openModal = () => {
    modalRef.current.show();
  };

  return (
    <>
      <Handle type="source" position={Position.Left} />
      <div
        className="relative w-40 h-40 cursor-pointer"
        onClick={() => {
          console.log("run");
          openModal();
        }}
      >
        <div className=" w-full h-full clip-diamond border-1 bg-red-500 rounded-md border">
          <div className="w-full h-full clip-diamond bg-white "></div>
        </div>
        <div className="absolute top-1 left-0 z-1 flex items-center justify-center w-full h-full">
          <p className="">{data?.label || "no node connected"}</p>
        </div>
      </div>
      <Handle type="target" position={Position.Right} />
      <Modal ref={modalRef} />
    </>
  );
};

export default CustomNode;
