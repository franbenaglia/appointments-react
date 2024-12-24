import { useEffect, useRef, useState } from 'react';
import './TurnEdit.css';
import { User } from '../model/user';
import {
  IonItem, IonLabel, IonList, IonListHeader, IonToast, SelectChangeEventDetail,
  IonButton, IonButtons, IonDatetime, IonSelect, IonInput,
  IonSelectOption
} from '@ionic/react';
import { IonSelectCustomEvent } from '@ionic/core';
import { addTurn, getAllEvents, getAvailableTurnsTimes, getAvailableTurnsWithSelectedDates } from '../api/TurnsApi';
import { AvailableDates } from '../model/availabledates';
import { getUser } from '../api/UserApi';
import { getTheEvent, setTheEvent } from '../helpers/AppHelper';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Turn } from '../model/turn';
import { lastValueFrom } from 'rxjs';

interface ContainerProps {
  name: string;
}

const TurnEdit: React.FC<ContainerProps> = ({ name }) => {

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<Turn>();

  const [user, setUser] = useState<User>({} as User);
  const [message, setMessage] = useState('');
  const [currentDate, setCurrentDate] = useState<any>(null);
  const [currentTime, setCurrenTime] = useState<any>(null);
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
  const [theevent, setTheevent] = useState('');
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {

    const ev: string[] = await getAllEvents();
    setEvents(events);

    const us: User = await getUser();
    setUser(us);

    const e = await lastValueFrom(getTheEvent());

    setTheevent(e);

    const av: AvailableDates = await getAvailableTurnsWithSelectedDates(e);

    setDayValues(av.range[0].dayValues);
    setMinDate(av.range[0].minDate);
    setMaxDate(av.range[0].maxDate);
    setHourValues(av.range[0].hourValues);
    setMinuteValues(av.range[0].minuteValues);
    setWeekends(av.range[0].weekends);
    setSpecificdays(av.range[0].specificdays);
    setSelectedDays(av.datesUsed.map(s => s && s.substring(0, 10)));
    addSpecificDays();

    setCurrentDate(new Date().toISOString());

    load();

  }

  const load = async () => {
    //setValue('firstName', user.firstName);
    //setValue('lastName', user.lastName);
    //setValue('email', user.email);
    //setValue('phone', user.phone);
  }

  const datetime = useRef<null | HTMLIonDatetimeElement>(null);

  const reset = () => {
    datetime.current?.reset();
  };

  const cancel = () => {
    datetime.current?.cancel();
  };

  const confirm = () => {
    datetime.current?.confirm();
  };


  const onSubmit: SubmitHandler<Turn> = async (turn) => {

    await addTurn(turn);

  }

  const setEvent = ($event: any) => {
    setTheEvent($event.detail.value);
    setTheevent($event.detail.value);
  }

  const setOpen = (isOpen: boolean) => {
    setIsToastOpen(isOpen);
  }

  const isDateEnabled = (dateString: string) => enableDate && dateAvailable(dateString) && invalidDate(dateString) &&
    weekendsf(dateString);



  const settimevalues = ($event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
  }

  const dateAvailable = (dateString: string): Boolean => !selectedDays.includes(dateString);

  const invalidDate = (dateString: string): Boolean => !invalidDays.includes(dateString);

  const weekendsf = (dateString: string): boolean => {
    if (!weekends) return true;
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6
  }

  const addSpecificDays = () => {

    let days: number[] = specificdays.map(s => Math.abs(+s.substring(7)))
    dayValues.push(...days);
    excludingDays(days); //workaround

  }

  const excludingDays = (days: number[]) => {

    let lowEnd: number = +minDate.substring(5, 7);
    let highEnd: number = +maxDate.substring(5, 7);
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
    cutSpecificDays(allDates);
  }

  const cutSpecificDays = (allDates: string[]) => {
    let notValidDates: string[] = allDates.filter(d => {
      return specificdays.indexOf(d) === -1;
    });
    invalidDays.push(...notValidDates);
  }

  const convertDateTime = (sdate: string, stime: string): string => {

    let doubledots: number = stime.indexOf(':');
    stime = stime.substring(doubledots + 1) === '0' ? stime + '0' : stime;
    let lg: number = stime.length;
    stime = lg === 4 ? '0' + stime : stime;

    return sdate.substring(0, 10) + 'T' + stime + ':00';
  }

  const handleChange = async () => {

    let sdate: string = '';

    const av: AvailableDates = await getAvailableTurnsTimes(theevent, sdate);

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
            <IonLabel>Event name: {theevent}</IonLabel>
            <IonSelect aria-label="Events" placeholder="Select the event"
              onIonChange={($event) => setEvent($event)}>

              {events.map((ev, i) =>
                <IonSelectOption value={ev}>{ev}</IonSelectOption>
              )
              }

            </IonSelect>
          </IonItem >


          <IonItem>
            <IonInput readonly={true} label="First Name"
              placeholder="Enter name"></IonInput>
          </IonItem >

          <IonItem>
            <IonInput readonly={true} label="Last Name"
              placeholder="Enter last name"></IonInput>
          </IonItem >

          <IonItem>
            <IonInput readonly={true} label="Email" type="email"
              placeholder="email@domain.com"></IonInput>
          </IonItem >

          <IonItem>
            <IonInput label="Telephone" type="tel" placeholder="888-888-8888"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Date:</IonLabel>
          </IonItem>

          <IonItem>

            <IonDatetime id="datetime" presentation='date' dayValues={dayValues}
              isDateEnabled={isDateEnabled} min={minDate} value={currentDate} onIonChange={() => handleChange()}
              onIonCancel={() => handleCancel()} max={maxDate} display-format="DD/MM/YYYY"
              firstDayOfWeek={1}>
              <span slot="title">Select a Reservation Date</span>
              <IonButtons slot="buttons">
                <IonButton color="danger" onClick={reset}>Reset</IonButton>
                <IonButton color="success" onClick={confirm}>Confirm</IonButton>
                <IonButton color="warning" onClick={cancel}>Cancel</IonButton >
              </IonButtons >
            </IonDatetime >

          </IonItem >

          {showTime ?
            <IonItem>
              <IonList>
                <IonItem>
                  <IonSelect aria-label="Avaliable times" placeholder="Select time"
                    onIonChange={($event) => settimevalues($event)} >
                    {timeFree.map((time, i) =>
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