import { IonButton } from '@ionic/react';
import './Logout.css';
import { logout } from '../helpers/AuthHelper';

const Logout: React.FC = () => {

    const _logout = async () => {
        await logout();
        location.replace('/');
    }

    return (

        <IonButton type="button" onClick={() => _logout()} shape="round" color="light"
            size="default">Logout</IonButton>

    );
};

export default Logout;