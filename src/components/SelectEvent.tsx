import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { setTheEvent } from '../helpers/AppHelper';
import { getEvents } from '../helpers/EventHelper';
import './SelectEvent.css';

const SelectEvent: React.FC = () => {


    const _getEvents = () => {
        return getEvents();
    }


    const setEvent = ($event: any) => {
        setTheEvent($event.detail.value);
    }

    return (
        <div>
            <IonList>
                <IonItem>
                    <IonSelect aria-label="Events" placeholder="Select the event"  onIonChange={($event) => setEvent($event)}>
                    {_getEvents().map((ev, i) =>
                        <IonSelectOption value={ev.event}>{ev.event}</IonSelectOption>
                    )}
                </IonSelect>
            </IonItem>
        </IonList>
        </div >
    );
};

export default SelectEvent;
