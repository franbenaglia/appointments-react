import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './TurnEditPage.css';
import SelectEvent from '../components/SelectEvent';

const SelectEventPage: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Select Event</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Select Event</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <SelectEvent />
            </IonContent>
        </IonPage>
    );
};

export default SelectEventPage;