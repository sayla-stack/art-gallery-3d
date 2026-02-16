import { useFrame , useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function Player({ mode }) {
    const { camera } = useThree()
    const direction = new THREE.Vector3()

    const keys = useRef({
        up: false,
        down: false,
        left: false,
        right: false
    })

    useEffect(() => {
        const handleKeyDown = (e) => {
            if(e.key === 'ArrowUp') keys.current.up = true
            if(e.key === 'ArrowDown') keys.current.down = true
            if(e.key === 'ArrowLeft') keys.current.left = true
            if(e.key === 'ArrowRight') keys.current.right = true
        }

        const handleKeyUp = (e) => {
            if(e.key === 'ArrowUp') keys.current.up = false
            if(e.key === 'ArrowDown') keys.current.down = false
            if(e.key === 'ArrowLeft') keys.current.left = false
            if(e.key === 'ArrowRight') keys.current.right = false
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    useFrame(() => {
        if(mode === "inspect") return
        direction.set(0,0,0)

        if(keys.current.up) direction.z -= 1
        if(keys.current.down) direction.z += 1
        if(keys.current.left) direction.x -= 1
        if(keys.current.right) direction.x += 1

        direction.normalize()
        direction.applyEuler(camera.rotation)

        camera.position.add(direction.multiplyScalar(0.1))
        camera.position.x = THREE.MathUtils.clamp(camera.position.x, -10, 10)
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, -10, 10)
        const distance = Math.sqrt(
        camera.position.x ** 2 + camera.position.z ** 2
        )

        if (distance > 11.5) {
        camera.position.x *= 11.5 / distance
        camera.position.z *= 11.5 / distance
        }

    })

    return null  
}
