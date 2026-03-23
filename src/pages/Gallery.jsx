import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from "@react-three/drei"
import Lights from "../components/Light"
import GalleryRoom from "../components/GalleryRoom"
import ArtFrame from "../components/ArtFrame"
import CameraController from "../components/CameraController"
import Player from "../components/Player"
import FirstPersonControls from '../components/FirstPersonControls'
import { section } from "../data/section"
import ResumePanel from "../components/ResumePanel"
import AboutPanel from "../components/AboutPanel"
import TimelinePanel from "../components/TimelinePanel"
import GridPanel from "../components/GridPanel"
import SocialMediaPanel from "../components/SocialMediaPanel"
import Joystick from "../components/Joystick"


const pillarSections = [
    { id: 1, title: "About Me", image: "/artworks/van-gogh.jpg" },
    { id: 2, title: "Resume", image: "/artworks/van-gogh.jpg" },
]

const wallSections = [
    { id: 1, title: "Education", image: "/artworks/van-gogh.jpg" },
    { id: 2, title: "Experience", image: "/artworks/van-gogh.jpg" },
    { id: 3, title: "Community", image: "/artworks/van-gogh.jpg" },
    { id: 4, title: "Projects", image: "/artworks/van-gogh.jpg" },
    { id: 5, title: "Certificates", image: "/artworks/van-gogh.jpg" },
    { id: 6, title: "Social Media", image: "/artworks/van-gogh.jpg" }
]

export default function Gallery({ mode, setMode, mobileControls }) {
    const targetPosition = useRef(new THREE.Vector3(0, 2.5, 8))

    const pillarRadius = 4
    const wallRadius = 11.9
    const [activeSection, setActiveSection] = useState(null)

    const getSectionData = (title) => {
        return section.find(s => s.title === title)
    }
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
        if (mode === "explore") {
            setMode("inspect")

            const offset = 1.8

            const frameX = Math.cos(angle) * radius
            const frameZ = Math.sin(angle) * radius

            const inspectX = frameX + Math.cos(angle) * offset
            const inspectZ = frameZ + Math.sin(angle) * offset

            targetPosition.current.set(inspectX, 2.5, inspectZ)

            // Perbaiki pencarian section dari data
            const fullData = getSectionData(sectionData.title)
            // Jika data dari getSectionData null (karena tidak ada di data/section.js atau beda ID),
            // kita gunakan sectionData fallback (seperti {id: "resume", title: "Resume" ...})
            setActiveSection(fullData || sectionData)
        } else {
            setMode("explore")
            targetPosition.current.set(0, 2, 8)
            setActiveSection(null)
        }
    }

    const aboutIndex = pillarSections.findIndex(s => s.title === "About Me")
    const aboutAngle = (aboutIndex / pillarSections.length) * Math.PI * 2
    const aboutTextRadius = pillarRadius + 0.01
    const aboutX = Math.cos(aboutAngle) * aboutTextRadius
    const aboutZ = Math.sin(aboutAngle) * aboutTextRadius
    const aboutY = 3
    const textRef = useRef()
    const floatingRef = useRef()
    useFrame((state) => {
        if (floatingRef.current) {
            floatingRef.current.position.y = -0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.15
            floatingRef.current.lookAt(state.camera.position)
        }
    })

    const resumeIndex = pillarSections.findIndex(s => s.title === "Resume")
    const resumeAngle = (resumeIndex / pillarSections.length) * Math.PI * 2
    const resumeTextRadius = pillarRadius + 0.01
    const resumeX = Math.cos(resumeAngle) * resumeTextRadius
    const resumeZ = Math.sin(resumeAngle) * resumeTextRadius
    const resumeY = 4
    const resumeRef = useRef(null)
    useFrame(() => {
        if (resumeRef.current) {
            const playerPosition = targetPosition.current
            const angleFromPillar = Math.atan2(resumeZ - playerPosition.z, resumeX - playerPosition.x)
            const distance = Math.abs(resumeX - playerPosition.x)

            if (distance < pillarRadius && Math.abs(angleFromPillar) > Math.PI / 2) {
                resumeRef.current.visible = false
            } else {
                resumeRef.current.visible = true
            }
        }
    })

    const exitInspect = () => {
        setMode("explore")
        targetPosition.current.set(0, 2, 8)
        setActiveSection(null)
    }

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
                <Html transform>
                    <div className="pillarText">
                        About Me
                    </div>
                </Html>
            </group>

            <CameraController targetPosition={targetPosition} mode={mode} />
            <Player mode={mode} mobileControls={mobileControls} />
            <FirstPersonControls makeDefault enabled={mode === "explore"} />

            {/* About Me */}
            {mode === "inspect" && activeSection?.id === "about" && (
                <AboutPanel
                    section={activeSection}
                    onClose={exitInspect}
                />
            )}

            {/* Resume Panel */}
            {mode === "inspect" && activeSection?.id === "resume" && (
                <ResumePanel
                    section={activeSection}
                    onClose={exitInspect}
                />
            )}

            {/* Education/Experience/Community Panel */}
            {mode === "inspect" && (activeSection?.id === "education" || activeSection?.id === "experience" || activeSection?.id === "community") && (
                <TimelinePanel
                    section={activeSection}
                    onClose={exitInspect}
                />
            )}

            {/* Projects/Certificates Panel */}
            {mode === "inspect" && (activeSection?.id === "projects" || activeSection?.id === "certificates") && (
                <GridPanel
                    section={activeSection}
                    onClose={exitInspect}
                />
            )}

            {/* Social Media Panel */}
            {mode === "inspect" && activeSection?.id === "socialMedia" && (
                <SocialMediaPanel
                    section={activeSection}
                    onClose={exitInspect}
                />
            )}

            {/* Resume */}
            <group
                ref={resumeRef}
                position={[resumeX, resumeY, resumeZ]}
                rotation={[0, -resumeAngle + Math.PI / 2, 0]}
                onClick={(e) => {
                    e.stopPropagation()
                    handleInspect(resumeAngle, pillarRadius, getSectionData("Resume"))
                }}
                onPointerOver={() => { document.body.style.cursor = 'pointer' }}
                onPointerOut={() => { document.body.style.cursor = 'default' }}
            >
                <Html transform occlude>
                    <div className="pillarText">
                        Resume
                    </div>
                </Html>
            </group>

            {/* Pillar Center */}
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
                        onInspect={() => {
                            const data = getSectionData(section.title)
                            handleInspect(angle, pillarRadius, data || section)
                        }}
                    />
                )
            })
            }

            {/* Wall */}
            {wallSections.map((section, i) => {
                const angle = (i / wallSections.length) * Math.PI * 2
                const x = Math.cos(angle) * wallRadius
                const z = Math.sin(angle) * wallRadius

                return (
                    <ArtFrame
                        key={section.id}
                        position={[x, 2.5, z]}
                        rotation={[0, -angle - Math.PI / 2, 0]}
                        image={section.image}
                        onInspect={() => handleInspect(angle, wallRadius, section)}
                    />
                )
            })}

        </>
    )
}