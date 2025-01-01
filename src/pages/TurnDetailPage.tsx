import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './TurnDetailPage.css';
import TurnDetail from '../components/TurnDetail';
import { useParams } from 'react-router';

const TurnDetailPage: React.FC = () => {

    const { id } = useParams<{ id: string; }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Turn Detail</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Turn Detail</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <TurnDetail _id={id} />
            </IonContent>
        </IonPage>
    );
};

export default TurnDetailPage;
