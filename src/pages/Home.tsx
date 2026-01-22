import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import Player from '../components/Player';
import { audioService } from '../services/audioService';



const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const location = useLocation<any>();
  const history = useHistory();

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
                <IonIcon icon={arrowBack} />
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>PAD + Metrônomo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Player />
      </IonContent>
    </IonPage>
  );
};

export default Home;