import { useState, useEffect } from 'react';
import { useTicTacEngine } from './useTicTacEngine';
import './App.css';
import Scene3D from './Scene3D'; 

function App() {
  
  const { 
    currentFlavor, 
    initFlavor, 
    togglePill, 
    activePills, 
    bpm, 
    updateBpm, 
    FLAVOR_CONFIG,
  } = useTicTacEngine();

  const [showWelcome, setShowWelcome] = useState(true);
  const config = FLAVOR_CONFIG[currentFlavor];

  const beatDuration = 60 / bpm; // Segundos por beat

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const flavors = Object.keys(FLAVOR_CONFIG);
      const currentIndex = flavors.indexOf(currentFlavor);

      if (e.key === 'ArrowRight') {
        const next = (currentIndex + 1) % flavors.length;
        initFlavor(flavors[next]);
      } else if (e.key === 'ArrowLeft') {
        const prev = (currentIndex - 1 + flavors.length) % flavors.length;
        initFlavor(flavors[prev]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFlavor, initFlavor, FLAVOR_CONFIG]);

  const handleRemix = () => {
    const currentActive = [...activePills];
    // Tipamos 'id' como string para quitar el error
    currentActive.forEach((id: string) => togglePill(id));

    const allIds = config.sounds.map((s: { id: string }) => s.id);
    const toActivate = allIds.filter(() => Math.random() > 0.6);
    
    if (toActivate.length === 0) {
      toActivate.push(allIds[Math.floor(Math.random() * allIds.length)]);
    }

    toActivate.forEach((id: string) => togglePill(id));
  };

  const stopAllPills = () => {
  // Recorremos solo las que están activas actualmente y las apagamos
  activePills.forEach((id: string) => {
    togglePill(id);
  });
  
};

// EFECTO DE PRE-CARGA DE IMÁGENES
useEffect(() => {
  Object.values(FLAVOR_CONFIG).forEach((flavor: any) => {
    const img = new Image();
    img.src = flavor.bgImage;
  });
}, [FLAVOR_CONFIG]);

  return (
    <div className="app-container" style={{ backgroundImage: `url(${config.bgImage})`,['--beat-duration' as any]: `${beatDuration}s` }}>
      
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-card">
            <div className="welcome-logo">
               <img src="/ui/tictac-remix-logo.png" alt="Logo" />
            </div>
            <h2>¡Activa tu vibe!</h2>
            <p>Selecciona las Tic Tac para crear tu mezcla. Puedes cambiar de sabor en el menú inferior de tu pantalla o con las flechas de tu teclado.</p>
            <button 
              className="start-button" 
              style={{ backgroundColor: config.color }} 
              onClick={() => {
                setShowWelcome(false);
                initFlavor('menta'); // <--- Esto arranca el audio al dar clic
              }}
            >
              EMPEZAR
            </button>
          </div>
        </div>
      )}

      <div className="logo-header">
         <img src="/ui/tictac-remix-logo.png" alt="Tic Tac Remix" className="logo-main" />
      </div>

      <div className="main-layout">
        <div className="controls-panel">
          <div className="pills-grid">
            {/* Tipamos 'sound' e 'index' para quitar los errores rojos */}
            {config.sounds.map((sound: { id: string, label: string }, index: number) => {
              let pillSrc;
              if (currentFlavor === 'frutas') {
                const pillNumber = (index % 4) + 1; 
                pillSrc = `/ui/pill_frutas_${pillNumber}.png`;
              } else {
                pillSrc = config.pillImage;
              }

              return (
                <div 
                  key={sound.id} 
                  className={`pill-item ${activePills.includes(sound.id) ? 'active' : ''}`}
                  onClick={() => togglePill(sound.id)}
                >
                  <img src={pillSrc} alt={sound.label} className="pill-img" />
                  <span className="pill-label">{sound.label}</span>
                </div>
              );
            })}
          </div>

          <div className="circular-controls">
            <div 
              className={`control-circle remix-btn ${activePills.length > 0 ? 'pulse' : ''}`}
              onClick={handleRemix}
            >
              REMIX
            </div>

{/* NUEVO: Botón de Apagar Todo */}
  <div 
    className="control-circle stop-btn"
    onClick={stopAllPills}
    style={{ 
      cursor: 'pointer',
      backgroundColor: activePills.length > 0 ? '#ff4d4d' : '#ccc', // Se pone rojo si hay algo sonando
      fontSize: '12px'
    }}
  >
    OFF
  </div>

            <div className="control-circle bpm-display">
              <button className="bpm-arrow up" onClick={() => updateBpm(Math.min(140, bpm + 1))}>▲</button>
              <div className="bpm-text">
                <span className="bpm-number">{bpm}</span>
                <small>BPM</small>
              </div>
              <button className="bpm-arrow down" onClick={() => updateBpm(Math.max(80, bpm - 1))}>▼</button>
            </div>
          </div>
        </div>

        <div className="scene-container">
          <Scene3D 
            color={config.color} 
            isMixing={activePills.length > 0} 
            activePills={activePills}
            labelTexture={config.label3D}
            currentFlavor={currentFlavor}
          />
        </div>
      </div>

      <footer className="flavor-switcher">
        {Object.keys(FLAVOR_CONFIG).map((f) => (
          <button 
            key={f} 
            onClick={() => initFlavor(f)}
            className={currentFlavor === f ? 'active' : ''}
            style={{ '--flavor-color': (FLAVOR_CONFIG[f] as any).color } as React.CSSProperties}
          />
        ))}
      </footer>
    </div>
  );
}

export default App;