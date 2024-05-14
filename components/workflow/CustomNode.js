import React, { memo } from "react";
import { Handle, useStore, Position } from "reactflow";
import Modal from "./Modal";

const CustomNode = ({ id, data, ...respt }) => {
  const modalRef = React.useRef(null);
  const openModal = () => {
    modalRef.current.show();
  };

  const renderType = () => {
    switch (data?.type) {
      case "diamond":
        return (
          <div className=" w-full h-full clip-diamond bg-red-500 rounded-md border">
            <div className="w-full h-full clip-diamond bg-white "></div>
          </div>
        );
      case "circle":
        return (
          <div className=" w-full h-full rounded-full bg-white border border-green-500"></div>
        );
      case "square":
        return (
          <div className=" w-full h-full  bg-white border border-blue-500"></div>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <>
      <Handle type="source" position={Position.Left} />
      <div
        className="relative w-20 h-20 cursor-pointer"
        onClick={() => {
          console.log("run");
          openModal();
        }}
      >
        {renderType()}
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
