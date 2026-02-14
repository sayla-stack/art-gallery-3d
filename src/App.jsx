import { Canvas } from '@react-three/fiber';
import Gallery from './pages/Gallery';

function App(){
  return (
    <Canvas camera={{ position: [0,2,8], fov: 60}} shadows> 
      <color attach="background" args={['#e8e6e1']} /> 
      <Gallery />
    </Canvas>
  )
}

export default App
