import { useContext, useEffect, useRef, useState } from 'react';
import './TurnEdit.css';
import { User } from '../model/user';
import {
  IonItem, IonLabel, IonList, IonListHeader, IonToast, SelectChangeEventDetail,
  IonButton, IonButtons, IonDatetime, IonSelect, IonInput,
  IonSelectOption
} from '@ionic/react';
import { IonSelectCustomEvent } from '@ionic/core';
import { addTurn, getAllEvents, getAvailableTurnsTimes, getAvailableTurnsWithSelectedDates, getTurnById } from '../api/TurnsApi';
import { AvailableDates } from '../model/availabledates';
import { getUser } from '../api/UserApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Turn } from '../model/turn';
import { AppContext, AppContextI } from '../context/AppContext';

interface ContainerProps {
  id: string;
}

const TurnEdit: React.FC<ContainerProps> = ({ id }) => {

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<Turn>();

  const { setEv, ev } = useContext<AppContextI>(AppContext);

  const [user, setUser] = useState<User>({} as User);
  const [message, setMessage] = useState('');
  const [currentDate, setCurrentDate] = useState<any>(null);
  const [currentTime, setCurrenTime] = useState<any>(null);
  const [timeSelected, setTimeSelected] = useState<string>('');
  const [showTime, setShowTime] = useState(false);
  const [enableDate, setEnableDate] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [invalidDays, setInvalidDays] = useState<string[]>([]);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [dayValues, setDayValues] = useState<number[]>([]);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [specificdays, setSpecificdays] = useState<string[]>([]);
  const [weekends, setWeekends] = useState<Boolean>(true);
  const [hourValues, setHourValues] = useState<number[]>([]);
  const [minuteValues, setMinuteValues] = useState<number[]>([]);
  const [timeFree, setTimeFree] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, [ev]);

  const init = async () => {

    const eve = await getAllEvents();
    setEvents(eve.data);

    const us = await getUser();
    setUser(us.data);

    if (ev) {
      const av = await getAvailableTurnsWithSelectedDates(ev);
      setDayValues(av.data.range[0].dayValues);
      const mind = av.data.range[0].minDate;
      setMinDate(mind);
      const maxd = av.data.range[0].maxDate;
      setMaxDate(maxd);
      setHourValues(av.data.range[0].hourValues);
      setMinuteValues(av.data.range[0].minuteValues);
      setWeekends(av.data.range[0].weekends);
      const sd = av.data.range[0].specificdays
      setSpecificdays(sd);
      setSelectedDays(av.data.datesUsed.map(s => s && s.substring(0, 10)));
      addSpecificDays(sd, mind, maxd);
    }

    setCurrentDate(new Date().toISOString());

    if (id) {
      fetchTurn();
    }

  }

  const fetchTurn = async () => {
    const data: Turn = await getTurnById(id);
    setValue('date', data.date);
    setValue('event', data.event);
  }


  const datetime = useRef<null | HTMLIonDatetimeElement>(null);

  const datetimex = useRef<null | HTMLIonDatetimeElement>(null);

  const reset = () => {
    datetime.current?.reset();
  };

  const cancel = () => {
    datetime.current?.cancel();
  };

  const confirm = () => {
    datetime.current?.confirm();
  };

  const confirmx = () => {
    datetimex.current?.confirm();
  };

  const onSubmit: SubmitHandler<Turn> = async (turn) => {

    turn.user = user;
    turn.event = ev;

    let sdate: string | string[] = datetime.current?.value;
    let stime = timeSelected;

    let stimedate = convertDateTime(sdate as string, stime);

    turn.date = new Date(stimedate);

    await addTurn(turn);

  }

  const setEvent = ($event: any) => {
    setEv($event.detail.value);
  }

  const setOpen = (isOpen: boolean) => {
    setIsToastOpen(isOpen);
  }

  const isDateEnabled = (dateString: string) => enableDate && dateAvailable(dateString) && invalidDate(dateString) &&
    weekendsf(dateString);

  //const isDateEnabled = (dateString: string) => true;

  const settimevalues = ($event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
    setTimeSelected($event.detail.value)
  }

  const dateAvailable = (dateString: string): Boolean => !selectedDays.includes(dateString);

  const invalidDate = (dateString: string): Boolean => !invalidDays.includes(dateString);

  const weekendsf = (dateString: string): boolean => {
    if (!weekends) return true;
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6
  }

  const addSpecificDays = (spd: string[], mind: string, maxd: string) => {

    let days: number[] = spd.map(s => Math.abs(+s.substring(7)))
    dayValues.push(...days);
    setDayValues(dayValues);
    //setDayValues(prev => [...prev, ...days]);
    excludingDays(days, spd, mind, maxd); //workaround

  }

  const excludingDays = (days: number[], spd: string[], mind: string, maxd: string) => {

    let lowEnd: number = +mind.substring(5, 7);
    let highEnd: number = +maxd.substring(5, 7);
    let months: number[] = [];
    let year: number = 2024;
    let allDates: string[] = [];

    for (let i = lowEnd; i <= highEnd; i++) {
      months.push(i);
    }

    for (let m of months) {
      for (let d of days) {
        let month = m.toString().length > 1 ? m.toString() : '0' + m.toString();
        let day = d.toString().length > 1 ? d.toString() : '0' + d.toString();
        allDates.push(year.toString() + '-' + month + '-' + day);
      }
    }
    cutSpecificDays(allDates, spd);
  }

  const cutSpecificDays = (allDates: string[], spd: string[]) => {
    let notValidDates: string[] = allDates.filter(d => {
      return spd.indexOf(d) === -1;
    });
    invalidDays.push(...notValidDates);
    setInvalidDays(invalidDays);
  }

  const convertDateTime = (sdate: string, stime: string): string => {

    let doubledots: number = stime.indexOf(':');
    stime = stime.substring(doubledots + 1) === '0' ? stime + '0' : stime;
    let lg: number = stime.length;
    stime = lg === 4 ? '0' + stime : stime;

    return sdate.substring(0, 10) + 'T' + stime + ':00';
  }

  const handleChange = async () => {

    let sdate: string | string[] = datetime.current?.value;

    const response: any = await getAvailableTurnsTimes(ev, sdate as string);

    const av: AvailableDates = response.data;

    setHourValues(av.range[0].hourValues);
    setMinuteValues(av.range[0].minuteValues);
    setTimeFree(av.timeFree);
    setShowTime(true);
    setEnableDate(false);

  }

  const handleCancel = () => {
    setShowTime(false);
    setEnableDate(true);
  }

  return (
    <div>
      <IonList lines="inset">

        <IonListHeader>
          <IonLabel>Complete:</IonLabel>
          <IonToast position="top" positionAnchor="header" isOpen={isToastOpen}
            message={message} duration={3500}
            onDidDismiss={() => setOpen(false)} ></IonToast>
        </IonListHeader>

        <form onSubmit={handleSubmit(onSubmit)}>


          <IonItem>
            <IonLabel>Event name: {ev}</IonLabel>
            {!ev ? (
              <IonSelect aria-label="Events" placeholder="Select the event"
                onIonChange={($event) => setEvent($event)}>

                {events && events.length > 0 && events.map((ev, i) =>
                  <IonSelectOption value={ev}>{ev}</IonSelectOption>
                )
                }

              </IonSelect>
            ) : ''}
          </IonItem >


          <IonItem>
            <IonInput readonly={true} label="First Name"
              placeholder="Enter name" value={user.firstName}></IonInput>
          </IonItem >

          <IonItem>
            <IonInput readonly={true} label="Last Name"
              placeholder="Enter last name" value={user.lastName}></IonInput>
          </IonItem >

          <IonItem>
            <IonInput readonly={true} label="Email" type="email"
              placeholder="email@domain.com" value={user.email}></IonInput>
          </IonItem >

          <IonItem>
            <IonInput label="Telephone" type="tel" placeholder="888-888-8888"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Date:</IonLabel>
          </IonItem>

          <IonItem>
            {(dayValues && dayValues.length > 0) &&
              <IonDatetime id="datetime2" presentation='date' ref={datetime} dayValues={dayValues}
                isDateEnabled={isDateEnabled} min={minDate} max={maxDate}
                onIonChange={() => handleChange()}
                onIonCancel={() => handleCancel()} display-format="DD/MM/YYYY"
                firstDayOfWeek={1}>
                <span slot="title">Select a Reservation Date</span>
                <IonButtons slot="buttons">
                  <IonButton color="danger" onClick={reset}>Reset</IonButton>
                  <IonButton color="success" onClick={confirm}>Confirm</IonButton>
                  <IonButton color="warning" onClick={cancel}>Cancel</IonButton >
                </IonButtons >
              </IonDatetime >
            }
          </IonItem >

          {showTime ?
            <IonItem>
              <IonList>
                <IonItem>
                  <IonSelect aria-label="Avaliable times" placeholder="Select time"
                    onIonChange={($event) => settimevalues($event)} >
                    {timeFree && timeFree.map((time, i) =>
                      <IonSelectOption value={time}>{time}</IonSelectOption>
                    )
                    }
                  </IonSelect>
                </IonItem >
              </IonList >
            </IonItem >
            : ''
          }

          <IonItem>
            <IonButton type="submit" shape="round" color="danger" size="default">Accept</IonButton>
          </IonItem>

        </form >

      </IonList >
    </div >
  );
};

export default TurnEdit;