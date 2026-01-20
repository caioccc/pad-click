# 🎵 Guia de Arquivos de Áudio PAD

## 📁 Arquivos Necessários

O app precisa de **12 arquivos de áudio** correspondentes aos 12 tons da escala cromática:

```
public/audio/
├── pad_C.mp3     → Dó
├── pad_Cs.mp3    → Dó sustenido (C#)
├── pad_D.mp3     → Ré
├── pad_Ds.mp3    → Ré sustenido (D#)
├── pad_E.mp3     → Mi
├── pad_F.mp3     → Fá
├── pad_Fs.mp3    → Fá sustenido (F#)
├── pad_G.mp3     → Sol
├── pad_Gs.mp3    → Sol sustenido (G#)
├── pad_A.mp3     → Lá
├── pad_As.mp3    → Lá sustenido (A#)
└── pad_B.mp3     → Si
```

## 🎹 O que é um PAD?

Um PAD é um som sustentado e contínuo, geralmente:
- Sem ataque percussivo
- Volume constante
- Sem envelope de decaimento
- Harmonicamente simples
- Ideal para tocar em loop

Exemplos: drones, notas sustentadas de órgão, sintetizadores ambientes.

## 🔍 Onde Conseguir os Arquivos

### Opção 1: Sites de Samples Gratuitos

**Freesound.org** (gratuito, Creative Commons)
- https://freesound.org/
- Busque por: "pad drone C", "synth pad D", etc
- Baixe samples de boa qualidade
- Renomeie conforme necessário

**Splice** (alguns gratuitos)
- https://splice.com/sounds/free
- Procure por "pad samples" ou "drone loops"

**Looperman**
- https://www.looperman.com/
- Categoria: Pads/Strings

### Opção 2: Gerar com Sintetizadores Online

**Tone.js Synth** (no navegador)
- Você pode usar o próprio Tone.js para gerar
- Criar um script que exporta áudios

**Vital** (sintetizador gratuito)
- Download: https://vital.audio/
- Crie um preset de PAD sustentado
- Toque cada nota e grave

**Surge XT** (sintetizador gratuito)
- Download: https://surge-synthesizer.github.io/
- Muitos presets de PAD inclusos

### Opção 3: Gerar com DAW

Se você tem um DAW (Ableton, FL Studio, Reaper, etc):

1. Abra o DAW
2. Adicione um sintetizador (Serum, Massive, ou nativo)
3. Escolha ou crie um preset de PAD
4. Para cada nota (C, C#, D, etc):
   - Toque a nota por 10-20 segundos
   - Exporte como WAV ou MP3
5. Renomeie os arquivos conforme a lista acima

### Opção 4: Usar Frequências Puras (Simples)

Para um teste rápido, você pode gerar tons puros:

**Audacity** (gratuito):
1. Baixe: https://www.audacityteam.org/
2. Gerar → Tom...
3. Configure:
   - Forma de onda: Sine (senoidal)
   - Frequência: veja tabela abaixo
   - Amplitude: 0.8
   - Duração: 10 segundos
4. Repita para cada nota
5. Exporte como MP3

**Tabela de Frequências (Oitava 4)**:
```
C  = 261.63 Hz
C# = 277.18 Hz
D  = 293.66 Hz
D# = 311.13 Hz
E  = 329.63 Hz
F  = 349.23 Hz
F# = 369.99 Hz
G  = 392.00 Hz
G# = 415.30 Hz
A  = 440.00 Hz
A# = 466.16 Hz
B  = 493.88 Hz
```

## 📝 Recomendações de Qualidade

Para melhor resultado:

- **Formato**: MP3 (320kbps) ou WAV
- **Duração**: 5-15 segundos (para loop perfeito)
- **Volume**: Normalizado (-3dB de pico)
- **Loop**: Sem clicks no ponto de repetição
- **Tom**: Afinado corretamente (use um afinador)

## 🔄 Loop Perfeito

Para evitar clicks ao fazer loop:

1. **Fade In/Out**: Use fade muito curto no início/fim
2. **Crossfade**: Configure loop crossfade no áudio
3. **Audacity**:
   - Selecione início e fim
   - Efeitos → Crossfade Loop

## 🎼 Alternativa: Usar Apenas 1 Arquivo

Para testar rapidamente, você pode:

1. Criar/baixar apenas **pad_C.mp3**
2. Copiar esse arquivo 12 vezes:
   ```bash
   cp pad_C.mp3 pad_Cs.mp3
   cp pad_C.mp3 pad_D.mp3
   # ... etc
   ```
3. O app funcionará, mas todos os tons soarão igual

⚠️ Isso é **apenas para teste**. Para uso real, cada arquivo deve ter o tom correto.

## 🔗 Links Úteis

- **Teoria Musical**: https://pt.wikipedia.org/wiki/Escala_cromática
- **Calculadora de Frequências**: https://pages.mtu.edu/~suits/notefreqs.html
- **Tone Generator Online**: https://onlinetonegenerator.com/
- **Splice Sounds**: https://splice.com/sounds/packs/genre/pad/

## 📊 Exemplo de Estrutura

Depois de adicionar os arquivos:

```
public/
└── audio/
    ├── pad_C.mp3   (3.2 MB)
    ├── pad_Cs.mp3  (3.1 MB)
    ├── pad_D.mp3   (3.3 MB)
    ├── pad_Ds.mp3  (3.0 MB)
    ├── pad_E.mp3   (3.2 MB)
    ├── pad_F.mp3   (3.1 MB)
    ├── pad_Fs.mp3  (3.4 MB)
    ├── pad_G.mp3   (3.2 MB)
    ├── pad_Gs.mp3  (3.1 MB)
    ├── pad_A.mp3   (3.3 MB)
    ├── pad_As.mp3  (3.2 MB)
    └── pad_B.mp3   (3.0 MB)
```

## ✅ Verificação

Após adicionar os arquivos:

1. Verifique se todos os 12 arquivos estão presentes
2. Teste cada tom no app
3. Verifique se o loop é suave
4. Ajuste volume se necessário

---

**Dica**: Se você é músico ou produtor, criar seus próprios PADs pode dar um toque único ao app! 🎹