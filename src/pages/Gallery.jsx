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
import { section } from "../data/section"
import ResumePanel from '../components/ResumePanel'

const pillarSections = [
    {id:1, title: "About Me", image:"/artworks/van-gogh.jpg" },
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
const pillarRadius = 4
const wallRadius = 11.9
const [ activeSection, setActiveSection ] = useState(null)

const getSectionData = (id) => {
    return section.find(s => s.id === id)
}
useEffect(() => {
  console.log(activeSection)
}, [activeSection])
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
        if(mode !== "explore") return

        setMode("inspect")

        const offset = 1.8
        const frameX = Math.cos(angle) * radius
        const frameZ = Math.sin(angle) * radius

        const inspectX = frameX + Math.cos(angle) * offset
        const inspectZ = frameZ + Math.sin(angle) * offset

        targetPosition.current.set(inspectX, 2.5, inspectZ)

        const fullData = getSectionData(sectionData.id)
        setActiveSection(fullData)
}

const aboutIndex = pillarSections.findIndex(s => s.title === "About Me");
const aboutAngle = (aboutIndex / pillarSections.length) * Math.PI * 2;
const aboutTextRadius = pillarRadius + 0.01;
const aboutX = Math.cos(aboutAngle) * aboutTextRadius;
const aboutZ = Math.sin(aboutAngle) * aboutTextRadius;

const textRef = useRef()
const floatingRef = useRef()
useFrame((state) => {
    if(floatingRef.current) {
        floatingRef.current.position.y = -0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.15
        floatingRef.current.lookAt(state.camera.position)
    }
})

const resumeIndex = pillarSections.findIndex(s => s.title === "Resume");
const resumeAngle = (resumeIndex / pillarSections.length) * Math.PI * 2;
const resumeTextRadius = pillarRadius + 0.01;
const resumeX = Math.cos(resumeAngle) * resumeTextRadius;
const resumeZ = Math.sin(resumeAngle) * resumeTextRadius;

const aboutY = 3;
const resumeY = 4;

const resumeRef = useRef(null)
useFrame(() => {
    if(resumeRef.current) {
        const playerPosition = targetPosition.current
        const angleFromPillar = Math.atan2(resumeZ - playerPosition.z, resumeX - playerPosition.x)
        const distance = Math.abs(resumeX - playerPosition.x)

        if(distance < pillarRadius && Math.abs(angleFromPillar) > Math.PI / 2){
            resumeRef.current.visible = false
        } else {
            resumeRef.current.visible = true
        }
    }
})
return (
    <>
        <Lights />
        <GalleryRoom />
        {/* About Me */}
        <group
            ref={textRef}
            position={[aboutX, aboutY, aboutZ]}
            rotation={[0, -aboutAngle + Math.PI / 2, 0]}
        >
            <Html transform >
                <div className="pillarText" >
                    About Me
                </div>      
            </Html>
            <group ref={floatingRef} position={[0, -0.6, 0]}>
                <Html transform >
                    <div className="subText floating">
                        Main Exhibition
                        <br />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-1">
                            <path fillRule="evenodd" d="M9.47 15.28a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 1 0-1.06-1.06L10 13.69 6.28 9.97a.75.75 0 0 0-1.06 1.06l4.25 4.25ZM5.22 6.03l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06L10 8.69 6.28 4.97a.75.75 0 0 0-1.06 1.06Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </Html>
            </group>
        </group>

        {/* Resume */}
        <group
            ref={resumeRef}
            position={[resumeX, resumeY, resumeZ]} 
            rotation={[0, -resumeAngle + Math.PI / 2, 0]}
        >
            <Html transform occlude >
                <div className="pillarText">
                    Resume
                </div>
            </Html>
        </group>

        {/* Camera Controller */}
        <CameraController targetPosition={targetPosition} mode={mode} />
        <Player mode={mode} />
        {mode === "explore" && <FirstPersonControls />}

        {/* About Me */}
        {mode === "inspect" && activeSection?.id === "about" && (
            <Html center scale={0.8}>
                <div className="aboutPanel">
                    <img src={activeSection.content.photo} alt="profile" />
                    <div className="aboutText">
                        <h2>{activeSection.title}</h2>
                        <p>{activeSection.content.description}</p>
                    </div>
                </div>
            </Html>
        )}

        {/* Resume */}
        {mode === "inspect" && activeSection?.type === "file" && (
            <ResumePanel 
                section={activeSection}
                onClose={() => {
                    setMode("explore")
                    setActiveSection(null)
                    targetPosition.current.set(0,2,8)
                }}
                />
        )}

        {/* ArtFrames */}
        {pillarSections.map((section, i) => {
            const angle = (i / pillarSections.length) * Math.PI * 2;
            const x = Math.cos(angle) * pillarRadius;
            const z = Math.sin(angle) * pillarRadius;

            return (
                <ArtFrame
                    key={section.id}
                    position={[x, 2.8, z]}
                    rotation={[0, -angle + Math.PI / 2, 0]}
                    image={section.image}
                    onInspect={() => {
                        if(mode === "explore") {
                            handleInspect(angle, pillarRadius, section)
                        }
                        }}
                />
            );
        })}
        {wallSections.map((section, i) => {
            const angle = (i / wallSections.length) * Math.PI * 2;
            const x = Math.cos(angle) * wallRadius;
            const z = Math.sin(angle) * wallRadius;

            return (
                <ArtFrame 
                    key={section.id}
                    position={[x, 2.5, z]}
                    rotation={[0, -angle - Math.PI / 2 , 0]}
                    image={section.image}
                    onInspect={() => {
                        if(mode === "explore") {
                            handleInspect(angle, wallRadius, section)
                        }
                        }}
                />
            );
        })}
    </>
);
}