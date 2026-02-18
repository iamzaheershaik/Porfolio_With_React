import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function ParticleField({ count = 2500 }) {
    const ref = useRef()

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 25
            pos[i * 3 + 1] = (Math.random() - 0.5) * 25
            pos[i * 3 + 2] = (Math.random() - 0.5) * 25
        }
        return pos
    }, [count])

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * 0.02
            ref.current.rotation.y = state.clock.elapsedTime * 0.03
        }
    })

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00f0ff"
                size={0.02}
                sizeAttenuation
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    )
}
