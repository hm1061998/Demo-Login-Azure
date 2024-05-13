import React, { memo } from "react";
import { Handle, useStore, Position } from "reactflow";

const CircleNode = ({ id }) => {
  const label = useStore((s) => {
    const node = s.nodeInternals.get(id);

    if (!node) {
      return null;
    }

    return `position x:${parseInt(node.position.x)} y:${parseInt(
      node.position.y
    )}`;
  });

  return (
    <>
      <div
        className="wrapper gradient"
        onClick={() => {
          console.log("click node circle");
        }}
      >
        <div className="inner">{label || "no node connected"}</div>
      </div>
      <Handle type="target" position={Position.Left} />
    </>
  );
};

export default memo(CircleNode);
