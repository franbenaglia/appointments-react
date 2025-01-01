import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';
import { useLocation } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';
import { useEffect } from 'react';
import { updateTurn } from '../api/TurnsApi';
import { Turn } from '../model/turn';

const TURN_ID = 'turnid';

const SuccessPaymentPage: React.FC = () => {

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const param1 = searchParams.get("redirect_status");
    const param2 = searchParams.get("payment_intent");

    //const { idTurn } = useContext<AppContextI>(AppContext);

    const _confirmPayment = async () => {

        const turn: Turn = new Turn();
        const { value } = await Preferences.get({ key: TURN_ID });
        console.log('turn payed: ' + value);
        turn._id = value;
        turn.idTx = param2;

        updateTurn(turn);
        Preferences.remove({ key: TURN_ID });
    }

    useEffect(() => {
        if (param1 === 'succeeded') {
            _confirmPayment();
        }
    }, [param1, param2]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>SuccessPaymentPage</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">SuccessPayment</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonItem>
                    <IonLabel color="danger">SUCCESSFUL PAYMENT</IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel color="primary">ID:{param2}</IonLabel>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default SuccessPaymentPage;


