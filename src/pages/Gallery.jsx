import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import Lights from "../components/Light";
import GalleryRoom from "../components/GalleryRoom";
import ArtFrame from "../components/ArtFrame";
import CameraController from "../components/CameraController"
import Player from "../components/Player"
import FirstPersonControls  from '../components/FirstPersonControls';
export default function Gallery() {
const targetPosition = useRef(new THREE.Vector3(0, 2, 5))
const [mode, setMode] = useState("explore") 
const artworks = [-5, -10, -15]

useEffect(() => {
    const handleEsc = (e) => {
        if (e.key === "Escape") {
            setMode("explore")
            targetPosition.current.set(0, 2, 5)
        }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
}, [])

return (
<>
    <Lights />
    <GalleryRoom />
    <CameraController targetPosition={targetPosition} mode={mode} />
    <Player mode={mode}/>
    {mode === "explore" && <FirstPersonControls /> }
    {artworks.map((z, i) => (
       <>
        <ArtFrame 
            key={"left-" + i}
            position={[-5.85, 2.5, z]}
            rotation={[0, Math.PI/2, 0]} 
            image="/artworks/van-gogh.jpg"
            onInspect={() => {
                if(mode === "explore") {
                    setMode("inspect")
                    targetPosition.current.set(-3.5, 2.5, z)
                } else {
                    setMode("explore")
                    targetPosition.current.set(0,2,5)
                }
            }}
            
        />
            <spotLight
                position={[-4.5, 4.5, z]}
                target-position={[-5.7, 2.5, z]}
                angle={0.4}
                intensity={1.2}
            />

        <ArtFrame
            key={"right-" + i}
            position={[5.85, 2.5, z]}
            rotation={[0, -Math.PI/2, 0]} 
            image="/artworks/van-gogh.jpg"
            onInspect={() => {
                if(mode === "explore") {
                    setMode("inspect")
                    targetPosition.current.set(3.5, 2.5, z )
                } else {
                    setMode("explore")
                    targetPosition.current.set(0,2,5)
                }
            }}
            
        />
            <spotLight
                position={[4.5, 4.5, z]}
                angle={0.4}
                intensity={1.2}
            />

            <axesHelper args={[0.5]} position={[0,2,0]} />

       </> 
    ))}                 
</>
)
}