import { useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function CameraController({ targetPosition }){
 const { camera } = useThree()

 useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.05)
    camera.lookAt(0, 2, -8)
 })

 return null
}