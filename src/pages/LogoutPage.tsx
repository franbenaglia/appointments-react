import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './TurnEditPage.css';
import Register from '../components/Register';
import Logout from '../components/Logout';

const LogoutPage: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Logout</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Logout</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Logout />
            </IonContent>
        </IonPage>
    );
};

export default LogoutPage;
