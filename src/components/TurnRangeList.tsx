import { IonItem, IonList, IonLabel, IonIcon } from '@ionic/react';
import { getEvents as _getEvents } from '../helpers/EventHelper';
import './TurnRangeList.css';
import { sendOutline } from 'ionicons/icons';

const TurnRangeList: React.FC = () => {


    const getEvents = () => _getEvents();

    //[routerLink]="'/folder/turn-range/' + aturn._id" [ngClass]="(i % 2 == 0) ? 'odd' : 'even'"

    return (
        <div>
            {getEvents().map((aturn, idx) => {
                return (
                    <IonList inset={true}>
                        <IonItem>
                            <IonLabel>{aturn.event}</IonLabel>
                            <IonIcon ios={sendOutline} md={sendOutline} />
                        </IonItem>
                    </IonList>
                )
            }
            )
            }
        </div >
    );
};

export default TurnRangeList;