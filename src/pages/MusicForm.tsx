import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonButtons,
  IonIcon,
  IonCard,
  IonCardContent,
  IonRange
} from '@ionic/react';
import { arrowBack, save } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Tone, TONES } from '../types';

const MusicForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [tone, setTone] = useState<Tone>('C');
  const [bpm, setBpm] = useState(120);
  const history = useHistory();
  const isEdit = id !== 'new';

  useEffect(() => {
    if (isEdit) {
      const music = storageService.getMusicById(id);
      if (music) {
        setName(music.name);
        setTone(music.tone);
        setBpm(music.bpm);
      }
    }
  }, [id, isEdit]);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Por favor, digite o nome da música');
      return;
    }

    if (isEdit) {
      storageService.updateMusic(id, { name, tone, bpm });
    } else {
      storageService.createMusic({ name, tone, bpm });
    }

    history.push('/musics');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{isEdit ? 'Editar Música' : 'Nova Música'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Nome da Música</IonLabel>
              <IonInput
                value={name}
                onIonChange={e => setName(e.detail.value || '')}
                placeholder="Ex: Louvor 1"
              />
            </IonItem>

            <IonItem>
              <IonLabel>Tom</IonLabel>
              <IonSelect value={tone} onIonChange={e => setTone(e.detail.value)}>
                {TONES.map(t => (
                  <IonSelectOption key={t} value={t}>
                    {t}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>BPM: {bpm}</IonLabel>
            </IonItem>
            <IonItem>
              <IonRange
                min={40}
                max={220}
                value={bpm}
                onIonChange={e => setBpm(e.detail.value as number)}
                pin={true}
              />
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" onClick={handleSubmit} color="primary">
          <IonIcon icon={save} slot="start" />
          {isEdit ? 'Salvar Alterações' : 'Criar Música'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MusicForm;