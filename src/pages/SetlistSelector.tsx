import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, listCircle } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Music, Setlist } from '../types';

interface SetlistSelectorProps {
  onSetlistCreated: (setlist: Setlist) => void;
}

const SetlistSelector: React.FC<SetlistSelectorProps> = ({ onSetlistCreated }) => {
  const [musics, setMusics] = useState<Music[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setMusics(storageService.getAllMusics());
  }, []);

  const toggleMusic = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  const history = useHistory();
  const handleCreateSetlist = () => {
    const selectedMusics = musics.filter(m => selectedIds.includes(m.id));
    if (selectedMusics.length) {
      const setlist: Setlist = {
        id: Date.now().toString(),
        name: `Setlist ${Date.now()}`,
        musics: selectedMusics
      };
      if (onSetlistCreated) onSetlistCreated(setlist);
      history.push('/setlist-player', { setlist });
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
          <IonTitle>Criar Setlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {musics.map(music => (
            <IonItem key={music.id}>
              <IonCheckbox
                checked={selectedIds.includes(music.id)}
                onIonChange={() => toggleMusic(music.id)}
                slot="start"
              />
              {music.name}
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="block" onClick={handleCreateSetlist} disabled={!selectedIds.length}>
          <IonIcon icon={listCircle} slot="start" />
          Criar Setlist
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SetlistSelector;
