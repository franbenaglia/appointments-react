import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './TurnListPage.css';
import TurnList from '../components/TurnList';

const TurnListPage: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Turn List</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Turn List</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <TurnList />
            </IonContent>
        </IonPage>
    );
};

export default TurnListPage;
