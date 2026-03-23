import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function Player({ mode, mobileControls }) {
    const { camera } = useThree()
    const direction = new THREE.Vector3()

    const keys = useRef({
        up: false,
        down: false,
        left: false,
        right: false
    })

    const wheelDelta = useRef(0)
    const touchLastPos = useRef({ x: 0, y: 0 })
    const rotation = useRef({ x: camera.rotation.x, y: camera.rotation.y })

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase()
            if (key === 'arrowup' || key === 'w') keys.current.up = true
            if (key === 'arrowdown' || key === 's') keys.current.down = true
            if (key === 'arrowleft' || key === 'a') keys.current.left = true
            if (key === 'arrowright' || key === 'd') keys.current.right = true
        }

        const handleKeyUp = (e) => {
            const key = e.key.toLowerCase()
            if (key === 'arrowup' || key === 'w') keys.current.up = false
            if (key === 'arrowdown' || key === 's') keys.current.down = false
            if (key === 'arrowleft' || key === 'a') keys.current.left = false
            if (key === 'arrowright' || key === 'd') keys.current.right = false
        }

        const handleTouchStart = (e) => {
            if (e.touches.length === 1) {
                touchLastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
            }
        }

        const handleTouchMove = (e) => {
            if (mode === "inspect") return
            if (e.touches.length === 1) {
                const target = e.target
                if (target.closest('.joystick-container') || target.closest('.joystick-stick')) return

                const touch = e.touches[0]
                const dx = touch.clientX - touchLastPos.current.x
                const dy = touch.clientY - touchLastPos.current.y

                rotation.current.y += dx * 0.006
                rotation.current.x += dy * 0.006
                rotation.current.x = THREE.MathUtils.clamp(rotation.current.x, -Math.PI / 3, Math.PI / 3)

                touchLastPos.current = { x: touch.clientX, y: touch.clientY }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        window.addEventListener('touchstart', handleTouchStart)
        window.addEventListener('touchmove', handleTouchMove)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchmove', handleTouchMove)
        }
    }, [mode])

    useFrame(() => {
        if (mode === "inspect") return

        // Apply rotation
        camera.rotation.y = rotation.current.y
        camera.rotation.x = rotation.current.x

        direction.set(0, 0, 0)

        if (keys.current.up) direction.z -= 1
        if (keys.current.down) direction.z += 1
        if (keys.current.left) direction.x -= 1
        if (keys.current.right) direction.x += 1

        direction.z += mobileControls.z
        direction.x += mobileControls.x

        if (direction.length() > 0) {
            direction.normalize()
            direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), camera.rotation.y)
            const speed = 0.15
            camera.position.add(direction.multiplyScalar(speed))
        }

        camera.position.x = THREE.MathUtils.clamp(camera.position.x, -11, 11)
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, -11, 11)

        const dist = Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2)
        if (dist > 11.5) {
            camera.position.x *= 11.5 / dist
            camera.position.z *= 11.5 / dist
        }
    })

    return null
}