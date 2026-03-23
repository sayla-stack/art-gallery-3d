import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Gallery from './pages/Gallery';
import Joystick from './components/Joystick';

function App() {
  const [mode, setMode] = useState("explore");
  const [mobileControls, setMobileControls] = useState({ x: 0, z: 0 });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 2.5, 8], fov: 55 }}
        shadows
        gl={{ toneMappingExposure: 1.2 }}
      >
        <color attach="background" args={['#e8e6e1']} />
        <Gallery
          mode={mode}
          setMode={setMode}
          mobileControls={mobileControls}
        />
      </Canvas>

      {/* Persistent Mobile HUD */}
      {mode === "explore" && (
        <Joystick
          onChange={(ctrl) => setMobileControls({ x: ctrl.x, z: ctrl.y })}
        />
      )}
    </div>
  );
}

export default App  