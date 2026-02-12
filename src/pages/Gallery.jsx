import { useRef, useState } from 'react'
import * as THREE from 'three'
import Lights from "../components/Light";
import GalleryRoom from "../components/GalleryRoom";
import ArtFrame from "../components/ArtFrame";
import { OrbitControls } from "@react-three/drei"
import CameraController from "../components/CameraController"

export default function Gallery() {
const targetPosition = useRef(new THREE.Vector3(0, 2, 5))
const [zoomed, setZoomed] = useState(false)
const artworks = [-5, -2, 1, 4]

return (
<>
    <Lights />
    <GalleryRoom />
    <CameraController targetPosition={targetPosition} />

    {artworks.map((x, i) => (
    <ArtFrame key={i} position={[x, 2.5, -7.8]} image="/artworks/van-gogh.jpg" 
    onInspect={()=> { setZoomed(!zoomed)
        if(!zoomed) {
        targetPosition.current.set(x, 2.5, -5)
        } else {
        targetPosition.current.set(0, 2, 5)
        }}} castShadow/>
    ))}                 

    <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />
</>
)}