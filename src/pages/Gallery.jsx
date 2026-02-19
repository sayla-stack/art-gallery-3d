import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from "@react-three/drei"
import Lights from "../components/Light"
import GalleryRoom from "../components/GalleryRoom"
import ArtFrame from "../components/ArtFrame"
import CameraController from "../components/CameraController"
import Player from "../components/Player"
import FirstPersonControls  from '../components/FirstPersonControls'

const pillarSections = [
    {id: 1, title: "About Me", image:"/artworks/van-gogh.jpg" },
    {id:2, title: "Resume", image:"/artworks/van-gogh.jpg" },
]

const wallSections = [
    {id:1, title: "Education", image:"/artworks/van-gogh.jpg" },
    {id:2, title: "Experience", image:"/artworks/van-gogh.jpg" },
    {id:3, title: "Community", image:"/artworks/van-gogh.jpg" },
    {id:4, title: "Projects", image:"/artworks/van-gogh.jpg" },
    {id:5, title: "Certificates", image:"/artworks/van-gogh.jpg" },
    {id:6, title: "Social Media", image:"/artworks/van-gogh.jpg" }
]

export default function Gallery() {
const targetPosition = useRef(new THREE.Vector3(0, 2, 8))
const [mode, setMode] = useState("explore") 
// const radius = 6
const pillarRadius = 4
const wallRadius = 11.9
const [ activeSection, setActiveSection ] = useState(null)
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

    const handleInspect = (angle, radius, sectionData) => {
        if(mode === "explore") {
            setMode("inspect")

            const inspectX = Math.cos(angle) * (radius - 1.5)
            const inspectZ = Math.cos(angle) * (radius - 1.5)

            targetPosition.current.set(inspectX, 2.5, inspectZ)
            setActiveSection(sectionData)
        }else {
            setMode("explore")
            targetPosition.current.set(0,2,8)
            setActiveSection(null)
        }
}

const aboutIndex = pillarSections.findIndex(s => s.title === "About Me")
const aboutAngle = (aboutIndex / pillarSections.length) * Math.PI * 2
const aboutTextRadius = pillarRadius + 0.05
const aboutX = Math.cos(aboutAngle) * aboutTextRadius
const aboutZ = Math.sin(aboutAngle) * aboutTextRadius

const textRef = useRef()
useFrame((state) => {
    if(textRef.current) {
        textRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime) * 0.05
    }
})
return (
<>
    <Lights />
    <GalleryRoom />
 
    <Html
        
            position={[aboutX, 3, aboutZ]} 
            rotation={[0, -aboutAngle + Math.PI / 2, 0]}
            transform
        >
            <div className="pillarText">
                About Me
                <div className="subText">Main Exhibition</div>
            </div>
            
    </Html>

  
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
                onInspect={() => handleInspect(angle, pillarRadius, section)} 
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
                onInspect={() => handleInspect(angle, wallRadius, section)}
            />
        )
    })}
         
</>
)
}