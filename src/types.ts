export type Tone = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export interface Music {
  id: string;
  name: string;
  tone: Tone;
  bpm: number;
}

export const TONES: Tone[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const TONE_TO_FILE: Record<Tone, string> = {
  'C': 'pad_C.mp3',
  'C#': 'pad_Cs.mp3',
  'D': 'pad_D.mp3',
  'D#': 'pad_Ds.mp3',
  'E': 'pad_E.mp3',
  'F': 'pad_F.mp3',
  'F#': 'pad_Fs.mp3',
  'G': 'pad_G.mp3',
  'G#': 'pad_Gs.mp3',
  'A': 'pad_A.mp3',
  'A#': 'pad_As.mp3',
  'B': 'pad_B.mp3'
};