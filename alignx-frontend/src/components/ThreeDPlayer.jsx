// --- ThreeDPlayer.jsx ---
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Stage } from '@react-three/drei';

function Model({ url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (animations.length > 0) {
      // --- IMPORTANT: Bone Name Fix Logic ---
      animations.forEach((clip) => {
        clip.tracks.forEach((track) => {
          // Agar track ka naam 'mixamorigHips.position' hai, 
          // toh use sirf 'Hips.position' kar do taaki model samajh sake.
          if (track.name.includes('mixamorig')) {
            track.name = track.name.replace('mixamorig', '');
          }
        });
      });

      // Animation Play Karo
      try {
        const action = actions[animations[0].name];
        action.reset().fadeIn(0.5).play();
      } catch (e) {
        console.warn("Animation failed to play:", e);
      }
    }
  }, [actions, animations]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export default function ThreeDPlayer({ modelPath }) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-3xl overflow-hidden relative">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.5, 4], fov: 50 }}>
        {/* Stage automatically handles lights and centering */}
        <Stage environment="city" intensity={0.5} adjustCamera={1.2}>
           <Model url={modelPath} />
        </Stage>
        <OrbitControls makeDefault enablePan={false} />
      </Canvas>
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-cyan-400 border border-cyan-500/30">
        Interactive 3D View ↻
      </div>
    </div>
  );
}