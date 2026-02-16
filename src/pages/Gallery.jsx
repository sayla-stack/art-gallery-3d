import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import Lights from "../components/Light"
import GalleryRoom from "../components/GalleryRoom"
import ArtFrame from "../components/ArtFrame"
import CameraController from "../components/CameraController"
import Player from "../components/Player"
import FirstPersonControls  from '../components/FirstPersonControls'

const pillarSections = [
    {title: "About Me", image:"/artworks/van-gogh.jpg" },
    {title: "Resume", image:"/artworks/van-gogh.jpg" },
]

const wallSections = [
    {title: "Education", image:"/artworks/van-gogh.jpg" },
    {title: "Experience", image:"/artworks/van-gogh.jpg" },
    {title: "Community", image:"/artworks/van-gogh.jpg" },
    {title: "Projects", image:"/artworks/van-gogh.jpg" },
    {title: "Certificates", image:"/artworks/van-gogh.jpg" },
    {title: "Social Media", image:"/artworks/van-gogh.jpg" }
]

export default function Gallery() {
const targetPosition = useRef(new THREE.Vector3(0, 2, 8))
const [mode, setMode] = useState("explore") 
// const radius = 6
const pillarRadius = 4
const wallRadius = 11.9

useEffect(() => {
    const handleEsc = (e) => {
        if (e.key === "Escape") {
            setMode("explore")
            targetPosition.current.set(0, 2, 8)
        }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
    }, [])

    const handleInspect = (angle, radius) => {
        if(mode === "explore") {
            setMode("inspect")

            const inspectX = Math.cos(angle) * (radius - 1.5)
            const inspectZ = Math.cos(angle) * (radius - 1.5)

            targetPosition.current.set(inspectX, 2.5, inspectZ)
        }else {
            setMode("explore")
            targetPosition.current.set(0,2,8)
        }
}

return (
<>
    <Lights />
    <GalleryRoom />
    <CameraController targetPosition={targetPosition} mode={mode} />
    <Player mode={mode}/>
    {mode === "explore" && <FirstPersonControls /> }
    {pillarSections.map((section, i) => {
        const angle = (i / pillarSections.length) * Math.PI * 2
        const x = Math.cos(angle) * pillarRadius
        const z = Math.sin(angle) * pillarRadius

        return (
            <ArtFrame
                key={section.id}
                position={[x, 2.8, z]}
                rotation={[0, -angle + Math.PI / 2, 0]}
                image={section.image}
                onInspect={() => handleInspect(angle, pillarRadius)} 
            />
        )
    })
    }
    {wallSections.map((section, i) => {
        const angle = (i / wallSections.length) * Math.PI * 2
        const x = Math.cos(angle) * wallRadius
        const z = Math.sin(angle) * wallRadius 

        return (
            <ArtFrame 
                key={section.id}
                position={[x, 2.5, z]}
                rotation={[0, -angle - Math.PI /2 , 0]}
                image={section.image}
                onInspect={() => handleInspect(angle, wallRadius)}
            />
        )
    })}
         
</>
)
}