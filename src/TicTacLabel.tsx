import { useTexture, Decal } from '@react-three/drei';

export function TicTacLabel({ url }: { url: string }) {
  const texture = useTexture(url);
  
  return (
    <Decal
      position={[0, 0.65, 0.41]} // Posición: x, y (arriba), z (hacia el frente)
      rotation={[0, 0, 0]}
      scale={[1.4, 0.8, 1]}     // Ajusta el tamaño de la etiqueta aquí
    >
      <meshStandardMaterial
        map={texture}
        transparent={true}
        polygonOffset
        polygonOffsetUnits={-1} // Evita que la textura "parpadee" con la caja
      />
    </Decal>
  );
}