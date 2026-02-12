import { MeshStandardMaterial } from "three";
export default function GalleryRoom(){
return(
<group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f5f5f5" />
    </mesh>

    <mesh position={[0, 2.5, -8]} receiveShadow>
        <boxGeometry args={[20, 5, 0.3]} />
        <meshStandardMaterial color="#f5f5f5" />
    </mesh>

    <mesh position={[-10, 2.5, 0]}>
        <boxGeometry args={[0.3, 5, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
    </mesh>

   <mesh position={[10, 2.5, 0]}>
    <boxGeometry args={[0.3, 5, 20]} />
    <meshStandardMaterial color="#f0f0f0" />
    </mesh>

</group>
)
}