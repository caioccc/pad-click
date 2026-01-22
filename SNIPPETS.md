# 🧩 Snippets Úteis para Expansão do App

## 🎚️ Adicionar Controle de Volume

### Modificar `audioService.ts`

```typescript
// Adicionar propriedades
private padVolume: Tone.Volume | null = null;
private clickVolume: Tone.Volume | null = null;

// No método initialize()
this.padVolume = new Tone.Volume(-10).toDestination();
this.padPanner = new Tone.Panner(-1).connect(this.padVolume);

this.clickVolume = new Tone.Volume(-10).toDestination();
this.clickPanner = new Tone.Panner(1).connect(this.clickVolume);

// Novos métodos
setPadVolume(db: number) {
  if (this.padVolume) {
    this.padVolume.volume.value = db;
  }
}

setClickVolume(db: number) {
  if (this.clickVolume) {
    this.clickVolume.volume.value = db;
  }
}
```

### Adicionar no `Home.tsx`

```typescript
const [padVolume, setPadVolume] = useState(-10);
const [clickVolume, setClickVolume] = useState(-10);

// No JSX
<IonItem>
  <IonLabel>Volume PAD (L): {padVolume} dB</IonLabel>
</IonItem>
<IonItem>
  <IonRange
    min={-40}
    max={0}
    value={padVolume}
    onIonChange={e => {
      const val = e.detail.value as number;
      setPadVolume(val);
      audioService.setPadVolume(val);
    }}
  />
</IonItem>
```

## 📊 Visualizador de Forma de Onda

### Adicionar ao `audioService.ts`

```typescript
import * as Tone from 'tone';

private waveform: Tone.Waveform | null = null;

// No initialize()
this.waveform = new Tone.Waveform(256);
Tone.Destination.connect(this.waveform);

getWaveformData(): Uint8Array {
  return this.waveform?.getValue() || new Uint8Array(256);
}
```

### Componente `Waveform.tsx`

```typescript
import React, { useRef, useEffect } from 'react';
import { audioService } from '../services/audioService';

const Waveform: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      const data = audioService.getWaveformData();

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let i = 0; i < data.length; i++) {
        const x = (i / data.length) * width;
        const y = ((data[i] + 128) / 256) * height;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} width={400} height={100} />;
};

export default Waveform;
```

## 💾 Exportar/Importar Músicas

### Adicionar ao `MusicList.tsx`

```typescript
const exportMusics = () => {
  const musics = storageService.getAllMusics();
  const data = JSON.stringify(musics, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'minhas-musicas.json';
  a.click();

  URL.revokeObjectURL(url);
};

const importMusics = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const musics = JSON.parse(e.target?.result as string);
      musics.forEach((m: any) => {
        storageService.createMusic({
          name: m.name,
          tone: m.tone,
          bpm: m.bpm
        });
      });
      loadMusics();
    } catch (err) {
      alert('Erro ao importar arquivo');
    }
  };
  reader.readAsText(file);
};

// No JSX
<IonButton onClick={exportMusics}>Exportar</IonButton>
<input
  type="file"
  accept=".json"
  onChange={importMusics}
  style={{ display: 'none' }}
  id="import-input"
/>
<IonButton onClick={() => document.getElementById('import-input')?.click()}>
  Importar
</IonButton>
```

## 🎨 Dark Mode

### Criar `useTheme.ts`

```typescript
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(prefersDark.matches);

    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    prefersDark.addEventListener('change', listener);

    return () => prefersDark.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  return { isDark, setIsDark };
};
```

### Usar no `App.tsx`

```typescript
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const { isDark, setIsDark } = useTheme();

  // ...resto do código
};
```

## 🔔 Notificações

### Adicionar Capacitor Local Notifications

```bash
npm install @capacitor/local-notifications
npx cap sync
```

### Uso no código

```typescript
import { LocalNotifications } from '@capacitor/local-notifications';

const scheduleMetronomeReminder = async () => {
  await LocalNotifications.schedule({
    notifications: [
      {
        title: "Hora de Ensaiar!",
        body: "Não esqueça do seu ensaio hoje às 19h",
        id: 1,
        schedule: { at: new Date(Date.now() + 1000 * 60 * 60) }, // 1 hora
        sound: undefined,
        attachments: undefined,
        actionTypeId: "",
        extra: null
      }
    ]
  });
};
```

