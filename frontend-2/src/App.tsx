import { useEffect, useState } from "react";
import ReactFlow, { Node, Edge } from "react-flow-renderer";
import axios from "axios";

const App = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/parse").then((response) => {
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
        }))
      );

      setNodes(parsedNodes);
      setEdges(parsedEdges);
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlow nodes={nodes} edges={edges} />
      <p>helloooo</p>
    </div>
  );
};

export default App;
