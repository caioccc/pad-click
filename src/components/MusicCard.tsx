import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { play, create, trash } from 'ionicons/icons';
import { Music } from '../ttt/src/types';

interface MusicCardProps {
  music: Music;
  onPlay: (music: Music) => void;
  onEdit: (music: Music) => void;
  onDelete: (id: string) => void;
}

const MusicCard: React.FC<MusicCardProps> = ({ music, onPlay, onEdit, onDelete }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{music.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>
          <strong>Tom:</strong> {music.tone} | <strong>BPM:</strong> {music.bpm}
        </p>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={() => onPlay(music)} color="success">
                <IonIcon icon={play} slot="start" />
                Play
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={() => onEdit(music)} color="primary">
                <IonIcon icon={create} slot="start" />
                Editar
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={() => onDelete(music.id)} color="danger">
                <IonIcon icon={trash} slot="start" />
                Remover
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default MusicCard;