## 📱 Compartilhar Música

### Adicionar Capacitor Share

```bash
npm install @capacitor/share
npx cap sync
```

### Uso

```typescript
import { Share } from '@capacitor/share';

const shareMusic = async (music: Music) => {
  await Share.share({
    title: music.name,
    text: `Confira esta música: ${music.name} - Tom: ${music.tone} - BPM: ${music.bpm}`,
    dialogTitle: 'Compartilhar Música',
  });
};
```

## 🎵 Detecção de BPM (Tap Tempo)

### Componente `TapTempo.tsx`

```typescript
import React, { useState } from 'react';
import { IonButton } from '@ionic/react';

const TapTempo: React.FC<{ onBpmDetected: (bpm: number) => void }> = ({ onBpmDetected }) => {
  const [taps, setTaps] = useState<number[]>([]);

  const handleTap = () => {
    const now = Date.now();
    const newTaps = [...taps, now].slice(-4); // últimos 4 taps
    setTaps(newTaps);

    if (newTaps.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }

      const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
      const bpm = Math.round(60000 / avgInterval);

      if (bpm >= 40 && bpm <= 220) {
        onBpmDetected(bpm);
      }
    }
  };

  const reset = () => setTaps([]);

  return (
    <div>
      <IonButton onClick={handleTap} size="large">
        TAP para BPM
      </IonButton>
      <IonButton onClick={reset} size="small" fill="clear">
        Reset
      </IonButton>
    </div>
  );
};

export default TapTempo;
```

## 🎼 Presets de Músicas Populares

### Adicionar ao `storageService.ts`

```typescript
export const MUSIC_PRESETS = [
  { name: "Oceans (Where Feet May Fail)", tone: "D" as Tone, bpm: 72 },
  { name: "Goodness of God", tone: "C" as Tone, bpm: 120 },
  { name: "Way Maker", tone: "G" as Tone, bpm: 138 },
  { name: "Great Are You Lord", tone: "F" as Tone, bpm: 74 },
  { name: "10,000 Reasons", tone: "A" as Tone, bpm: 73 },
];

export const loadPresets = () => {
  const existing = storageService.getAllMusics();
  if (existing.length === 0) {
    MUSIC_PRESETS.forEach(preset => {
      storageService.createMusic(preset);
    });
  }
};
```

## 🔊 Análise de Frequência (FFT)

### Adicionar ao `audioService.ts`

```typescript
private fft: Tone.FFT | null = null;

// No initialize()
this.fft = new Tone.FFT(256);
Tone.Destination.connect(this.fft);

getFrequencyData(): Float32Array {
  return this.fft?.getValue() || new Float32Array(256);
}
```

### Visualizador FFT

```typescript
const FrequencyVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      const data = audioService.getFrequencyData();

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      const barWidth = width / data.length;

      data.forEach((value, i) => {
        const barHeight = ((value + 140) / 140) * height;
        const x = i * barWidth;
        const y = height - barHeight;

        ctx.fillStyle = `hsl(${(i / data.length) * 360}, 100%, 50%)`;
        ctx.fillRect(x, y, barWidth - 1, barHeight);
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} width={400} height={150} />;
};
```

## 💾 Cache de Áudio

### Service Worker (public/sw.js)

```javascript
const CACHE_NAME = 'pad-metronome-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/audio/pad_C.mp3',
  '/audio/pad_Cs.mp3',
  // ... todos os arquivos
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

## 🎯 Timer/Countdown

### Componente `PracticeTimer.tsx`

```typescript
const PracticeTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>{formatTime(seconds)}</h2>
      <IonButton onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pausar' : 'Iniciar'}
      </IonButton>
      <IonButton onClick={() => { setSeconds(0); setIsActive(false); }}>
        Reset
      </IonButton>
    </div>
  );
};
```

---

💡 **Dica**: Copie e cole estes snippets conforme necessário para expandir seu app!