import * as Tone from 'tone';
import { useState, useRef } from 'react';

interface SoundConfig {
  id: string;
  label: string;
}

interface FlavorData {
  bpm: number;
  color: string;
  bgImage: string;
  label3D: string;
  pillImage: string;
  sounds: SoundConfig[];
}

export const FLAVOR_CONFIG: Record<string, FlavorData> = {
  menta: { 
    bpm: 120, color: '#3EB489', bgImage: '/backgrounds/bg_menta.jpg',
    label3D: '/labels/label_menta.png', pillImage: '/ui/pill_menta.png',
    sounds: [
      { id: 'bass', label: 'bass' }, { id: 'claps', label: 'claps' },
      { id: 'fx', label: 'fx' }, { id: 'hihats', label: 'hihats' },
      { id: 'kick', label: 'kick' }, { id: 'lead', label: 'lead' },
      { id: 'percs', label: 'percs' }, { id: 'synth', label: 'synth' }
    ] 
  },
  naranja: { 
    bpm: 102, color: '#ffb347', bgImage: '/backgrounds/bg_naranja.jpg',
    label3D: '/labels/label_naranja.png', pillImage: '/ui/pill_naranja.png',
    sounds: [
      { id: 'bass', label: 'bass' }, { id: 'chords', label: 'chords' },
      { id: 'drums', label: 'drums' }, { id: 'fx', label: 'fx' },
      { id: 'lead', label: 'lead' }, { id: 'pad', label: 'pad' },
      { id: 'percs', label: 'percs' }, { id: 'synths', label: 'synths' }
    ]
  },
  frutas: {
    bpm: 108, color: '#ff6b6b', bgImage: '/backgrounds/bg_frutas.jpg',
    label3D: '/labels/label_frutas.png', pillImage: '/ui/pill_fruta.png',
    sounds: [
      { id: 'bass', label: 'bass' }, { id: 'drums', label: 'drums' },
      { id: 'fill', label: 'fill' }, { id: 'fx', label: 'fx' },
      { id: 'gtrs', label: 'guitars' }, { id: 'percs', label: 'percs' },
      { id: 'piano', label: 'piano' }, { id: 'trompetas', label: 'trompetas' }
    ]
  },
  fresa: {
    bpm: 120, color: '#ff4d4d', bgImage: '/backgrounds/bg_fresa.jpg',
    label3D: '/labels/label_fresa.png', pillImage: '/ui/pill_fresa.png',
    sounds: [
      { id: 'bass', label: 'bass' }, { id: 'chords', label: 'chords' },
      { id: 'fill', label: 'fill' }, { id: 'hats', label: 'hats' },
      { id: 'fx', label: 'fx' }, { id: 'kick', label: 'kick' },
      { id: 'percs', label: 'percs' }
    ]
  },
};

export const useTicTacEngine = () => {
  const [currentFlavor, setCurrentFlavor] = useState<string>('menta');
  const [activePills, setActivePills] = useState<string[]>([]);
  const [bpm, setBpm] = useState<number>(110);
  const playersRef = useRef<Tone.Players | null>(null);

  const updateBpm = (val: number) => {
    setBpm(val);
    Tone.getTransport().bpm.rampTo(val, 0.1);

  // 2. Ajustamos la velocidad de reproducción de cada track
  // El cálculo es: Nuevo BPM / BPM Original del sabor
  if (playersRef.current) {
    const originalBpm = FLAVOR_CONFIG[currentFlavor].bpm;
    const ratio = val / originalBpm;

    // Recorremos todos los reproductores activos
    FLAVOR_CONFIG[currentFlavor].sounds.forEach((s) => {
      const p = playersRef.current?.player(s.id);
      if (p) {
        // Esto acelera o ralentiza el audio sin cambiar el tono (pitch)
        p.playbackRate = ratio;
      }
    });
  }
  };

  const initFlavor = async (flavor: string) => {
    if (Tone.getContext().state !== 'running') await Tone.start();
    
    Tone.getTransport().stop();
    Tone.getTransport().cancel();
    if (playersRef.current) playersRef.current.dispose();

    const config = FLAVOR_CONFIG[flavor];
    const soundPaths: Record<string, string> = {};
    
    config.sounds.forEach((s: SoundConfig) => {
      soundPaths[s.id] = `/sounds/${flavor}/${s.id}.mp3`;
    });

    playersRef.current = new Tone.Players(soundPaths, () => {
      config.sounds.forEach((s: SoundConfig) => {
        const p = playersRef.current?.player(s.id);
        if (p) {
          p.loop = true;
          p.volume.value = -Infinity;
          p.sync().start(0);
        }
        const ratio = config.bpm / config.bpm; // Al inicio es 1, pero por si acaso
  config.sounds.forEach(s => {
    const p = playersRef.current?.player(s.id);
    if (p) p.playbackRate = ratio;
  });
      });
      Tone.getTransport().bpm.value = config.bpm;
      Tone.getTransport().start();
    }).toDestination();

    setCurrentFlavor(flavor);
    setBpm(config.bpm);
    setActivePills([]);
  };

  const togglePill = (pillId: string) => {
    if (!playersRef.current || !playersRef.current.has(pillId)) {
        console.error(`El sonido ${pillId} no existe en este sabor`);
        return;
    }
    const player = playersRef.current.player(pillId);
    
    if (activePills.includes(pillId)) {
      player.volume.rampTo(-Infinity, 0.4);
      setActivePills((prev: string[]) => prev.filter(id => id !== pillId));
    } else {
      player.volume.rampTo(0, 0.4);
      setActivePills((prev: string[]) => [...prev, pillId]);
    }
  };

  return { currentFlavor, initFlavor, togglePill, activePills, bpm, updateBpm, FLAVOR_CONFIG };
};