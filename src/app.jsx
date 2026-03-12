import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Car from "./car";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 2, 8] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5,5,5]} />
        <Car />
        <OrbitControls />
      </Canvas>
    </div>
  );
}