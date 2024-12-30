import { useContext, useEffect, useState } from 'react';
import './ExploreContainer.css';
import { Turn } from '../model/turn';
import { User } from '../model/user';
import { getTurnById, updateTurn } from '../api/TurnsApi';
import { getUser } from '../api/UserApi';
import { Email } from '../model/email';
import { sendEmail } from '../api/EmailApi';
import { IonButton, IonItem, IonLabel } from '@ionic/react';
import StripeComponent from './Stripe';
import { AppContext, AppContextI } from '../context/AppContext';

interface ContainerProps {
  _id: string;
}

const turnPrice: number = 10;

const TurnDetail: React.FC<ContainerProps> = ({ _id }) => {

  const [turn, setTurn] = useState<Turn>({} as Turn);

  const [cancelDisabled, setCancelDisabled] = useState<boolean>(false);

  const [user, setUser] = useState<User>({} as User);

  const { setIdTurn } = useContext<AppContextI>(AppContext);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {

    const t = await getTurnById(_id);

    setIdTurn(_id);

    setTurn(t);

    if (t.cancelAdmin || t.cancelUser || t.idTx) {
      setCancelDisabled(true);
    }

    const us = await getUser();
    setUser(us);
  }

  const cancel = async () => {

    if (user.role === 'admin') {
      turn.cancelAdmin = true;
    } else {
      turn.cancelUser = true;
    }

    await updateTurn(turn);

    setCancelDisabled(true);

    if (user.role === 'admin') {

      const email: Email = {
        to: turn.user.email,
        text: 'Mr/Ms ' + turn.user.firstName + ' ' + turn.user.lastName + ' your turn has been cancelled',
        subject: 'Turn cancelled'
      };

      sendEmail(email);

    }

  }


  return (
    <div>
      <IonItem>
        <IonLabel class="ion-text-wrap">
          {turn.date.toISOString()}
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel class="ion-text-wrap">
          {turn.date.toISOString()}
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel class="ion-text-wrap">
          {turn.user.email}
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel class="ion-text-wrap">
          {turn.user.lastName}
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel class="ion-text-wrap">
          {turn.cancelUser ? 'Cancelled' : ''} {turn.cancelAdmin ? 'Cancelled By Admin' : ''}
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel class="ion-text-wrap">
          {'Tx: ' + turn.idTx}
        </IonLabel>
      </IonItem>
      <IonItem>
        <StripeComponent price={turnPrice} />
      </IonItem>
      <IonButton disabled={cancelDisabled} color="danger" onClick={() => cancel()}>Cancelar</IonButton>
    </div >
  );
};

export default TurnDetail;