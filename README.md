# 🎵 PAD + Metrônomo App

Aplicativo Ionic para tocar PADs contínuos e Metrônomo com separação estéreo.

## 📋 Características

- ✅ Toca PAD em loop contínuo (12 tons: C até B)
- ✅ Metrônomo sincronizado por BPM (40-220)
- ✅ Separação estéreo: PAD (esquerda) + Click (direita)
- ✅ CRUD completo de músicas (localStorage)
- ✅ Play direto da lista de músicas
- ✅ Interface Ionic moderna e responsiva

## 🚀 Como Rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar no navegador
```bash
npm run dev
# ou
ionic serve
```

### 3. Build para Android

#### Primeiro build:
```bash
npm run build
npx cap add android
npx cap sync
```

#### Builds subsequentes:
```bash
npm run build
npx cap sync
npx cap open android
```

No Android Studio, clique em **Run** para compilar e instalar no dispositivo/emulador.

## 📁 Estrutura do Projeto

```
src/
├── App.tsx                 # App principal com rotas
├── main.tsx               # Entry point
├── types.ts               # Tipos TypeScript
├── components/
│   └── MusicCard.tsx      # Card de música na lista
├── pages/
│   ├── Home.tsx           # Player principal
│   ├── MusicList.tsx      # Lista de músicas
│   └── MusicForm.tsx      # Criar/Editar música
└── services/
    ├── audioService.ts    # Lógica de áudio (Tone.js)
    └── storageService.ts  # CRUD localStorage
```

## 🎵 Arquivos de Áudio

⚠️ **IMPORTANTE**: Você precisa adicionar os arquivos de áudio PAD na pasta `public/audio/`:

```
public/
└── audio/
    ├── pad_C.mp3
    ├── pad_Cs.mp3   (C#)
    ├── pad_D.mp3
    ├── pad_Ds.mp3   (D#)
    ├── pad_E.mp3
    ├── pad_F.mp3
    ├── pad_Fs.mp3   (F#)
    ├── pad_G.mp3
    ├── pad_Gs.mp3   (G#)
    ├── pad_A.mp3
    ├── pad_As.mp3   (A#)
    └── pad_B.mp3
```

**Dica**: Você pode usar samples de PAD/drones de qualquer fonte ou criar com sintetizadores.

## 🎛️ Funcionalidades

### Player (Home)
- Seletor de tom (C até B)
- Ajuste de BPM (40-220)
- Botões Play/Pause individuais para PAD e Metrônomo
- Botão Stop Geral

### Lista de Músicas
- Cards com nome, tom e BPM
- Botões: Play, Editar, Remover
- Botão flutuante para criar nova música

### Formulário
- Campos: Nome, Tom, BPM
- Validação básica
- Salva ou atualiza no localStorage

## 🔊 Detalhes de Áudio

- **Tone.js** gerencia todo o áudio
- PAD usa `Tone.Player` em loop
- Metrônomo usa `Tone.MembraneSynth` + `Tone.Transport`
- Panning: -1 (esquerda) para PAD, +1 (direita) para Click
- BPM é ajustável em tempo real

## 📱 Compatibilidade

- ✅ Web (Chrome, Safari, Firefox)
- ✅ Android (Capacitor)
- ⚠️ iOS (requer testes - Tone.js funciona bem no iOS)

## 🛠️ Tecnologias

- Ionic Framework 7
- React 18
- TypeScript
- Tone.js (áudio)
- Capacitor 5
- Vite

## 📝 Notas

1. Os arquivos de áudio PAD **não estão incluídos** - você precisa adicionar seus próprios samples
2. O metrônomo usa síntese (não precisa de arquivo)
3. localStorage persiste dados apenas no dispositivo
4. Para produção, considere adicionar validações extras e tratamento de erros

## 🎯 Próximos Passos Sugeridos

- [ ] Adicionar visualização de forma de onda
- [ ] Implementar presets de músicas
- [ ] Adicionar controle de volume individual
- [ ] Exportar/importar biblioteca de músicas
- [ ] Modo escuro

---

Desenvolvido com ❤️ usando Ionic + React + Tone.js