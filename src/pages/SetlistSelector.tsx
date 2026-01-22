import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonCheckbox, IonButton, IonInput, IonButtons, IonIcon, IonLabel } from '@ionic/react';
import { arrowBack, listCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Music, Setlist } from '../types';

interface SetlistSelectorProps {
  onSetlistCreated: (setlist: Setlist) => void;
}

const SetlistSelector: React.FC<SetlistSelectorProps> = ({ onSetlistCreated }) => {
  const [musics, setMusics] = useState<Music[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [setlistName, setSetlistName] = useState('');

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
    if (setlistName && selectedMusics.length) {
      const setlist: Setlist = {
        id: Date.now().toString(),
        name: setlistName,
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
        <IonLabel position="stacked">Nome da Setlist</IonLabel>
        <IonInput
          placeholder="Ex: Nome da Setlist"
          value={setlistName}
          onIonChange={e => setSetlistName(e.detail.value!)}
        />
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
        <IonButton expand="block" onClick={handleCreateSetlist} disabled={!setlistName || !selectedIds.length}>
          <IonIcon icon={listCircle} slot="start" />
          Criar Setlist
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SetlistSelector;
