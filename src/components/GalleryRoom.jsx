import { MeshStandardMaterial } from "three";
export default function GalleryRoom() {
  return (
    <group>

      {/* FLOOR */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[12, 30]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* CEILING */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 5, 0]}
      >
        <planeGeometry args={[12, 30]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* WALL LEFT */}
      <mesh position={[-6, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 5, 30]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>

      {/* WALL RIGHT */}
      <mesh position={[6, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 5, 30]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>

      {/* WALL FRONT */}
      <mesh position={[0, 2.5, -15]} castShadow receiveShadow>
        <boxGeometry args={[12, 5, 0.3]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
    
      <mesh position={[0, 2.5, 15]}>
        <boxGeometry args={[12, 5, 0.3]}/>
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
    </group>
  )
}
