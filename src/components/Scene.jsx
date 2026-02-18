import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useControls, folder } from 'leva'
import FloatingShapes from './FloatingShapes'
import ParticleField from './ParticleField'

export default function Scene() {
    const { rotationSpeed, primaryColor, secondaryColor, bloomIntensity, bloomThreshold } = useControls('3D Scene', {
        'Shapes': folder({
            rotationSpeed: { value: 1, min: 0, max: 3, step: 0.1 },
            primaryColor: '#00f0ff',
            secondaryColor: '#8b5cf6',
        }),
        'Bloom': folder({
            bloomIntensity: { value: 0.8, min: 0, max: 3, step: 0.1 },
            bloomThreshold: { value: 0.2, min: 0, max: 1, step: 0.05 },
        }),
    })

    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
            dpr={[1, 2]}
        >
            <Suspense fallback={null}>
                {/* Lighting */}
                <ambientLight intensity={0.15} />
                <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
                <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
                <pointLight position={[5, -2, 3]} intensity={0.2} color="#00f0ff" />

                {/* 3D Elements */}
                <FloatingShapes
                    rotationSpeed={rotationSpeed}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                />
                <ParticleField count={2000} />

                {/* Post Processing */}
                <EffectComposer>
                    <Bloom
                        intensity={bloomIntensity}
                        luminanceThreshold={bloomThreshold}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                </EffectComposer>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.3}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
                <Preload all />
            </Suspense>
        </Canvas>
    )
}
