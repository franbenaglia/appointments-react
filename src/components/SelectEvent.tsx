import { IonItem, IonList, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { setTheEvent } from '../helpers/AppHelper';
import './SelectEvent.css';
import { useContext, useEffect, useState } from 'react';
import { getAllEvents } from '../api/TurnsApi';
import { AppContext, AppContextI } from '../context/AppContext';

const SelectEvent: React.FC = () => {

    const [events, setEvents] = useState([] as string[]);

    const { setEv, ev } = useContext<AppContextI>(AppContext);

    useEffect(() => {
        _getEvents();
    }, []);


    const _getEvents = async () => {
        const response: any = await getAllEvents();
        const es: string[] = response.data;
        setEvents(es);
    }


    const setEvent = ($event: any) => {
        setEv($event.detail.value);
    }

    return (
        <div>
            <IonText><h3>{'Event ' + (ev ? ev : '')}</h3></IonText>
            <IonList>
                <IonItem>
                    <IonSelect aria-label="Events" placeholder="Select the event" onIonChange={($event) => setEvent($event)}>
                        {events && events.length > 0 && events.map((ev, i) =>
                            <IonSelectOption value={ev}>{ev}</IonSelectOption>
                        )}
                    </IonSelect>
                </IonItem>
            </IonList>
        </div >
    );
};

export default SelectEvent;
