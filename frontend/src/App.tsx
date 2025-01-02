import { useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import axios from "axios";

const App = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = import.meta.env.BACKEND_URL; 
    console.log("this is backend url", BACKEND_URL);

      const handleFolderUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append("files", file));

        setLoading(true);
        try {
          

          const response = await axios.post(`${BACKEND_URL}/upload-folder`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          console.log("Response data:", response.data); // Add this log
          const data = response.data;

          const parsedNodes = data.map((entity: any, index: number) => ({
            id: entity.name,
            position: { x: index * 200, y: 50 },
            data: { label: entity.name },
          }));
        
          const parsedEdges = data.flatMap((entity: any) =>
            entity.relationships.map((rel: any) => ({
              id: `${entity.name}-${rel.target}`,
              source: entity.name,
              target: rel.target,
              label: rel.type,
              type:"simplebezier",
              animated: "true",
            }))
          );
        
          console.log("Parsed nodes:", parsedNodes); // Add this log
          console.log("Parsed edges:", parsedEdges); // Add this log
        
          setNodes(parsedNodes);
          setEdges(parsedEdges);
        } catch (error) {
          console.error("Error uploading folder:", error);
        }
        
        setLoading(false);
      };


    return (

      <div>
      <h1>TypeORM UML Generator</h1>

      {!nodes.length && (
        <div>
          <input
            type="file"
            {...({ webkitdirectory: "true" } as any)}
            multiple
            onChange={handleFolderUpload}
            style={{ marginBottom: "20px" }}
          />
          {loading && <p>Processing folder...</p>}
        </div>
      )}

      {nodes.length > 0 && (
        <div style={{ height: "90vh", width: "95vw" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        </div>
       )}
       </div>
  );
};

export default App;
