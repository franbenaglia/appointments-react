import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './TurnRangePage.css';
import TurnRange from '../components/TurnRange';

const TurnRangePage: React.FC = () => {

    const { id } = useParams<{ id: string; }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Turn Range</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Turn Range</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <TurnRange id={id} />
            </IonContent>
        </IonPage>
    );
};

export default TurnRangePage;
