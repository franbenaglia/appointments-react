import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './TurnRangePage.css';
import TurnRangeList from '../components/TurnRangeList';

const TurnListRangePage: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Turn List Range</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Turn List Range</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <TurnRangeList />
            </IonContent>
        </IonPage>
    );
};

export default TurnListRangePage;
