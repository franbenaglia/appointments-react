import { useState } from 'react';
import './Register.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../model/user';
import { registerUser } from '../api/AuthApi';
import { IonInput, IonItem, IonLabel, IonList, IonToast, IonListHeader, IonButton, IonText } from '@ionic/react';


const Register: React.FC = () => {

    const [isToastOpen, setIsToastOpen] = useState(false);
    const [message, setMessage] = useState('');
    const interval: number = 4500;

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<User>();

    const setOpen = (isOpen: boolean) => {
        setIsToastOpen(isOpen);
    }

    const onSubmit: SubmitHandler<User> = async (user) => {
        //ConfirmPasswordValidator.MatchPassword
        let u: User = Object.assign(new User(), user);

        const us = await registerUser(u);

        setOpen(true);
        setMessage('Success! Registration accepted.');

        /*
        let timerId = setInterval(() => {
            clearInterval(timerId);
            router.navigate((['login']));
        }, interval);
*/

        //setOpen(true);
        //setMessage('Submit fail');
        //console.log(error);


    }


    return (
        <div>
            <IonList lines="inset">

                <IonListHeader>
                    <IonLabel>Complete:</IonLabel>
                </IonListHeader>

                <IonToast position="top" positionAnchor="header" isOpen={isToastOpen} message={message}
                    duration={interval} onDidDismiss={() => setOpen(false)} ></IonToast>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <IonItem>
                        <IonInput {...register("firstName", { required: true })} label="First Name" placeholder="Enter name"></IonInput>
                        {errors.firstName && <span>First name is required</span>}
                    </IonItem>

                    <IonItem>
                        <IonInput {...register("lastName", { required: true })} label="Last Name" placeholder="Enter last name"></IonInput>
                        {errors.lastName && <span>Last name is required</span>}
                    </IonItem>

                    <IonItem>
                        <IonInput {...register("email", { required: true })} label="Email" type="email" placeholder="email@domain.com"></IonInput>
                        {errors.email && <span>Email is required</span>}
                    </IonItem>

                    <IonItem>
                        <IonInput {...register("password", { required: true })} label="Password" type="password" placeholder="password"></IonInput>
                        {errors.password && <span>Password is required</span>}
                    </IonItem>

                    <IonItem>
                        <IonButton type="submit" shape="round" color="danger"
                            size="default">Accept</IonButton>
                    </IonItem >

                </form >

            </IonList >

        </div >
    );
};

export default Register;























