// Lista padrão de músicas para novos usuários
const DEFAULT_MUSICS: Omit<Music, 'id'>[] = [
  { name: 'Digno de tudo', tone: 'D', bpm: 135 }, // SongBPM — D, 135 BPM :contentReference[oaicite:0]{index=0}
  { name: 'Pra sempre', tone: 'G', bpm: 144 },
  { name: 'Diante da cruz', tone: 'D', bpm: 144 },
  { name: 'Jesus, plano perfeito', tone: 'E', bpm: 140 }, // Live (Renascer Praise) :contentReference[oaicite:1]{index=1}
  { name: 'Os reinos se abalam', tone: 'E', bpm: 140 },
  { name: 'Vou seguir com fé', tone: 'G', bpm: 112 },
  { name: 'Deserto', tone: 'D', bpm: 150 },
  { name: 'Oceanos', tone: 'D', bpm: 125 },
  { name: 'Eu te louvarei, meu bom Jesus', tone: 'C', bpm: 120 },
  { name: 'Meu respirar/Meu prazer', tone: 'F', bpm: 127 },
  { name: 'Bondade de Deus', tone: 'D', bpm: 136 },
  { name: 'Filho do Deus Vivo', tone: 'E', bpm: 134 },
  { name: 'Consagração (ao rei dos reis)', tone: 'D', bpm: 120 },
  { name: 'Canção do Apocalipse', tone: 'G', bpm: 123 },
  { name: 'Teu amor não falha', tone: 'C', bpm: 114 },
  { name: 'Eu te Agradeço', tone: 'E', bpm: 106 },
  { name: 'Aguas purificadoras', tone: 'D', bpm: 137 },
  { name: 'Deus dos deuses', tone: 'D', bpm: 150 },
  { name: 'Quão grande é o meu Deus', tone: 'G', bpm: 146 },
  { name: 'Poder pra salvar', tone: 'E', bpm: 150 },
  { name: 'Maravilhosa graça', tone: 'A', bpm: 105 },
  { name: 'Creio que tu és a Cura', tone: 'A', bpm: 156 },
  { name: 'Ousado Amor', tone: 'E', bpm: 111 },
  { name: 'Seja engrandecido', tone: 'E', bpm: 118 },
  { name: 'Hosana', tone: 'E', bpm: 154 },
  { name: 'Quão formoso és', tone: 'G', bpm: 116 },
  { name: 'O que tua glória fez comigo', tone: 'A', bpm: 140 },
  { name: 'Jesus é o caminho', tone: 'E', bpm: 138 },
  { name: 'Quando o vento soprar', tone: 'G', bpm: 126 },
  { name: 'Eu só quero adorar', tone: 'G', bpm: 140 },
  { name: 'Quando o mundo cai ao meu redor', tone: 'C', bpm: 164 },
  { name: 'Em tua presença', tone: 'E', bpm: 156 },
  { name: 'Jesus em tua presença', tone: 'G', bpm: 142 },
  { name: 'Oh quão lindo esse nome é', tone: 'D', bpm: 136 },
  { name: 'Alegria', tone: 'C', bpm: 139 },
  { name: 'Digno é o Senhor', tone: 'D#', bpm: 138 }, // Aline Barros version :contentReference[oaicite:2]{index=2}
  { name: 'Ainda que a figueira', tone: 'A', bpm: 94 },
  { name: 'Escudo', tone: 'D', bpm: 154 },
  { name: 'Maravilhado', tone: 'E', bpm: 140 },
  { name: 'Nada Além do Sangue', tone: 'D', bpm: 144 },
  { name: 'Te encontrar', tone: 'A', bpm: 174 },
  { name: 'Foi na cruz', tone: 'D#', bpm: 139 },
  { name: 'Renova-me', tone: 'D', bpm: 94 },
  { name: 'Porque ele vive', tone: 'G', bpm: 108 },
  { name: 'Como é precioso', tone: 'D#', bpm: 129 },
  { name: 'Ao único', tone: 'C#', bpm: 112 },
  { name: 'Espírito enche minha vida', tone: 'E', bpm: 120 },
  { name: 'Em espírito em verdade', tone: 'D', bpm: 120 },
  { name: 'O Espírito de Deus está aqui', tone: 'G', bpm: 120 },
  { name: 'Vitorioso és', tone: 'A', bpm: 140 },
  { name: 'Eu nasci de novo', tone: 'C', bpm: 144 },
  { name: 'Lugar Seguro', tone: 'F', bpm: 82 },
  { name: 'Nunca foi sobre nós', tone: 'D#', bpm: 124 },
  { name: 'Ao Olhar pra cruz', tone: 'D', bpm: 137 },
  { name: 'Rocha Eterna', tone: 'D', bpm: 144 },
  { name: 'Ruja o leão', tone: 'D#', bpm: 138 },
  { name: 'Grande é o Senhor', tone: 'E', bpm: 127 },
  { name: 'Tu és soberano', tone: 'G', bpm: 128 },
];


function initDefaultMusics() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const withIds = DEFAULT_MUSICS.map(m => ({ id: uuidv4(), ...m }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withIds));
  }
}
import { Music } from '../types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'pad_metronome_musics';

export const storageService = {
  initDefaultMusics,
  getAllMusics: (): Music[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading musics:', error);
      return [];
    }
  },

  getMusicById: (id: string): Music | undefined => {
    const musics = storageService.getAllMusics();
    return musics.find(m => m.id === id);
  },

  createMusic: (music: Omit<Music, 'id'>): Music => {
    const newMusic: Music = {
      id: uuidv4(),
      ...music
    };

    const musics = storageService.getAllMusics();
    musics.push(newMusic);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(musics));

    return newMusic;
  },

  updateMusic: (id: string, updates: Partial<Omit<Music, 'id'>>): Music | null => {
    const musics = storageService.getAllMusics();
    const index = musics.findIndex(m => m.id === id);

    if (index === -1) return null;

    musics[index] = { ...musics[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(musics));

    return musics[index];
  },

  deleteMusic: (id: string): boolean => {
    const musics = storageService.getAllMusics();
    const filtered = musics.filter(m => m.id !== id);

    if (filtered.length === musics.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
};