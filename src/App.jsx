import { Canvas } from '@react-three/fiber';
import Gallery from './pages/Gallery';

function App(){
  return (
    <Canvas camera={{ position: [10, 4, 18], fov: 55}} shadows gl={{ toneMappingExposure: 1.2}} > 
      <color attach="background" args={['#e8e6e1']} /> 
      <Gallery />
    </Canvas>
  )
}

export default App  