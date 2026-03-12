import React from "react";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function Car() {
  const { scene } = useGLTF("/car.gltf");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log("Mesh name:", child.name);
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      onClick={(e) => {
        e.stopPropagation();
        console.log("Clicked part:", e.object.name);
      }}
    />
  );
}