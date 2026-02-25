import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function CameraController({ targetPosition, mode }) {
  const { camera, gl } = useThree()
  const zoomOffset = useRef(1.8)

  useFrame(() => {
    if (mode !== "inspect") return

    const angle = Math.atan2(targetPosition.current.z, targetPosition.current.x)
    const radius = Math.sqrt(
      targetPosition.current.x ** 2 + targetPosition.current.z ** 2
    )

    const lookTarget = new THREE.Vector3(0, 2.8, 0)
    const camX = Math.cos(angle) * (radius + zoomOffset.current)
    const camZ = Math.sin(angle) * (radius + zoomOffset.current)

    camera.position.lerp(new THREE.Vector3(camX, 2.5, camZ), 0.08)
    camera.lookAt(lookTarget)
  })

  useEffect(() => {
    const handleWheel = (e) => {
      if (mode !== "inspect") return
      zoomOffset.current += e.deltaY * 0.005
      zoomOffset.current = THREE.MathUtils.clamp(zoomOffset.current, 0.5, 5)
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [mode])

  return null
}  