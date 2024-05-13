"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
} from "reactflow";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "@/components/workflow/initial-elements";
import AnnotationNode from "@/components/workflow/AnnotationNode";
import ToolbarNode from "@/components/workflow/ToolbarNode";
import ResizerNode from "@/components/workflow/ResizerNode";
import CircleNode from "@/components/workflow/CircleNode";
import TextNode from "@/components/workflow/TextNode";
import ButtonEdge from "@/components/workflow/ButtonEdge";
import CustomNode from "@/components/workflow/CustomNode";
import ContextMenu from "@/components/workflow/ContextMenu";
import AddNode from "@/components/workflow/AddNode";

import "reactflow/dist/style.css";
import "./overview.css";

const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextNode,
  custom: CustomNode,
};

const edgeTypes = {
  button: ButtonEdge,
};

const nodeClassName = (node) => node.type;

const OverviewFlow = () => {
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const onLogin = async () => {
      const getToken = sessionStorage.getItem("keyLogin");
      if (!getToken) {
        window.location.href = "/";
      }
    };
    onLogin();
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onLogout = () => {
    sessionStorage.removeItem("keyLogin");
    window.location.href = "/";
    // myMSALObj.logout();
  };

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center w-full">
        <div type="button" className="btn-login w-40" onClick={onLogout}>
          <p className="btn-login_txt">Đăng xuất</p>
        </div>
      </div>

      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className="overview"
      >
        {/* <MiniMap zoomable pannable nodeClassName={nodeClassName} /> */}
        <Controls />
        <Background />

        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}

        <Panel position="top-right">
          {/* <button onClick={() => {}}>vertical layout</button> */}
          <AddNode setNodes={setNodes} />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default OverviewFlow;
