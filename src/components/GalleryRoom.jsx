import * as THREE from "three";

export default function GalleryRoom() {
  return (
    <group>
      {/* FLOOR */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#f3eadb" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* CEILING */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 8, 0]}
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#f3eadb" />
      </mesh>


       {/* Central Pillar */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[4, 4, 6, 64]} />
        <meshStandardMaterial color="#f3eadb" roughness={0.9} />
      </mesh>

      {/* WALL */}
      <mesh position={[0, 4, 0]} receiveShadow>
        <cylinderGeometry args={[12, 12, 8, 128, 1, true]} />
        <meshStandardMaterial 
          color="#f3eadb" 
          side={THREE.BackSide} 
          roughness={0.9} 
          metalness={0.05}/>
      </mesh>

    </group>
  )
}