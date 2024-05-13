import { useReactFlow } from "reactflow";

let id = 1;
const getId = () => `${id++}`;
const AddNode = ({ setNodes }) => {
  const { screenToFlowPosition } = useReactFlow();
  const handleAddNode = () => {
    const id = getId();
    const newNode = {
      id,
      type: "custom",
      position: screenToFlowPosition({
        x: 100,
        y: 100,
      }),
      data: { label: `Node ${id}` },
      origin: [0.5, 0.0],
    };

    setNodes((nds) => nds.concat(newNode));
  };
  return (
    <button
      onClick={() => {
        handleAddNode();
      }}
    >
      add node
    </button>
  );
};

export default AddNode;
