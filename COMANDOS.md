# ⚡ Comandos Rápidos - Referência

## 🚀 Setup Inicial

```bash
# 1. Criar pasta e entrar
mkdir pad-metronome-app && cd pad-metronome-app

# 2. Instalar dependências
npm install

# 3. Criar pasta de áudio
mkdir -p public/audio

# 4. Adicionar arquivos de áudio (manual)
# Copie os 12 arquivos PAD para public/audio/
```

## 💻 Desenvolvimento

```bash
# Rodar servidor de desenvolvimento
npm run dev

# Ou usar Ionic CLI
ionic serve

# Acessa em: http://localhost:8100
```

## 📱 Build Android

### Primeira vez
```bash
# 1. Build do código web
npm run build

# 2. Adicionar plataforma Android
npx cap add android

# 3. Sincronizar
npx cap sync

# 4. Abrir Android Studio
npx cap open android
```

### Builds subsequentes
```bash
npm run build && npx cap sync && npx cap open android
```

## 🔄 Atualizar Código

```bash
# Após fazer mudanças no código:
npm run build
npx cap sync

# Se mudou apenas web (sem native):
npx cap copy
```

## 🧹 Limpeza

```bash
# Limpar node_modules
rm -rf node_modules
npm install

# Limpar build
rm -rf dist

# Limpar Capacitor (recomeçar)
rm -rf android ios .capacitor
npx cap add android
npx cap sync
```

## 📦 Gerenciar Dependências

```bash
# Instalar nova dependência
npm install <package>

# Instalar dependência de desenvolvimento
npm install --save-dev <package>

# Atualizar todas
npm update

# Verificar versões desatualizadas
npm outdated
```

## 🐛 Debug

```bash
# Ver logs do Android
npx cap run android -l

# Ver logs em tempo real
adb logcat | grep chromium

# Inspecionar WebView (Android)
# Chrome: chrome://inspect
```

## 🔧 Capacitor

```bash
# Verificar configuração
npx cap doctor

# Atualizar Capacitor
npm install @capacitor/core@latest @capacitor/cli@latest
npm install @capacitor/android@latest

# Sincronizar tudo
npx cap sync

# Apenas copiar web assets
npx cap copy

# Atualizar plugins nativos
npx cap update
```

## 📊 Informações

```bash
# Ver versão do Ionic
ionic -v

# Ver versão do Capacitor
npx cap -v

# Ver versão do Node
node -v

# Ver package.json
cat package.json
```

## 🎵 Verificar Arquivos de Áudio

```bash
# Listar arquivos de áudio
ls -lh public/audio/

# Deve mostrar 12 arquivos:
# pad_C.mp3, pad_Cs.mp3, ..., pad_B.mp3

# Verificar tamanho total
du -sh public/audio/
```

## 📱 Testar no Dispositivo

```bash
# Via USB (depois de npx cap open android)
# No Android Studio: Run > Run 'app'

# Via linha de comando
npx cap run android --target=<device-id>

# Listar dispositivos conectados
adb devices
```

## 🔨 Build de Produção

```bash
# Build otimizado
npm run build

# Build Android Release (no Android Studio)
# Build > Generate Signed Bundle/APK
# Ou via linha de comando:
cd android
./gradlew assembleRelease
```

## 📝 Git

```bash
# Inicializar repositório
git init
git add .
git commit -m "Initial commit"

# Adicionar remote e push
git remote add origin <url>
git push -u origin main
```

## 🆘 Solução Rápida de Problemas

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Capacitor not found"
```bash
npm install @capacitor/core @capacitor/cli
```

### Erro: Android build falha
```bash
cd android
./gradlew clean
cd ..
npx cap sync
```

### Áudio não toca
1. Verificar arquivos em `public/audio/`
2. Verificar console do navegador (F12)
3. Testar com fones de ouvido
4. Verificar permissões de áudio

### localStorage não persiste
- Normal em modo privado/incógnito
- Limpar cache do navegador
- Verificar console para erros

## 📱 Ionic Serve Options

```bash
# Porta personalizada
ionic serve --port=8200

# Abrir no navegador automaticamente
ionic serve --open

# Lab mode (iOS + Android preview)
ionic serve --lab

# External (acessar de outro dispositivo)
ionic serve --external
```

## 🎯 Atalhos Úteis

```bash
# Build + sync + open (tudo de uma vez)
npm run build && npx cap sync && npx cap open android

# Desenvolvimento rápido
alias dev="npm run dev"
alias build="npm run build && npx cap sync"

# Adicione no .bashrc ou .zshrc:
alias pad-dev="cd ~/pad-metronome-app && npm run dev"
```

## 📚 Documentação Rápida

```bash
# Ionic
# https://ionicframework.com/docs

# Capacitor
# https://capacitorjs.com/docs

# Tone.js
# https://tonejs.github.io/

# React
# https://react.dev/
```

## ⚡ Workflow Recomendado

```bash
# 1. Fazer mudanças no código
# 2. Testar no navegador
npm run dev

# 3. Build e testar no Android
npm run build
npx cap sync
npx cap open android

# 4. Commit
git add .
git commit -m "Descrição da mudança"
git push
```

---

💡 **Dica**: Salve este arquivo como bookmark para referência rápida!