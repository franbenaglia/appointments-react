import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { isLoggedIn } from '../helpers/AuthHelper';
import { useEffect } from 'react';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const history = useHistory();

  const logged = async () => {
    const islog = await isLoggedIn();
    if (!islog) {
      history.push('/Login')
    }
  }

  useEffect(() => {
    logged();
  }, []);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
