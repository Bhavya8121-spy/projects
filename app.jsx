import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import Car from "./car";

function LoadingBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#1a1a2e" }}>
      <Canvas
        shadows
        camera={{ position: [4, 2, 8], fov: 45, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#1a1a2e");
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2} castShadow shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-10, 5, -5]} intensity={1} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        <Suspense fallback={<LoadingBox />}>
          <Car />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} />
        </Suspense>

        <OrbitControls
          target={[0, 0, 0]}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
