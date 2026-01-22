import {
  IonAlert, IonButton, IonButtons, IonContent, IonFab,
  IonFabButton, IonHeader, IonIcon, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MusicCard from '../components/MusicCard';
import { storageService } from '../services/storageService';
import { Music } from '../types';

const MusicList: React.FC = () => {
  const [musics, setMusics] = useState<Music[]>([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [musicToDelete, setMusicToDelete] = useState<string | null>(null);
  const history = useHistory();


  useIonViewWillEnter(() => {
    loadMusics();
  });

  const loadMusics = () => {
    const allMusics = storageService.getAllMusics();
    setMusics(allMusics);
  };

  const handlePlay = (music: Music) => {
    history.push('/player', {
      music: {
        tone: music.tone,
        bpm: music.bpm,
        name: music.name,
        autoplay: true
      }
    });
  };

  const handleEdit = (music: Music) => {
    history.push(`/music-form/${music.id}`);
  };

  const confirmDelete = (id: string) => {
    setMusicToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleDelete = () => {
    if (musicToDelete) {
      storageService.deleteMusic(musicToDelete);
      loadMusics();
      setMusicToDelete(null);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Minhas Músicas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/setlist')}>
              Criar Setlist
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {musics.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
            <p>Nenhuma música cadastrada.</p>
            <p>Clique no botão + para adicionar.</p>
          </div>
        ) : (
          <IonList>
            {musics.map(music => (
              <MusicCard
                key={music.id}
                music={music}
                onPlay={handlePlay}
                onEdit={handleEdit}
                onDelete={confirmDelete}
              />
            ))}
          </IonList>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/music-form/new')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Confirmar exclusão"
          message="Deseja realmente remover esta música?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Remover',
              role: 'destructive',
              handler: handleDelete
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default MusicList;