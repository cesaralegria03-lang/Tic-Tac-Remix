export interface FlavorConfig {
  id: string;
  name: string;
  color: string;
  bgImage: string;
  label3D: string;
  pillImage: string; // La imagen de la pastilla para la UI de la izquierda
  sounds: {
    id: string;
    label: string;
    file: string;
  }[];
}

export const FLAVORS: Record<string, FlavorConfig> = {
  menta: {
    id: 'menta',
    name: 'Menta',
    color: '#d0f5e6', // Un verde menta muy claro para el plástico
    bgImage: '/backgrounds/bg_menta.jpg',
    label3D: '/labels/label_menta.png',
    pillImage: '/ui/pill_menta.png',
    sounds: [
      { id: 'kick', label: 'Kick', file: 'kick.wav' },
      { id: 'snare', label: 'Snare', file: 'snare.wav' },
      { id: 'hats', label: 'Hats', file: 'hats.wav' },
      { id: 'shaker', label: 'Shaker', file: 'shaker.wav' },
      { id: 'piano', label: 'Piano', file: 'piano.wav' },
      { id: 'guitar', label: 'Guitar', file: 'guitar.wav' },
      { id: 'vox', label: 'Vox', file: 'vox.wav' },
      { id: 'fx', label: 'FX', file: 'fx.wav' },
    ]
  },
  naranja: {
    id: 'naranja',
    name: 'Naranja',
    color: '#ffb347', // El tono naranja de tu mockup
    bgImage: '/backgrounds/bg_naranja.jpg',
    label3D: '/labels/label_naranja.png',
    pillImage: '/ui/pill_naranja.png',
    sounds: [
      { id: 'kick', label: 'Kick', file: 'kick.wav' },
      { id: 'snare', label: 'Snare', file: 'snare.wav' },
      { id: 'hats', label: 'Hats', file: 'hats.wav' },
      { id: 'shaker', label: 'Shaker', file: 'shaker.wav' },
      { id: 'piano', label: 'Piano', file: 'piano.wav' },
      { id: 'guitar', label: 'Guitar', file: 'guitar.wav' },
      { id: 'vox', label: 'Vox', file: 'vox.wav' },
      { id: 'fx', label: 'FX', file: 'fx.wav' },
    ]
  },
  fruta: {
    id: 'fruta',
    name: 'Fruta',
    color: '#ff6b6b', // Un rojo intenso para representar la fruta
    bgImage: '/backgrounds/bg_fruta.jpg',
    label3D: '/labels/label_fruta.png',
    pillImage: '/ui/pill_fruta.png',
    sounds: [
      { id: 'kick', label: 'Kick', file: 'kick.wav' },
      { id: 'snare', label: 'Snare', file: 'snare.wav' },
      { id: 'hats', label: 'Hats', file: 'hats.wav' },
      { id: 'shaker', label: 'Shaker', file: 'shaker.wav' },
      { id: 'piano', label: 'Piano', file: 'piano.wav' },
      { id: 'guitar', label: 'Guitar', file: 'guitar.wav' },
      { id: 'vox', label: 'Vox', file: 'vox.wav' },
      { id: 'fx', label: 'FX', file: 'fx.wav' },
    ]
  },
  fresa: {
    id: 'fresa',
    name: 'Fresa',
    color: '#ff4757', // Un rosa vibrante para representar la fresa
    bgImage: '/backgrounds/bg_fresa.jpg',
    label3D: '/labels/label_fresa.png',
    pillImage: '/ui/pill_fresa.png',
    sounds: [
      { id: 'kick', label: 'Kick', file: 'kick.wav' },
      { id: 'snare', label: 'Snare', file: 'snare.wav' },
      { id: 'hats', label: 'Hats', file: 'hats.wav' },
      { id: 'shaker', label: 'Shaker', file: 'shaker.wav' },
      { id: 'piano', label: 'Piano', file: 'piano.wav' },
      { id: 'guitar', label: 'Guitar', file: 'guitar.wav' },
      { id: 'vox', label: 'Vox', file: 'vox.wav' },
      { id: 'fx', label: 'FX', file: 'fx.wav' },
    ]
  },
};