import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Gallery from './pages/Gallery';

function App(){
  return (
    <Canvas camera={{ position: [0,1.6,5], fov: 60}} shadows> 
      <color attach="background" args={['#e8e6e1']} /> 
      <OrbitControls enableZoom={true} />
      <Gallery />
    </Canvas>
  )
}

export default App
