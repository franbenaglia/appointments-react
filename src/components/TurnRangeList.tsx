import { IonItem, IonList, IonLabel, IonIcon } from '@ionic/react';
import './TurnRangeList.css';
import { sendOutline } from 'ionicons/icons';
import { getAvailableRangeTurns } from '../api/TurnsApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AvailableRangeTurns } from '../model/availablerangeturns';

const TurnRangeList: React.FC = () => {

    const [evs, setEvs] = useState([] as AvailableRangeTurns[]);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const eves = await getAvailableRangeTurns();
        setEvs(eves);
    }

    return (
        <div>
            {evs && evs.map((event, idx) => {
                let sty = (idx % 2 == 0) ? { color: 'blue' } : { color: 'green' };
                return (
                    <IonList inset={true}>
                        <IonItem style={sty} key={idx}>
                            <IonLabel>{event.event}</IonLabel>
                            <Link to={'/TurnRange/' + event._id}>Edit Turn Range</Link>
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