import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRange,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { list, pauseCircle, playCircle, stopCircle } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { audioService } from '../services/audioService';
import { Tone, TONES } from '../types';

const Home: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<Tone>('C');
  const [bpm, setBpm] = useState<number>(120);
  const [bpmBase, setBpmBase] = useState<number>(120);
  const [bpmMultiplier, setBpmMultiplier] = useState<number>(1);
  const [isPadPlaying, setIsPadPlaying] = useState(false);
  const [isMetronomePlaying, setIsMetronomePlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [musicName, setMusicName] = useState<string | null>(null);
  const [padVolume, setPadVolume] = useState<number>(0); // dB
  const [clickVolume, setClickVolume] = useState<number>(0); // dB
  // Atualiza volume do PAD
  useEffect(() => {
    audioService.setPadVolume(padVolume);
  }, [padVolume]);

  // Atualiza volume do click
  useEffect(() => {
    audioService.setClickVolume(clickVolume);
  }, [clickVolume]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const location = useLocation<any>();
  const history = useHistory();

  useEffect(() => {
    // Carregar música se vier da lista
    if (location.state?.music) {
      const { tone, bpm: musicBpm, name, autoplay } = location.state.music;
      setSelectedTone(tone);
      setBpmBase(musicBpm);
      setBpm(musicBpm * bpmMultiplier);
      setMusicName(name || null);

      if (autoplay) {
        handleLoadAndPlay(tone, musicBpm * bpmMultiplier);
      }

      // Limpar state
      window.history.replaceState({}, document.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Atualiza o BPM real ao mudar o multiplicador
  useEffect(() => {
    setBpm(Math.round(bpmBase * bpmMultiplier));
    if (isMetronomePlaying) {
      audioService.setBPM(Math.round(bpmBase * bpmMultiplier));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpmMultiplier, bpmBase]);

  const handleLoadAndPlay = async (tone: Tone, currentBpm: number) => {
    setIsLoading(true);
    try {
      await audioService.loadPad(tone);
      await audioService.playPad();
      audioService.playMetronome(currentBpm);
      setIsPadPlaying(true);
      setIsMetronomePlaying(true);
    } catch (error) {
      console.error('Error loading/playing:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToneChange = async (tone: Tone) => {
    setSelectedTone(tone);
    const wasPlaying = isPadPlaying;

    if (wasPlaying) {
      audioService.pausePad();
      setIsPadPlaying(false);
    }

    setIsLoading(true);
    try {
      await audioService.loadPad(tone);
      if (wasPlaying) {
        await audioService.playPad();
        setIsPadPlaying(true);
      }
    } catch (error) {
      console.error('Error changing tone:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePad = async () => {
    if (isPadPlaying) {
      audioService.pausePad();
      setIsPadPlaying(false);
    } else {
      setIsLoading(true);
      try {
        await audioService.loadPad(selectedTone);
        await audioService.playPad();
        setIsPadPlaying(true);
      } catch (error) {
        console.error('Error playing pad:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleMetronome = () => {
    if (isMetronomePlaying) {
      audioService.pauseMetronome();
      setIsMetronomePlaying(false);
    } else {
      audioService.playMetronome(bpm);
      setIsMetronomePlaying(true);
    }
  };

  const handleBpmChange = (value: number) => {
    setBpmBase(value);
    setBpm(Math.round(value * bpmMultiplier));
    if (isMetronomePlaying) {
      audioService.setBPM(Math.round(value * bpmMultiplier));
    }
  };

  const handleBpmMultiplierChange = (value: string) => {
    const mult = parseFloat(value);
    setBpmMultiplier(mult);
  };

  const stopAll = () => {
    audioService.stopAll();
    setIsPadPlaying(false);
    setIsMetronomePlaying(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {location.pathname === '/player' && (
              <IonButton onClick={() => {
                audioService.stopAll();
                history.push('/musics');
              }}>
                <IonIcon icon={list} />
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>PAD + Metrônomo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Indicação da música */}
        {musicName && (
          <IonItem color="light" style={{ marginBottom: 12 }}>
            <IonLabel style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
              Música: {musicName}
            </IonLabel>
          </IonItem>
        )}

        {/* Card PAD */}
        <IonCard>
          <IonCardHeader>
            <IonTitle>PAD</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Tom do PAD</IonLabel>
              <IonSelect
                value={selectedTone}
                onIonChange={e => handleToneChange(e.detail.value)}
                disabled={isLoading}
              >
                {TONES.map(tone => (
                  <IonSelectOption key={tone} value={tone}>
                    {tone}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Volume PAD (L): {padVolume} dB</IonLabel>
              <IonRange
                min={-40}
                max={6}
                value={padVolume}
                step={1}
                onIonChange={e => setPadVolume(Number(e.detail.value))}
                pin={true}
              />
            </IonItem>
            <IonButton
              expand="block"
              onClick={togglePad}
              disabled={isLoading}
              color={isPadPlaying ? 'warning' : 'primary'}
              style={{ marginTop: 12 }}
            >
              <IonIcon icon={isPadPlaying ? pauseCircle : playCircle} slot="start" />
              {isPadPlaying ? 'Pausar' : 'Play'} PAD
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Card CLICK */}
        <IonCard>
          <IonCardHeader>
            <IonTitle>Click / Metrônomo</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Velocidade</IonLabel>
              <IonSegment
                value={bpmMultiplier.toString()}
                onIonChange={e => {
                  if (typeof e.detail.value === 'string') {
                    handleBpmMultiplierChange(e.detail.value);
                  }
                }}
              >
                <IonSegmentButton value="0.5">
                  <IonLabel>0.5x</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="1">
                  <IonLabel>1x</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="2">
                  <IonLabel>2x</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonItem>
            <IonItem>
              <IonLabel>BPM: {bpm}</IonLabel>
            </IonItem>
            <IonItem>
              <IonRange
                min={40}
                max={220}
                value={bpmBase}
                onIonChange={e => handleBpmChange(e.detail.value as number)}
                pin={true}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Volume Click (R): {clickVolume} dB</IonLabel>
              <IonRange
                min={-40}
                max={6}
                value={clickVolume}
                step={1}
                onIonChange={e => setClickVolume(Number(e.detail.value))}
                pin={true}
              />
            </IonItem>
            <IonButton
              expand="block"
              onClick={toggleMetronome}
              color={isMetronomePlaying ? 'warning' : 'secondary'}
              style={{ marginTop: 12 }}
            >
              <IonIcon icon={isMetronomePlaying ? pauseCircle : playCircle} slot="start" />
              {isMetronomePlaying ? 'Pausar' : 'Play'} Metrônomo
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Card STOP */}
        <IonCard>
          <IonCardContent>
            <IonButton
              expand="block"
              onClick={stopAll}
              color="danger"
            >
              <IonIcon icon={stopCircle} slot="start" />
              Stop Geral
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <p style={{ fontSize: '0.9em', color: '#666' }}>
              <strong>Canal Esquerdo:</strong> PAD<br />
              <strong>Canal Direito:</strong> Click do Metrônomo
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;