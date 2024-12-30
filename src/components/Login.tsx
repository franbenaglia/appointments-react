import { useContext, useState } from 'react';
import './Login.css';
import { githubOauth2Login, googleOauth2Login, setTokenJwt } from '../helpers/AuthHelper';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../model/user';
import { login } from '../api/AuthApi';
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonToast } from '@ionic/react';
import { logoGithub, logoGoogle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { AppContext, AppContextI } from '../context/AppContext';


const URL_LOCAL_SERVER = import.meta.env.VITE_URL_LOCAL_SERVER;

const Login: React.FC = () => {

    const history = useHistory();

    const { setUser } = useContext<AppContextI>(AppContext);

    const [showMessage, setShowMessage] = useState(false);

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<User>();

    const setOpen_ = (value: boolean) => {
        setShowMessage(value);
    }

    const googleOauth2 = () => {
        googleOauth2Login();
    }

    const githubOauth2 = () => {
        githubOauth2Login();
    }

    const _register = () => {
        history.push('/Register')
    }

    const onSubmit: SubmitHandler<User> = async (user) => {

        let u: User = Object.assign(new User(), user);
        const us = await login(u);

        setUser(us);
        setTokenJwt(us.accessToken);
        window.location.assign(URL_LOCAL_SERVER);

        //setShowMessage(true);
        //console.log(e);

    }


    return (
        <div>
            <IonToast position="top" positionAnchor="header" isOpen={showMessage} message="Login fail."
                duration={4000} onDidDismiss={() => setOpen_(false)} ></IonToast>

            <IonList lines="inset">

                <IonListHeader>
                    <IonLabel>Complete:</IonLabel>
                </IonListHeader>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <IonItem>
                        <IonInput  {...register("email", { required: true })} label="Email" type="email" placeholder="email@domain.com"></IonInput>
                        {errors.email && <span>Email is required</span>}
                    </IonItem>

                    <IonItem>
                        <IonInput {...register("password", { required: true })} label="Password" type="password" placeholder=""></IonInput>
                        {errors.password && <span>Password is required</span>}
                    </IonItem>

                    <IonItem>
                        <IonButton type="submit" shape="round" color="danger"
                            size="default">Accept</IonButton>
                    </IonItem >

                    <IonItem>
                        <IonButton type="button" onClick={() => googleOauth2()} shape="round" color="medium"
                            size="default">
                            Google&nbsp;
                            <IonIcon ios={logoGoogle} md={logoGoogle} />
                        </IonButton>
                        <IonButton type="button" onClick={() => githubOauth2()} shape="round" color="light"
                            size="default">Github &nbsp;
                            <IonIcon ios={logoGithub} md={logoGithub} />
                        </IonButton >
                    </IonItem >

                    <IonItem>
                        <IonButton type="button" onClick={() => _register()} shape="round" color="warning"
                            size="default">Register</IonButton>
                    </IonItem >

                </form >

            </IonList >
        </div >
    );
};

export default Login;