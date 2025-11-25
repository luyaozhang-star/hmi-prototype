import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './Vehicle3D.css';

// Component with 3D model loader
function VehicleModelWithFile({ modelPath = '/models/vehicle.glb' }) {
  const meshRef = useRef();
  const centeredRef = useRef(false);
  
  // Load the 3D model
  const { scene } = useGLTF(modelPath);

  // Memoize the cloned scene and apply enhanced shading
  // This prevents the model from jumping when parent components re-render
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    
    // Traverse the scene and apply black metallic material
    cloned.traverse((child) => {
      if (child.isMesh && child.material) {
        // Create black metallic material with blue and purple shine
        const blackMetallicMaterial = new THREE.MeshPhysicalMaterial({
          color: '#444', // Much lighter color for maximum brightness
          metalness: 1, // High metalness for metallic appearance
          roughness: 0.4, // Lower roughness for more reflectivity and brightness
          envMapIntensity: 0.7, // Reduced to minimize warm tones from environment map
          sheen: 0.5, // Enable sheen for additional reflectivity
          sheenColor: '#fff', //  Tint for the reflective shine (blue-purple)
          sheenRoughness: 0.35, // Smoother sheen for more brightness
          iridescence: 0, // No iridescence effect
        });
        
        // Replace all materials with black metallic material
        child.material = Array.isArray(child.material)
          ? child.material.map(() => blackMetallicMaterial.clone())
          : blackMetallicMaterial;
        
        // Ensure shadows are enabled
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    return cloned;
  }, [scene]);

  // Center and scale the model using useFrame to ensure it runs after render
  useFrame(() => {
    if (meshRef.current && !centeredRef.current) {
      const box = new THREE.Box3().setFromObject(meshRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Center the model and apply X offset to shift it right
      meshRef.current.position.x = -center.x + MODEL_X_OFFSET;
      meshRef.current.position.y = -center.y;
      meshRef.current.position.z = -center.z;
      
      // Scale to fit if needed - increased maxSize to prevent cropping
      const maxSize = Math.max(size.x, size.y, size.z);
      if (maxSize > 6) {
        const scale = 6 / maxSize;
        meshRef.current.scale.set(scale, scale, scale);
      }
      
      centeredRef.current = true;
    }
  });

  return (
    <primitive 
      object={clonedScene} 
      ref={meshRef}
      scale={1}
      position={[0, 0, 0]}
    />
  );
}

// Fallback component with geometric car shape
function VehicleModelFallback() {
  const meshRef = useRef();
  const centeredRef = useRef(false);

  // Center the fallback model using useFrame
  useFrame(() => {
    if (meshRef.current && !centeredRef.current) {
      const box = new THREE.Box3().setFromObject(meshRef.current);
      const center = box.getCenter(new THREE.Vector3());
      
      // Center the model and apply X offset to shift it right
      meshRef.current.position.x = -center.x + MODEL_X_OFFSET;
      meshRef.current.position.y = -center.y;
      meshRef.current.position.z = -center.z;
      
      centeredRef.current = true;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Car body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1.2, 2]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      {/* Car roof */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.8, 1.8]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      {/* Wheels */}
      {[
        [-1.2, -0.6, 1.1],
        [1.2, -0.6, 1.1],
        [-1.2, -0.6, -1.1],
        [1.2, -0.6, -1.1],
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// Error Boundary component for React Three Fiber
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('3D model failed to load, using fallback:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Main component that tries to load model, falls back to geometry
function VehicleModel({ modelPath = '/models/vehicle.glb' }) {
  const [useModel, setUseModel] = useState(true);

  // Check if model file exists
  useEffect(() => {
    fetch(modelPath, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          setUseModel(false);
        }
      })
      .catch(() => {
        setUseModel(false);
      });
  }, [modelPath]);

  if (!useModel) {
    return <VehicleModelFallback />;
  }

  return (
    <ErrorBoundary fallback={<VehicleModelFallback />}>
      <Suspense fallback={<VehicleModelFallback />}>
        <VehicleModelWithFile modelPath={modelPath} />
      </Suspense>
    </ErrorBoundary>
  );
}

const DEFAULT_DISTANCE = 3.8;
const DEFAULT_AZIMUTH = Math.PI / 4.5 ; // -30deg for a slight angle
const DEFAULT_POLAR = Math.PI / 2; // 45deg from "up" (down from y axis)
// Offset to shift model 128px to the right (converted to 3D units)
// Approximate conversion: with FOV 60 and distance 3.5, ~128px ≈ 0.5 units
const MODEL_X_OFFSET = 0.4; // Shift model to the right in 3D space

function Vehicle3D() {
  const controlsRef = useRef();

  // Compute initial camera position in spherical coordinates for 45deg down from Y
  // and -30deg azimuth for a pleasing 3D view
  const getCameraPosition = (radius, polar, azimuth) => {
    // Spherical to Cartesian
    const x = radius * Math.sin(polar) * Math.cos(azimuth);
    const y = radius * Math.cos(polar);
    const z = radius * Math.sin(polar) * Math.sin(azimuth);
    return [x, y, z];
  };

  const cameraPosition = getCameraPosition(
    DEFAULT_DISTANCE,
    DEFAULT_POLAR,
    DEFAULT_AZIMUTH
  );

  // Use OrbitControls' props to set initial angles instead of modifying them imperatively
  return (
    <div className="vehicle-3d-container">
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 60, // Increased FOV to see more of the model and prevent cropping
        }}
        gl={{ antialias: true, alpha: true }}
        shadows
        onCreated={(state) => {
          state.gl.setClearColor('#000000', 0);
          // Look at offset position to match model shift
          state.camera.lookAt(MODEL_X_OFFSET, 0, 0);
        }}
      >
        {/* Enhanced Lighting Setup - Much Brighter */}
        <ambientLight intensity={2.0} />
        
        {/* Main directional light (sun) - blue */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={3.0}
          color="#D2DCFF" // Blue color
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill light from opposite side - blue */}
        <directionalLight position={[-5, 3, -5]} intensity={2.0} color="#EBEFFF" />
        
        {/* Rim light for edge definition with blue */}
        <pointLight position={[0, 5, -8]} intensity={3.0} color="#F3EAF9" />
        
        {/* Accent light from above with blue */}
        <pointLight position={[0, 10, 0]} intensity={2.5} color="#fff" />
        
        {/* Additional blue fill light */}
        <pointLight position={[-3, 4, 3]} intensity={2.0} color="#3a80d2" />
        
        {/* Blue accent light */}
        <pointLight position={[3, 4, 3]} intensity={1.8} color="#F3EAF9" />
        
        {/* Environment removed to prevent warm yellow/orange reflections - using only blue lights for cool tones */}

        {/* Vehicle Model */}
        <VehicleModel />

        {/* OrbitControls with default angles */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.5}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={false}
          target={[MODEL_X_OFFSET, 0, 0]}
          // These control the startup view:
          defaultPolarAngle={DEFAULT_POLAR}
          defaultAzimuthAngle={DEFAULT_AZIMUTH}
        />
      </Canvas>
    </div>
  );
}

export default Vehicle3D;
