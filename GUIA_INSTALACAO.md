# 📱 Guia de Instalação - PAD + Metrônomo App

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **Node.js** (versão 16 ou superior)
   - Download: https://nodejs.org/

2. **Ionic CLI** (global)
   ```bash
   npm install -g @ionic/cli
   ```

3. **Para Android** (opcional, se quiser compilar):
   - Android Studio
   - Java JDK 11 ou superior
   - Configurar variáveis de ambiente (ANDROID_HOME, etc)

## 🚀 Passo a Passo

### 1️⃣ Criar o Projeto

```bash
# Criar pasta do projeto
mkdir pad-metronome-app
cd pad-metronome-app

# Copiar todos os arquivos fornecidos para a pasta
```

### 2️⃣ Estrutura de Pastas

Crie a seguinte estrutura:

```
pad-metronome-app/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── capacitor.config.ts
├── index.html
├── .gitignore
├── README.md
├── public/
│   └── audio/           ← VOCÊ PRECISA ADICIONAR OS ARQUIVOS AQUI
│       ├── pad_C.mp3
│       ├── pad_Cs.mp3
│       ├── pad_D.mp3
│       ├── pad_Ds.mp3
│       ├── pad_E.mp3
│       ├── pad_F.mp3
│       ├── pad_Fs.mp3
│       ├── pad_G.mp3
│       ├── pad_Gs.mp3
│       ├── pad_A.mp3
│       ├── pad_As.mp3
│       └── pad_B.mp3
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── types.ts
    ├── components/
    │   └── MusicCard.tsx
    ├── pages/
    │   ├── Home.tsx
    │   ├── MusicList.tsx
    │   └── MusicForm.tsx
    └── services/
        ├── audioService.ts
        └── storageService.ts
```

### 3️⃣ Instalar Dependências

```bash
npm install
```

Aguarde a instalação de todos os pacotes.

### 4️⃣ Adicionar Arquivos de Áudio PAD

⚠️ **IMPORTANTE**: O app precisa de 12 arquivos de áudio PAD (um para cada tom).

Opções para obter os arquivos:

**Opção A - Usar samples prontos:**
- Procure por "drone samples", "pad samples" ou "synth pad loops"
- Renomeie conforme a lista acima (pad_C.mp3, pad_Cs.mp3, etc)

**Opção B - Gerar com sintetizador:**
- Use um DAW (Ableton, FL Studio, etc)
- Crie um drone/pad sustentado em cada nota
- Exporte como MP3 ou WAV
- Coloque em `public/audio/`

**Opção C - Temporário (para testar):**
- Use o mesmo arquivo para todos os tons (só para ver o app funcionando)
- Copie um arquivo de áudio qualquer 12 vezes com nomes diferentes

### 5️⃣ Rodar no Navegador (Desenvolvimento)

```bash
npm run dev
```

Ou:

```bash
ionic serve
```

Acesse: http://localhost:8100

### 6️⃣ Testar o App

1. Abra o app no navegador
2. Selecione um tom (C, D, E, etc)
3. Ajuste o BPM
4. Clique em "Play PAD" e "Play Metrônomo"
5. Use fones de ouvido para ouvir a separação estéreo

## 📱 Build para Android

### Primeiro Build (Setup Inicial)

```bash
# 1. Build do projeto web
npm run build

# 2. Adicionar plataforma Android
npx cap add android

# 3. Sincronizar arquivos
npx cap sync
```

### Builds Subsequentes

Sempre que fizer mudanças no código:

```bash
# 1. Rebuild
npm run build

# 2. Sincronizar
npx cap sync

# 3. Abrir no Android Studio
npx cap open android
```

No Android Studio:
- Aguarde o Gradle sync
- Conecte um dispositivo Android ou inicie um emulador
- Clique em **Run** (botão play verde)

## 🔧 Solução de Problemas

### Erro: "Cannot find module 'tone'"
```bash
npm install tone
```

### Erro: "Cannot find module 'uuid'"
```bash
npm install uuid
npm install --save-dev @types/uuid
```

### Áudio não toca no Android
- Verifique se os arquivos estão em `public/audio/`
- Rode `npx cap sync` novamente
- Verifique permissões de áudio no AndroidManifest.xml

### PAD não faz loop
- Verifique se o arquivo de áudio não está corrompido
- Teste com outro formato (WAV ao invés de MP3)

### Metrônomo fora de tempo
- Isso pode ocorrer em dispositivos lentos
- Considere usar Web Audio API Worker se necessário

## 📊 Testando a Separação Estéreo

1. Use **fones de ouvido** (essencial!)
2. Toque PAD e Metrônomo juntos
3. Você deve ouvir:
   - PAD no **ouvido esquerdo**
   - Click no **ouvido direito**

Se ambos estiverem nos dois ouvidos, verifique o código do `audioService.ts`.

## 🎯 Próximos Passos

Depois que tudo estiver funcionando:

1. Teste o CRUD de músicas
2. Adicione suas músicas favoritas
3. Use o botão Play na lista para carregar automaticamente
4. Personalize cores e estilo no CSS (opcional)

## 📞 Comandos Úteis

```bash
# Desenvolvimento
npm run dev
ionic serve

# Build
npm run build

# Capacitor
npx cap sync
npx cap open android
npx cap open ios

# Limpar cache (se necessário)
rm -rf node_modules
npm install
```

## ✅ Checklist Final

Antes de testar, confirme:

- [ ] Node.js instalado
- [ ] `npm install` executado com sucesso
- [ ] 12 arquivos de áudio em `public/audio/`
- [ ] App abre sem erros no navegador
- [ ] PAD toca ao clicar Play
- [ ] Metrônomo toca ao clicar Play
- [ ] Separação estéreo funciona (usar fones!)
- [ ] CRUD de músicas salva e carrega

---

🎉 **Pronto!** Seu app PAD + Metrônomo está funcionando!

Se tiver problemas, revise este guia ou verifique os logs do console do navegador (F12).