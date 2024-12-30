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

  const [pageNumber, setPageNumber] = useState<number>(1);

  const [user, setUser] = useState<User>({} as User);

  const [mail, setMail] = useState<string>('');

  const init = async () => {
    const us = await getUser();
    setUser(us);
    if (us.role !== 'admin') {
      setMail(us.email);
    }
    getNextTurns();
  }

  useEffect(() => {
    init();
  }, []);

  const getTurns = (): Turno[] => turns;

  const getNextTurns = async (pn?: number): Promise<void> => {

    if (pn) {
      pn = pageNumber;
    }

    const data = await getPaginatedByUser(pn, pageSize, mail);

    if (pn === 1) {
      //turns.length = 0;
      setTurns(data.results);
    } else {
      //turns.push(...data.results);
      //setTurns(turns);
      setTurns(prevturns => [...prevturns, data.results]);
    }
  }

  const onIonInfinite = (ev: InfiniteScrollCustomEvent) => {
    let pn = pageNumber + 1;
    setPageNumber(pn);
    getNextTurns(pn);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 2500);
  }

  const handleInput = (event: any) => {
    if (event.target.value) {
      const query = event.target.value.toLowerCase();
      setMail(query);
      setPageNumber(1);
      getNextTurns(1);
    } else {
      getNextTurns();
    }
  }

  const handleCancel = (event: any) => {
    setPageNumber(1);
    getNextTurns(1);
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















