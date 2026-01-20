# 🔧 Troubleshooting - Soluções de Problemas Comuns

## 🚨 Problemas de Instalação

### Erro: `npm install` falha

**Problema**: Dependências não instalam corretamente.

**Soluções**:
```bash
# 1. Limpar cache do npm
npm cache clean --force

# 2. Remover node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install

# 3. Usar versão LTS do Node
nvm install --lts
nvm use --lts
npm install
```

### Erro: `Cannot find module '@ionic/react'`

**Problema**: Ionic não foi instalado.

**Solução**:
```bash
npm install @ionic/react @ionic/react-router
```

## 🎵 Problemas de Áudio

### PAD não toca

**Diagnóstico**:
```javascript
// Abra o console do navegador (F12) e digite:
console.log(audioService.isPadPlaying())
console.log(Tone.context.state)
```

**Soluções**:

1. **Contexto de áudio não iniciado**
```typescript
// Adicione um botão para inicializar manualmente
<IonButton onClick={async () => await Tone.start()}>
  Iniciar Áudio
</IonButton>
```

2. **Arquivo não encontrado**
- Verifique se os arquivos estão em `public/audio/`
- Verifique os nomes dos arquivos (pad_C.mp3, não Pad_C.mp3)
- Veja o console para erros 404

3. **Formato de áudio não suportado**
- Converta para MP3 (mais compatível)
- Tente WAV como alternativa

### Metrônomo não toca

**Problema**: Click não é ouvido.

**Soluções**:

1. **Volume muito baixo**
```typescript
// No audioService.ts, ajuste o synth:
this.clickSynth = new Tone.MembraneSynth({
  pitchDecay: 0.05,
  octaves: 10,
  oscillator: { type: 'sine' },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0.3,
    release: 0.5
  }
}).connect(this.clickPanner);

// Aumente o volume
this.clickSynth.volume.value = 0; // em dB
```

2. **Transport não iniciado**
```javascript
// Verifique no console
console.log(Tone.Transport.state)
// Deve ser "started"
```

### Loop do PAD tem gap/click

**Problema**: Áudio não faz loop suave.

**Soluções**:

1. **Processar arquivo no Audacity**:
   - Abra o áudio
   - Selecione todo o arquivo
   - Efeitos → Crossfade Loop
   - Exportar

2. **Ajustar no código**:
```typescript
this.padPlayer = new Tone.Player({
  url: audioPath,
  loop: true,
  fadeIn: 0.01,  // fade in muito curto
  fadeOut: 0.01  // fade out muito curto
}).connect(this.padPanner!);
```

### Separação estéreo não funciona

**Problema**: PAD e click em ambos os ouvidos.

**Diagnóstico**:
- Use **fones de ouvido** (essencial!)
- Teste com música estéreo conhecida

**Soluções**:

1. **Verificar valores de pan**:
```typescript
// No audioService.ts
console.log(this.padPanner.pan.value)    // deve ser -1
console.log(this.clickPanner.pan.value)  // deve ser +1
```

2. **Forçar stereo**:
```typescript
// No initialize()
await Tone.start();
Tone.context.destination.channelCount = 2;
Tone.context.destination.channelCountMode = 'explicit';
```

## 📱 Problemas Android

### Build Android falha

**Erro**: Gradle build failed

**Soluções**:

1. **Limpar projeto**:
```bash
cd android
./gradlew clean
cd ..
npx cap sync
```

2. **Atualizar Gradle**:
```bash
# Em android/build.gradle, atualize:
classpath 'com.android.tools.build:gradle:8.0.0'
```

3. **Verificar Java**:
```bash
java -version
# Deve ser JDK 11 ou superior
```

### App crasha ao abrir no Android

**Problema**: App fecha imediatamente.

**Diagnóstico**:
```bash
# Ver logs
adb logcat | grep chromium
```

**Soluções**:

1. **Permissões faltando**:
```xml
<!-- Em android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
```

2. **Limpar e reconstruir**:
```bash
cd android
./gradlew clean
cd ..
npm run build
npx cap sync
```

### Áudio não toca no Android (mas funciona no browser)

**Problema**: Silence no dispositivo.

**Soluções**:

1. **Verificar modo silencioso** do dispositivo

2. **Adicionar configuração no index.html**:
```html
<script>
  document.addEventListener('deviceready', async () => {
    await Tone.start();
  });
</script>
```

3. **Usar formato OGG**:
- Converta MP3 para OGG
- Renomeie para .ogg
- Tone.js detecta automaticamente

## 💾 Problemas de Storage

### localStorage não persiste

**Problema**: Músicas somem ao recarregar.

**Soluções**:

