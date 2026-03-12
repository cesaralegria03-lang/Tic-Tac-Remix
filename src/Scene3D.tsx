import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Float, ContactShadows, RoundedBox, useTexture, Decal } from '@react-three/drei'
import { Physics, useSphere, useBox } from '@react-three/cannon'

// 1. PASTILLA CON FÍSICA E IMPULSO
function PhysicalPill({ position, color, isMixing }: { position: [number, number, number], color: string, isMixing: boolean }) {
  const [ref, api] = useSphere(() => ({
    mass: 1.2,
    position,
    args: [0.15], 
    restitution: 0.6, 
    friction: 0.1,
  }))

  // Efecto de "Remix": Cuando isMixing es true, lanzamos las pastillas hacia arriba
  useEffect(() => {
    if (isMixing) {
      api.velocity.set(
        (Math.random() - 0.5) * 2, // Pequeño impulso lateral
        4,                         // Impulso fuerte hacia arriba
        (Math.random() - 0.5) * 2
      )
    }
  }, [isMixing, api])

  return (
    <mesh ref={ref as any} castShadow>
      <capsuleGeometry args={[0.09, 0.22, 10, 20]} /> 
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
    </mesh>
  )
}

// 2. PAREDES INVISIBLES (Contenedor)
function BoxContainer() {
  useBox(() => ({ type: 'Static', position: [0, -1.15, 0], args: [1.5, 0.1, 0.8] })) 
  useBox(() => ({ type: 'Static', position: [0, 1.15, 0], args: [1.5, 0.1, 0.8] }))  
  useBox(() => ({ type: 'Static', position: [-0.75, 0, 0], args: [0.1, 2.3, 0.8] })) 
  useBox(() => ({ type: 'Static', position: [0.75, 0, 0], args: [0.1, 2.3, 0.8] }))  
  useBox(() => ({ type: 'Static', position: [0, 0, -0.4], args: [1.5, 2.3, 0.1] }))  
  useBox(() => ({ type: 'Static', position: [0, 0, 0.4], args: [1.5, 2.3, 0.1] }))   
  return null
}

function TicTacLabels({ url }: { url: string }) {
  const labelTexture = useTexture(url)
  return (
    <>
      <Decal position={[0, -0.18, 0.405]} rotation={[0, 0, 0]} scale={[1.2, 2.4, 0.1]}>
        <meshStandardMaterial map={labelTexture} transparent polygonOffset polygonOffsetUnits={-4} />
      </Decal>
      <Decal position={[0, 1.12, 0.415]} rotation={[0, 0, 0]} scale={[0.6, 0.25, 0.2]}>
        <meshStandardMaterial map={labelTexture} transparent polygonOffset polygonOffsetUnits={-4} />
      </Decal>
    </>
  )
}

function Lid() {
  return (
    <mesh position={[0, 1.12, 0]}>
      <RoundedBox args={[1.52, 0.25, 0.82]} radius={0.05}>
        <meshStandardMaterial color="white" roughness={0.4} />
      </RoundedBox>
    </mesh>
  )
}

export default function Scene3D({ color, isMixing, activePills, labelTexture, currentFlavor }: any) {
  const fruitColors = ['#FFD700', '#FF6347', '#32CD32', '#FF69B4'];

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />

          <Physics gravity={[0, -9.81, 0]}> 
              <Float speed={isMixing ? 3 : 1} rotationIntensity={0.5} floatIntensity={isMixing ? 2 : 0.5}>
                <group>
                  <RoundedBox args={[1.5, 2.3, 0.8]} radius={0.1}>
                    <meshPhysicalMaterial 
                      color={color} transparent opacity={0.3} transmission={0.98} 
                      roughness={0.15} ior={1.2} thickness={0.5}
                    />
                    <TicTacLabels url={labelTexture} />
                  </RoundedBox>
                  <Lid />
                  <BoxContainer />
  
                  {activePills.map((id: string, index: number) => {
  // LÓGICA DE COLOR DINÁMICO
  let pillColor = 'white'; // Por defecto blancas (Menta/Fresa)

  if (currentFlavor === 'frutas') {
    pillColor = fruitColors[index % fruitColors.length];
  } else if (currentFlavor === 'naranja') {
    pillColor = color; // Aquí usa el naranja (#ffb347) que viene por props
  } else if (currentFlavor === 'fresa'){
    pillColor = color; 
  }

  return (
    <PhysicalPill 
      key={id} 
      isMixing={isMixing}
      position={[Math.random() * 0.4 - 0.2, 0.5, 0]} 
      color={pillColor} // Aplicamos el color decidido arriba
    />
  );
})}
                </group>
              </Float>
            </Physics>

          <ContactShadows position={[0, -2.2, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}