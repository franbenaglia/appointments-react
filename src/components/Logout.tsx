import { IonButton } from '@ionic/react';
import './Logout.css';
import { logout } from '../helpers/AuthHelper';
import { useHistory } from 'react-router-dom';

const Logout: React.FC = () => {

    const interval: number = 4500;

    const history = useHistory();

    const _logout = () => {
        logout();
        let timerId = setInterval(() => {
            clearInterval(timerId);
            history.push('/Login')
        }, interval);

    }

    return (

        <IonButton type="button" onClick={() => _logout()} shape="round" color="light"
            size="default">Logout</IonButton>

    );
};

export default Logout;