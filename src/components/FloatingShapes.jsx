import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'

function GlowingMesh({ geometry, position, color, speed = 1, distort = 0.3, scale = 1, wireframe = false }) {
    const ref = useRef()

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x += 0.003 * speed
            ref.current.rotation.y += 0.005 * speed
            ref.current.rotation.z += 0.002 * speed
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={ref} position={position} scale={scale}>
                {geometry}
                {wireframe ? (
                    <meshStandardMaterial
                        color={color}
                        wireframe
                        emissive={color}
                        emissiveIntensity={0.3}
                        transparent
                        opacity={0.6}
                    />
                ) : (
                    <MeshDistortMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.15}
                        roughness={0.2}
                        metalness={0.8}
                        distort={distort}
                        speed={2}
                    />
                )}
            </mesh>
        </Float>
    )
}

export default function FloatingShapes({ rotationSpeed = 1, primaryColor = '#00f0ff', secondaryColor = '#8b5cf6' }) {
    return (
        <group>
            {/* Main large torus */}
            <GlowingMesh
                geometry={<torusGeometry args={[1.2, 0.4, 32, 64]} />}
                position={[3, 1, -2]}
                color={primaryColor}
                speed={rotationSpeed * 0.8}
                distort={0.2}
                scale={1}
            />

            {/* Icosahedron */}
            <GlowingMesh
                geometry={<icosahedronGeometry args={[1, 1]} />}
                position={[-3.5, -1.5, -3]}
                color={secondaryColor}
                speed={rotationSpeed * 0.6}
                distort={0.4}
                scale={0.9}
            />

            {/* Octahedron wireframe */}
            <GlowingMesh
                geometry={<octahedronGeometry args={[0.8, 0]} />}
                position={[4, -2.5, -1]}
                color="#ec4899"
                speed={rotationSpeed * 1.2}
                wireframe
                scale={0.7}
            />

            {/* Small dodecahedron */}
            <GlowingMesh
                geometry={<dodecahedronGeometry args={[0.6, 0]} />}
                position={[-2, 2.5, -4]}
                color={primaryColor}
                speed={rotationSpeed}
                distort={0.3}
                scale={0.6}
            />

            {/* Torus knot */}
            <GlowingMesh
                geometry={<torusKnotGeometry args={[0.5, 0.15, 100, 16]} />}
                position={[1, -3, -5]}
                color={secondaryColor}
                speed={rotationSpeed * 0.5}
                distort={0.15}
                scale={0.8}
            />

            {/* Wireframe sphere */}
            <GlowingMesh
                geometry={<sphereGeometry args={[0.7, 16, 16]} />}
                position={[-4.5, 0.5, -2]}
                color="#f97316"
                speed={rotationSpeed * 0.7}
                wireframe
                scale={0.6}
            />
        </group>
    )
}
