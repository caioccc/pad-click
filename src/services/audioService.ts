import * as Tone from 'tone';
import { Tone as ToneType, TONE_TO_FILE } from '../types';

class AudioService {
  private padPlayer: Tone.Player | null = null;
  private padPanner: Tone.Panner | null = null;
  private clickSynth: Tone.Synth | null = null;
  private clickPanner: Tone.Panner | null = null;
  private currentTone: ToneType | null = null;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    await Tone.start();

    // Setup PAD (canal esquerdo)
    this.padPanner = new Tone.Panner(-1).toDestination();

    // Setup Click (canal direito)
    this.clickPanner = new Tone.Panner(1);
    this.clickPanner.pan.value = 1; // garantir canal direito
    this.clickPanner.toDestination();
    this.clickSynth = new Tone.Synth({
      oscillator: { type: 'square' },
      envelope: {
        attack: 0.001,
        decay: 0.01,
        sustain: 0,
        release: 0.01
      }
    }).connect(this.clickPanner);

    this.isInitialized = true;
  }

  async loadPad(tone: ToneType) {
    await this.initialize();

    if (this.currentTone === tone && this.padPlayer) {
      return;
    }

    // Stop e dispose do player anterior
    if (this.padPlayer) {
      this.padPlayer.stop();
      this.padPlayer.dispose();
    }

    const fileName = TONE_TO_FILE[tone];
    const audioPath = `/audio/${fileName}`;

    this.padPlayer = new Tone.Player({
      url: audioPath,
      loop: true,
      fadeIn: 0.1,
      fadeOut: 0.1
    }).connect(this.padPanner!);

    this.currentTone = tone;

    return new Promise<void>((resolve, reject) => {
      this.padPlayer!.load(audioPath).then(() => resolve()).catch(reject);
    });
  }

  async playPad() {
    await this.initialize();
    if (this.padPlayer && this.padPlayer.loaded) {
      this.padPlayer.start();
    }
  }

  pausePad() {
    if (this.padPlayer) {
      this.padPlayer.stop();
    }
  }

  setBPM(bpm: number) {
    Tone.Transport.bpm.value = bpm;
  }

  private metronomeEvent: number | null = null;

  playMetronome(bpm: number) {
    this.setBPM(bpm);

    if (this.metronomeEvent !== null) {
      Tone.Transport.clear(this.metronomeEvent);
    }

    this.metronomeEvent = Tone.Transport.scheduleRepeat((time) => {
      this.clickSynth?.triggerAttackRelease('C6', '16n', time);
    }, '4n');

    Tone.Transport.start();
  }

  pauseMetronome() {
    if (this.metronomeEvent !== null) {
      Tone.Transport.clear(this.metronomeEvent);
      this.metronomeEvent = null;
    }
    Tone.Transport.stop();
  }

  stopAll() {
    this.pausePad();
    this.pauseMetronome();
  }

  isPadPlaying(): boolean {
    return this.padPlayer?.state === 'started';
  }

  isMetronomePlaying(): boolean {
    return Tone.Transport.state === 'started';
  }

  dispose() {
    this.stopAll();
    if (this.padPlayer) {
      this.padPlayer.dispose();
    }
    if (this.clickSynth) {
      this.clickSynth.dispose();
    }
    if (this.padPanner) {
      this.padPanner.dispose();
    }
    if (this.clickPanner) {
      this.clickPanner.dispose();
    }
  }
}

export const audioService = new AudioService();