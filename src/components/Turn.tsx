import './ExploreContainer.css';
import { Turn as Turno } from "../model/turn";
import { useEffect, useState } from 'react';
import { User } from '../model/user';
import { getUser } from '../api/UserApi';
import { updateTurn } from '../api/TurnsApi';
import { Email } from '../model/email';
import { sendEmail } from '../api/EmailApi';
import { IonButton, IonItem, IonLabel } from '@ionic/react';

interface ContainerProps {
    turn: Turno;
}

const Turn: React.FC<ContainerProps> = ({ turn }) => {

    const [user, setUser] = useState({} as User);
    const [cancelVisible, setCancelVisible] = useState(true);

    const initUser = async () => {
        const u = await getUser();
        setUser(u);
    }

    useEffect(() => {
        initUser();
        if (turn && (turn.cancelAdmin || turn.cancelUser)) {
            setCancelVisible(false);
        }
    }, []);

    const cancel = async () => {

        if (user.role === 'admin') {
            turn.cancelAdmin = true;
        } else {
            turn.cancelUser = true;
        }

        updateTurn(turn);

        if (user.role === 'user') {

            const email: Email = {
                to: user.email,
                text: 'Mr/Ms ' + user.firstName + ' ' + user.lastName + 'your turn has been cancelled',
                subject: 'Turn cancelled'
            };

            sendEmail(email);

        }

    }

    return (
        <div>
            <IonItem routerLink={"'/turn-detail/' + turn._id"}>
                <IonLabel class="ion-text-wrap">
                    <h2>
                        {turn.date.getUTCDay()}
                    </h2>
                    <h2>
                        {turn.date.getHours()}
                    </h2>
                    <h3>{turn.user?.email}</h3>
                    <h3>{turn.cancelUser ? 'Cancelled' : ''} {turn.cancelAdmin ? 'Cancelled By Admin' : ''}</h3>
                </IonLabel>
                {cancelVisible &&
                    <IonButton color="danger" onClick={() => cancel()}>Cancelar</IonButton>
                }
            </IonItem>
        </div >
    );
};

export default Turn;