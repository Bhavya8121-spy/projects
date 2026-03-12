import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Car() {
  const groupRef = useRef();
  const { scene } = useGLTF("/scene.gltf");

  useEffect(() => {
    if (!scene || !groupRef.current) return;

    // Step 1: Compute bounding box of the raw scene
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    console.log("Model center:", center);
    console.log("Model size:", size);

    // Step 2: Scale to fit — target 4 units wide
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 4 / maxDim;
    scene.scale.setScalar(scale);

    // Step 3: After scaling, recompute center and re-center
    const box2 = new THREE.Box3().setFromObject(scene);
    const center2 = box2.getCenter(new THREE.Vector3());
    scene.position.x -= center2.x;
    scene.position.y -= center2.y;
    scene.position.z -= center2.z;

    // Step 4: Fix materials so nothing is invisible
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.side = THREE.DoubleSide;
          child.material.needsUpdate = true;
        }
        console.log("Mesh found:", child.name);
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        onClick={(e) => {
          e.stopPropagation();
          console.log("Clicked part:", e.object.name);
        }}
      />
    </group>
  );
}

// BUG 9 FIX: Preload the correct file path so it caches before render
useGLTF.preload("/scene.gltf");
