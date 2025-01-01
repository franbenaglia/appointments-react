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
    const [dat, setDat] = useState('');
    const [hs, setHs] = useState('');

    const initUser = async () => {
        const u = await getUser();
        setUser(u);
    }

    const initDate = async () => {
        const dat = new Date(turn.date);
        const year = dat.getFullYear();
        const month = dat.getMonth() + 1;
        const day = dat.getDate();
        const h = dat.getHours();
        const m = dat.getMinutes();
        const fd = day + '/' + month + '/' + year;
        setDat(fd);
        setHs(h + ':' + m);
    }

    useEffect(() => {
        initUser();
        initDate();
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
            {(turn && dat && hs) ? (
                <IonItem routerLink={'TurnDetail/' + turn._id}>
                    <IonLabel class="ion-text-wrap">
                        <h2>
                            {'Date: ' + dat}
                        </h2>
                        <h2>
                            {'Time: ' + hs}
                        </h2>
                        <h3>{'Email: ' + turn.user?.email}</h3>
                        <h3>{turn.cancelUser ? 'Cancelled' : ''} {turn.cancelAdmin ? 'Cancelled By Admin' : ''}</h3>
                    </IonLabel>
                    {cancelVisible &&
                        <IonButton color="danger" onClick={() => cancel()}>Cancelar</IonButton>
                    }
                </IonItem>) : ''}

        </div >
    );
};

export default Turn;