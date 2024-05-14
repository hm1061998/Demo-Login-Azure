import { useReactFlow } from "reactflow";

let id = 1;
const getId = () => `${id++}`;
const AddNode = ({ type }) => {
  const { screenToFlowPosition, setNodes } = useReactFlow();
  const handleAddNode = () => {
    const id = getId();
    const newNode = {
      id,
      type: "custom",
      position: screenToFlowPosition({
        x: 100,
        y: 100,
      }),
      data: { label: `Node ${id}`, type },
      origin: [0.5, 0.0],
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const renderType = () => {
    switch (type) {
      case "diamond":
        return (
          <div className="w-10 h-10 clip-diamond bg-red-500 rounded-md border">
            <div className="w-full h-full clip-diamond bg-white "></div>
          </div>
        );
      case "circle":
        return (
          <div className="w-10 h-10 rounded-full border border-green-500 bg-white"></div>
        );
      case "square":
        return (
          <div className="w-10 h-10 border border-blue-500 bg-white"></div>
        );
      default:
        return <p>Add Node</p>;
    }
  };
  return (
    <button
      onClick={() => {
        handleAddNode();
      }}
      className="mr-2"
    >
      {renderType()}
    </button>
  );
};

export default AddNode;