1. **Modo privado/incógnito**:
- Use aba normal do navegador
- localStorage não funciona em modo privado

2. **Quota excedida**:
```typescript
try {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(musics));
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    alert('Armazenamento cheio. Remova músicas antigas.');
  }
}
```

3. **Usar Capacitor Storage**:
```bash
npm install @capacitor/preferences
```

```typescript
import { Preferences } from '@capacitor/preferences';

const setMusics = async (musics: Music[]) => {
  await Preferences.set({
    key: 'musics',
    value: JSON.stringify(musics)
  });
};

const getMusics = async (): Promise<Music[]> => {
  const { value } = await Preferences.get({ key: 'musics' });
  return value ? JSON.parse(value) : [];
};
```

### Música não carrega ao clicar Play

**Problema**: Nada acontece ao clicar Play na lista.

**Diagnóstico**:
```javascript
// Em MusicList.tsx
const handlePlay = (music: Music) => {
  console.log('Playing:', music);
  history.push('/', { music: { ...music, autoplay: true } });
};
```

**Solução**:

Verificar se o state está sendo passado:
```typescript
// Em Home.tsx
useEffect(() => {
  console.log('Location state:', location.state);
  if (location.state?.music) {
    // ...
  }
}, [location]);
```

## 🐛 Problemas de UI

### Componentes Ionic não aparecem

**Problema**: Tela em branco.

**Soluções**:

1. **Importar CSS do Ionic**:
```typescript
// No App.tsx, certifique-se de ter:
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
```

2. **Verificar IonPage**:
```typescript
// Toda página deve estar envolta em IonPage
<IonPage>
  <IonHeader>...</IonHeader>
  <IonContent>...</IonContent>
</IonPage>
```

### Navegação não funciona

**Problema**: Botões não trocam de tela.

**Solução**:
```typescript
// Use useHistory do react-router-dom
import { useHistory } from 'react-router-dom';

const MyComponent = () => {
  const history = useHistory();

  return (
    <IonButton onClick={() => history.push('/musics')}>
      Ir para Músicas
    </IonButton>
  );
};
```

## ⚡ Problemas de Performance

### App lento no Android

**Problema**: Lag ao tocar áudio.

**Soluções**:

1. **Comprimir arquivos de áudio**:
- Use MP3 com bitrate 192kbps ou menos
- Reduza tamanho dos arquivos

2. **Pre-carregar áudio**:
```typescript
// No Home.tsx, useEffect:
useEffect(() => {
  TONES.forEach(tone => {
    audioService.loadPad(tone);
  });
}, []);
```

3. **Reduzir qualidade do Tone.js**:
```typescript
Tone.context.latencyHint = 'playback'; // menos preciso, mais leve
```

### Metrônomo impreciso

**Problema**: BPM varia.

**Soluções**:

1. **Aumentar prioridade do Transport**:
```typescript
Tone.context.latencyHint = 'interactive';
Tone.context.lookAhead = 0.1;
```

2. **Usar Web Worker** (avançado):
```typescript
// Criar worker separado para metrônomo
const metronomeWorker = new Worker('/metronome-worker.js');
```

## 🔍 Debug Geral

### Como ver logs no navegador

1. Abra o DevTools (F12)
2. Vá para Console
3. Adicione logs:
```typescript
console.log('PAD playing:', audioService.isPadPlaying());
console.log('Metronome playing:', audioService.isMetronomePlaying());
console.log('Current tone:', selectedTone);
console.log('Current BPM:', bpm);
```

### Como ver logs no Android

```bash
# Terminal 1: rodar app
npx cap run android -l

# Terminal 2: filtrar logs
adb logcat | grep -i chromium

# Ou ver todos os logs:
adb logcat
```

### Resetar app completamente

```bash
# 1. Limpar build
rm -rf dist android ios .capacitor

# 2. Limpar node_modules
rm -rf node_modules package-lock.json

# 3. Reinstalar
npm install

# 4. Rebuild
npm run build
npx cap add android
npx cap sync
```

## 📞 Ainda com problemas?

### Checklist final:

- [ ] Node.js versão 16+
- [ ] Arquivos de áudio em `public/audio/`
- [ ] `npm install` sem erros
- [ ] `npm run dev` funciona
- [ ] Console sem erros (F12)
- [ ] Fones de ouvido para testar estéreo
- [ ] Dispositivo Android com USB debug ativo

### Informações úteis para pedir ajuda:

1. Versão do Node: `node -v`
2. Versão do npm: `npm -v`
3. Sistema operacional
4. Mensagem de erro completa
5. Passos para reproduzir o problema

---

💡 **Dica**: Sempre verifique o console primeiro! 90% dos problemas mostram erros lá.