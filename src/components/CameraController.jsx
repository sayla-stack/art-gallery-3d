import { useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function CameraController({ targetPosition, mode }){
 const { camera } = useThree()

 useFrame(() => {
   if(mode !== "inspect") return
    camera.position.lerp(targetPosition.current, 0.05)
   
 })

 return null
}  