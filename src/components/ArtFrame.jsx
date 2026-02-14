import { useState } from 'react'
import { useTexture } from '@react-three/drei'

export default function ArtFrame({ position, rotation = [0,0,0], onInspect, image }) {
  const [hovered, setHovered] = useState(false)
   const texture = useTexture(image)  

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
    <mesh
        onPointerOver={() => { setHovered(true); document.body.style.cursor='pointer' }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor='default' }}
        onClick={(e)=> { e.stopPropagation(); onInspect() }}
      >
        <boxGeometry args={[1.8, 1.3, 0.15]} />
        <meshStandardMaterial
          color="#3a2a1a"
          emissive={hovered ? '#000000' : '#553311'}
          emissiveIntensity={hovered ? 0.4 : 0}
        />
      </mesh>

      {/* Canvas lukisan */}
    <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[1.4, 0.9]} />
        <meshStandardMaterial map={texture} />
      </mesh>  
    </group>
  )
}
