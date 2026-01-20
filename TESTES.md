# 🧪 Guia de Testes - PAD + Metrônomo App

## ✅ Checklist de Testes Manuais

### 🎵 Testes de Áudio

#### PAD Player
- [ ] PAD toca ao clicar "Play PAD"
- [ ] PAD pausa ao clicar "Pausar PAD"
- [ ] PAD para ao clicar "Stop Geral"
- [ ] Loop é contínuo sem gaps ou clicks
- [ ] Trocar tom enquanto tocando funciona
- [ ] PAD toca no canal esquerdo (usar fones)
- [ ] Volume é adequado (não distorce)

#### Metrônomo
- [ ] Click toca ao clicar "Play Metrônomo"
- [ ] Click pausa ao clicar "Pausar Metrônomo"
- [ ] Click para ao clicar "Stop Geral"
- [ ] BPM é preciso (comparar com app externo)
- [ ] Ajustar BPM em tempo real funciona
- [ ] Click toca no canal direito (usar fones)
- [ ] Click é audível sobre o PAD

#### Combinado
- [ ] PAD + Click tocam juntos sem problemas
- [ ] Separação estéreo funciona corretamente
- [ ] Pausar um não afeta o outro
- [ ] Stop geral para ambos

### 📝 Testes de CRUD

#### Criar Música
- [ ] Botão "+" abre formulário
- [ ] Campos vazios inicialmente
- [ ] Nome obrigatório (validação)
- [ ] Tom selecionável (C até B)
- [ ] BPM ajustável (40-220)
- [ ] Salvar cria música
- [ ] Música aparece na lista
- [ ] Retorna para lista após salvar

#### Editar Música
- [ ] Botão "Editar" abre formulário
- [ ] Campos preenchidos com dados
- [ ] Alterar nome funciona
- [ ] Alterar tom funciona
- [ ] Alterar BPM funciona
- [ ] Salvar atualiza música
- [ ] Mudanças visíveis na lista

#### Remover Música
- [ ] Botão "Remover" abre alerta
- [ ] Alerta mostra mensagem clara
- [ ] "Cancelar" não remove
- [ ] "Remover" remove música
- [ ] Música some da lista
- [ ] Não há erros após remoção

#### Listar Músicas
- [ ] Lista mostra todas as músicas
- [ ] Cada card mostra nome, tom, BPM
- [ ] Lista vazia mostra mensagem
- [ ] Scroll funciona com muitas músicas
- [ ] Ordenação é consistente

#### Play da Lista
- [ ] Botão "Play" carrega música
- [ ] App navega para Home
- [ ] Tom é carregado corretamente
- [ ] BPM é carregado corretamente
- [ ] PAD + Click iniciam automaticamente

### 💾 Testes de Persistência

#### localStorage
- [ ] Músicas são salvas
- [ ] Músicas persistem após reload
- [ ] Músicas persistem após fechar app
- [ ] Edições são salvas
- [ ] Remoções são salvas
- [ ] Muitas músicas (50+) funcionam

### 🎨 Testes de UI/UX

#### Navegação
- [ ] Botão "Lista" vai para músicas
- [ ] Botão "Voltar" retorna
- [ ] Play da lista vai para Home
- [ ] Navegação é rápida
- [ ] Não há erros no console

#### Responsividade
- [ ] Layout OK em mobile (360px)
- [ ] Layout OK em tablet (768px)
- [ ] Layout OK em desktop (1920px)
- [ ] Orientação portrait funciona
- [ ] Orientação landscape funciona

#### Estados Visuais
- [ ] Loading é mostrado
- [ ] Botões mudam cor ao tocar
- [ ] Feedback tátil (haptic) se disponível
- [ ] Erros mostram mensagens claras

### 📱 Testes Android

#### Build
- [ ] Build sem erros
- [ ] APK instala
- [ ] App abre sem crash
- [ ] Ícone e nome corretos

#### Funcionalidades
- [ ] Tudo que funciona no browser funciona
- [ ] Áudio toca mesmo com tela bloqueada
- [ ] Não para ao minimizar
- [ ] Bateria não drena rápido

#### Permissões
- [ ] Não pede permissões estranhas
- [ ] Áudio funciona sem aceitar nada

## 🧪 Testes Automatizados (Opcional)

### Setup de Testes

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### Exemplo: Testar storageService

```typescript
// src/services/storageService.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { storageService } from './storageService';

beforeEach(() => {
  localStorage.clear();
});

describe('storageService', () => {
  it('deve criar uma música', () => {
    const music = storageService.createMusic({
      name: 'Test Song',
      tone: 'C',
      bpm: 120
    });

    expect(music).toHaveProperty('id');
    expect(music.name).toBe('Test Song');
    expect(music.tone).toBe('C');
    expect(music.bpm).toBe(120);
  });

  it('deve listar todas as músicas', () => {
    storageService.createMusic({ name: 'Song 1', tone: 'C', bpm: 120 });
    storageService.createMusic({ name: 'Song 2', tone: 'D', bpm: 140 });

    const musics = storageService.getAllMusics();
    expect(musics).toHaveLength(2);
  });

  it('deve atualizar uma música', () => {
    const music = storageService.createMusic({ name: 'Old', tone: 'C', bpm: 120 });
    const updated = storageService.updateMusic(music.id, { name: 'New' });

    expect(updated?.name).toBe('New');
    expect(updated?.tone).toBe('C'); // mantém o resto
  });

  it('deve remover uma música', () => {
    const music = storageService.createMusic({ name: 'Test', tone: 'C', bpm: 120 });
    const removed = storageService.deleteMusic(music.id);

    expect(removed).toBe(true);
    expect(storageService.getAllMusics()).toHaveLength(0);
  });
});
```

