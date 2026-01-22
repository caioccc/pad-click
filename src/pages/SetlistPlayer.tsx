import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, playSkipBack, playSkipForward, playCircle } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Player from '../components/Player';
import { Setlist } from '../types';
import { audioService } from '../services/audioService';

const SetlistPlayer: React.FC = () => {
  const location = useLocation<{ setlist: Setlist }>();
  const history = useHistory();
  const setlist = location.state?.setlist;
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!setlist || !setlist.musics || setlist.musics.length === 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => history.push('/musics')}>
                <IonIcon icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonTitle>Setlist</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>Nenhuma música na setlist.</p>
          <IonButton expand="block" onClick={() => history.push('/setlist')}>Selecionar Setlist</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const music = setlist.musics[currentIndex];

  // Play geral da música atual
  const handlePlay = async () => {
    await audioService.stopAll();
    await audioService.playMusic(setlist.musics[currentIndex]);
  };

  const handleNext = async () => {
    if (currentIndex < setlist.musics.length - 1) {
      await audioService.stopAll();
      setCurrentIndex(idx => {
        const nextIdx = idx + 1;
        return nextIdx;
      });
      await audioService.playMusic(setlist.musics[currentIndex + 1]);
    }
  };

  const handlePrev = async () => {
    if (currentIndex > 0) {
      await audioService.stopAll();
      setCurrentIndex(idx => {
        const prevIdx = idx - 1;
        return prevIdx;
      });
      await audioService.playMusic(setlist.musics[currentIndex - 1]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.push('/musics')}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Setlist: {setlist.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/setlist')}>Trocar Setlist</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid style={{ marginTop: 16 }}>
          <IonRow>
            <IonCol size="4">
              <IonButton expand="block" onClick={handlePrev} disabled={currentIndex === 0}>
                <IonIcon icon={playSkipBack} slot="start" />
                Anterior
              </IonButton>
            </IonCol>
            <IonCol size="4" style={{ display: 'flex', justifyContent: 'center' }}>
              <IonButton expand="block" color="success" onClick={handlePlay}>
                <IonIcon icon={playCircle} slot="icon-only" />
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton expand="block" onClick={handleNext} disabled={currentIndex === setlist.musics.length - 1}>
                Próxima
                <IonIcon icon={playSkipForward} slot="end" />
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" style={{ textAlign: 'center', marginTop: 8 }}>
              {currentIndex + 1} / {setlist.musics.length}
            </IonCol>
          </IonRow>
        </IonGrid>
        {music && <Player musicFromSetlist={music} />}
      </IonContent>
    </IonPage>
  );
};

export default SetlistPlayer;
