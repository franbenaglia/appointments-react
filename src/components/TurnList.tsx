import { useEffect, useState } from 'react';
import './TurnList.css';
import { Turn as Turno } from '../model/turn';
import { User } from '../model/user';
import { getUser } from '../api/UserApi';
import { getPaginatedByUser } from '../api/TurnsApi';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonSearchbar } from '@ionic/react';
import Turn from './Turn';

const TurnList: React.FC = () => {

  const pageSize: number = 5;

  const [turns, setTurns] = useState<Turno[]>([]);

  const [ts, setTs] = useState<Turno[]>([]);

  const [pageNumber, setPageNumber] = useState<number>(1);

  const [user, setUser] = useState<User>({} as User);

  const [mail, setMail] = useState<string>('');

  const init = async () => {
    const user = await getUser();
    setUser(user);
    if (user.role !== 'admin') {
      setMail(user.email);
    }
    getNextTurns();
  }

  useEffect(() => {
    init();
  }, []);

  const getTurns = (): Turno[] => turns;

  const getNextTurns = async (): Promise<void> => {

    const data = await getPaginatedByUser(pageNumber, pageSize, mail);

    if (pageNumber === 1) {
      turns.length = 0;
    }
    turns.push(...data.results);
  }

  const onIonInfinite = (ev: InfiniteScrollCustomEvent) => {
    setPageNumber(pageNumber => pageNumber + 1);
    getNextTurns();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 2500);
  }

  const handleInput = (event: any) => {
    if (event.target.value) {
      const query = event.target.value.toLowerCase();
      setMail(query);
      setPageNumber(1);
      getNextTurns();
    } else {
      getNextTurns();
    }
  }

  const handleCancel = (event: any) => {
    setPageNumber(1);
    getNextTurns();
  }


  return (
    <div>


      <IonSearchbar placeholder="Search by email" debounce={300}
        onIonClear={($event) => handleCancel($event)}
        onIonCancel={($event) => handleCancel($event)}
        show-cancel-button="always"
        onIonInput={($event) => handleInput($event)}>

      </IonSearchbar>

      <IonList>
        {getTurns().map((turn, idx) => <Turn turn={turn} key={idx} />
        )
        }
      </IonList>

      <IonInfiniteScroll threshold="100px" onIonInfinite={($event) => onIonInfinite($event)} >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll >


    </div >
  );

};

export default TurnList;