### Exemplo: Testar Componente MusicCard

```typescript
// src/components/MusicCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MusicCard from './MusicCard';

describe('MusicCard', () => {
  const mockMusic = {
    id: '123',
    name: 'Test Song',
    tone: 'C' as const,
    bpm: 120
  };

  const mockHandlers = {
    onPlay: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn()
  };

  it('deve renderizar informações da música', () => {
    render(<MusicCard music={mockMusic} {...mockHandlers} />);

    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText(/Tom: C/)).toBeInTheDocument();
    expect(screen.getByText(/BPM: 120/)).toBeInTheDocument();
  });

  it('deve chamar onPlay ao clicar Play', () => {
    render(<MusicCard music={mockMusic} {...mockHandlers} />);

    const playButton = screen.getByText('Play');
    fireEvent.click(playButton);

    expect(mockHandlers.onPlay).toHaveBeenCalledWith(mockMusic);
  });

  it('deve chamar onEdit ao clicar Editar', () => {
    render(<MusicCard music={mockMusic} {...mockHandlers} />);

    const editButton = screen.getByText('Editar');
    fireEvent.click(editButton);

    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockMusic);
  });

  it('deve chamar onDelete ao clicar Remover', () => {
    render(<MusicCard music={mockMusic} {...mockHandlers} />);

    const deleteButton = screen.getByText('Remover');
    fireEvent.click(deleteButton);

    expect(mockHandlers.onDelete).toHaveBeenCalledWith('123');
  });
});
```

## 🎯 Cenários de Teste

### Cenário 1: Músico em Ensaio

**Objetivo**: Tocar PAD + Click para ensaiar uma música

**Passos**:
1. Abrir app
2. Selecionar tom "G"
3. Ajustar BPM para 138
4. Clicar "Play PAD"
5. Clicar "Play Metrônomo"
6. Verificar separação estéreo
7. Ensaiar por 5 minutos
8. Clicar "Stop Geral"

**Resultado Esperado**:
- Áudio toca continuamente
- Sem travamentos
- Bateria não drena muito
- BPM constante

### Cenário 2: Preparar Setlist

**Objetivo**: Cadastrar músicas de um show

**Passos**:
1. Abrir app
2. Ir para "Minhas Músicas"
3. Criar música "Oceans" (D, 72 BPM)
4. Criar música "Way Maker" (G, 138 BPM)
5. Criar música "Goodness of God" (C, 120 BPM)
6. Verificar lista
7. Testar Play em cada uma
8. Editar BPM de uma
9. Remover uma

**Resultado Esperado**:
- Todas as músicas salvas
- Play carrega corretamente
- Edições persistem
- Remoção funciona

### Cenário 3: Durante o Show

**Objetivo**: Usar app durante apresentação ao vivo

**Passos**:
1. Abrir app
2. Ir para lista
3. Tocar primeira música
4. Deixar tocar 3 minutos
5. Stop
6. Tocar segunda música
7. Deixar tocar 3 minutos
8. Repetir para setlist inteira

**Resultado Esperado**:
- App não trava
- Áudio não corta
- Bateria dura o show todo
- Transições rápidas

## 📊 Matriz de Testes

| Funcionalidade | Browser | Android | iOS |
|----------------|---------|---------|-----|
| PAD Loop | ✅ | ✅ | ? |
| Metrônomo | ✅ | ✅ | ? |
| Estéreo | ✅ | ✅ | ? |
| CRUD | ✅ | ✅ | ? |
| Persistência | ✅ | ✅ | ? |
| UI Responsiva | ✅ | ✅ | ? |

## 🐛 Bugs Conhecidos

### Em Investigação
- [ ] PAD pode ter pequeno gap em alguns browsers
- [ ] Metrônomo pode ter drift leve após 30+ minutos
- [ ] localStorage tem limite (~5MB)

### Resolvidos
- [x] Tone.js não iniciava sem interação (resolvido com Tone.start)
- [x] Loop tinha click (resolvido com crossfade)

## 📝 Relatório de Testes

### Template

```markdown
# Teste: [Nome do Teste]
Data: [DD/MM/YYYY]
Testador: [Nome]
Ambiente: [Browser/Android/iOS]

## Passos Executados
1. ...
2. ...

## Resultado
- ✅ Passou
- ❌ Falhou
- ⚠️ Com ressalvas

## Observações
...

## Screenshots
[anexar se necessário]
```

## 🚀 Testes de Carga

### Testar com Muitas Músicas

```typescript
// Script para popular com 100 músicas de teste
const populateTestData = () => {
  const tones = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  for (let i = 1; i <= 100; i++) {
    storageService.createMusic({
      name: `Música Teste ${i}`,
      tone: tones[i % tones.length] as Tone,
      bpm: 60 + (i % 160)
    });
  }

  console.log('100 músicas criadas!');
};

// Rodar no console:
// populateTestData()
```

### Testar Performance

```typescript
// Medir tempo de carregamento
const measureLoadTime = () => {
  const start = performance.now();
  const musics = storageService.getAllMusics();
  const end = performance.now();

  console.log(`Carregou ${musics.length} músicas em ${end - start}ms`);
};
```

## ✅ Critérios de Aceite

Para considerar o app pronto para uso:

- [ ] Todos os testes manuais passam
- [ ] Funciona em Chrome, Firefox, Safari
- [ ] Funciona em Android 8+
- [ ] Bateria dura 2+ horas de uso contínuo
- [ ] Não há memory leaks
- [ ] Áudio não distorce em volume máximo
- [ ] UI é responsiva em todos os tamanhos
- [ ] Documentação está completa

---

💡 **Dica**: Execute esta checklist antes de cada release!