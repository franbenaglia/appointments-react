import { useEffect, useRef, useState } from 'react';
import './TurnRange.css';
import { AvailableRangeTurns } from '../model/availablerangeturns';
import { createOrUpdateAvailableTurns, deleteRangeTurn, getAvailableRangeTurnById } from '../api/TurnsApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addEvent, deleteEvent } from '../helpers/EventHelper';
import {
  IonButton, IonButtons, IonDatetime, IonInput, IonItem, IonLabel,
  IonList, IonListHeader, IonSelect, IonSelectOption, IonRadio, IonRadioGroup,
  IonToast
} from '@ionic/react';


//const id = this.activatedRoute.snapshot.paramMap.get('_id') as string;
const TurnRage: React.FC = ({ id }: any) => {

  const datemin = useRef<null | HTMLIonDatetimeElement>(null);
  const datemax = useRef<null | HTMLIonDatetimeElement>(null);
  const sdatetime = useRef<null | HTMLIonDatetimeElement>(null);

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<AvailableRangeTurns>();

  const [message, setMessage] = useState('');

  const [currentDate, setCurrentDate] = useState('');

  const [dates, setDates] = useState<string[]>([]);

  const [minDate, setMinDate] = useState('');

  const [maxDate, setMaxDate] = useState('');

  const [weekends, setWeekends] = useState('false');

  const [dayValues, setDayValues] = useState<number[]>([]);

  const [hourValues, setHourValues] = useState<number[]>([]);

  const [minuteValues, setMinuteValues] = useState<number[]>([]);

  const [art, setArt] = useState<AvailableRangeTurns>(null);

  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState<boolean>(false);

  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const hours: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const minutes: number[] = [0, 15, 30, 45];

  useEffect(() => {
    init();
  }, []);

  const init = async () => {

    if (id) {
      const avt: AvailableRangeTurns = await getAvailableRangeTurnById(id);

      setIsDeleteButtonVisible(true);
      avt._id = id;
      setArt(avt);
      load(avt);
    }
    setCurrentDate(new Date().toISOString());
  }

  const load = (avt: AvailableRangeTurns) => {

    setValue('event', avt[0].event);
    setValue('dayValues', avt[0].dayValues);
    setValue('hourValues', avt[0].hourValues);
    setValue('minuteValues', avt[0].minuteValues);

    datemin.current.value = avt[0].minDate;
    datemax.current.value = avt[0].maxDate;
    sdatetime.current.value = avt[0].specificdays;

    setDates(avt[0].specificdays);
    setHourValues(avt[0].hourValues);
    setMinuteValues(avt[0].minuteValues);
    setDayValues(avt[0].dayValues);
    setWeekends(avt[0].weekends ? new Boolean(avt[0].weekends).toString() : 'false');
  }

  const clearForm = () => {

    datemax.current.reset();
    datemin.current.reset();
    sdatetime.current.reset();
    setWeekends('false');

  }

  const delete_ = async () => {

    const x = await deleteRangeTurn(art._id);

    setMessage('Success! Range Turn deleted.');
    deleteEvent(art);
    clearForm();
    setOpen(true);

    //error
    //this.setOpen(true);
    //this.message = 'Submit fail';
    //console.log(error);



  }



  const setspecifics = (ds: string | string[]) => {
    setDates(ds as any);
  }

  const setmin = (ds: string | string[]) => {
    setMinDate(ds as any);
  }

  const setmax = (ds: string | string[]) => {
    setMaxDate(ds as any);
  }

  const setweekend = (ds: any) => {
    setWeekends(ds.detail.value);
  }

  const setdayvalues = (ds: any) => {
    setDayValues(ds.detail.value);
  }

  const sethourvalues = (ds: any) => {
    setHourValues(ds.detail.value);
  }

  const setminutevalues = (ds: any) => {
    setMinuteValues(ds.detail.value);
  }

  const setOpen = (isOpen: boolean) => {
    setIsToastOpen(isOpen);
  }

  const onSubmit: SubmitHandler<AvailableRangeTurns> = async (av) => {

    let t: AvailableRangeTurns = Object.assign(new AvailableRangeTurns(), av);
    t.specificdays.push(...dates);
    t.minDate = minDate;
    t.maxDate = maxDate;
    t.weekends = weekends === 'true';
    t.dayValues = dayValues;
    t.hourValues = hourValues;
    t.minuteValues = minuteValues;
    t._id = art._id;

    const avrt: any = await createOrUpdateAvailableTurns(t);

    if (art._id) {
      addEvent(avrt.turnRange);
    }

    setMessage('Success! Range Turn accepted.');
    clearForm();
    setOpen(true);

    //setOpen(true);
    //message = 'Submit fail';
    //console.log(error);
  }


  return (
    <>
      <IonList lines="inset">

        <IonListHeader>
          <IonLabel>Complete:</IonLabel>
          <IonToast position="top" positionAnchor="header" isOpen={isToastOpen} message={message} duration={3500}
            onDidDismiss={() => setOpen(false)} ></IonToast>
        </IonListHeader>

        <form onSubmit={handleSubmit(onSubmit)}>

          <IonItem>
            <IonInput {...register("event", { required: true })} label="Event Name" placeholder="Enter event name"></IonInput>
            {errors.event && <span>Event name is required</span>}
          </IonItem>


          <IonItem>
            <IonLabel>Min Date:</IonLabel>
          </IonItem>

          <IonItem>
            <IonDatetime id="datemin" presentation="date" hourCycle="h23"
              onIonChange={() => setmin(datemin.current.value)}
              display-format="DD/MM/YYYY HH:mm" preferWheel={false} firstDayOfWeek={1}>
              <span slot="title">Select min Date</span>
              <IonButtons slot="buttons">
                <IonButton color="danger" onClick={() => datemin.current.reset()}>Reset</IonButton>
                <IonButton color="success" onClick={() => datemin.current.confirm(true)} >Confirm</IonButton>
                <IonButton color="warning" onClick={() => datemin.current.cancel(true)} >Cancel</IonButton>
              </IonButtons>
            </IonDatetime>
          </IonItem>

          <IonItem>
            <IonLabel>Max Date:</IonLabel>
          </IonItem>

          <IonItem>
            <IonDatetime id="datemax" presentation="date" hourCycle="h23"
              onIonChange={() => setmax(datemax.current.value)}
              display-format="DD/MM/YYYY HH:mm" preferWheel={false} firstDayOfWeek={1}>
              <span slot="title">Select max Date</span>
              <IonButtons slot="buttons">
                <IonButton color="danger" onClick={() => datemax.current.reset()}>Reset</IonButton>
                <IonButton color="success" onClick={() => datemax.current.confirm(true)} >Confirm</IonButton>
                <IonButton color="warning" onClick={() => datemax.current.cancel(true)} >Cancel</IonButton>
              </IonButtons>
            </IonDatetime>
          </IonItem>

          <IonItem>
            <IonLabel>Specific Dates:</IonLabel>
          </IonItem>

          <IonItem>
            <IonDatetime id="sdatetime" presentation="date" multiple={true}
              onIonChange={() => setspecifics(sdatetime.current.value)} hourCycle="h23" display-format="DD/MM/YYYY HH:mm"
              preferWheel={false} firstDayOfWeek={1}>
              <span slot="title">Select the Dates</span>
              <IonButtons slot="buttons">
                <IonButton color="danger" onClick={() => sdatetime.current.reset()}>Reset</IonButton>
                <IonButton color="success" onClick={() => sdatetime.current.confirm(true)} >Confirm</IonButton>
                <IonButton color="warning" onClick={() => sdatetime.current.cancel(true)} >Cancel</IonButton>
              </IonButtons>
            </IonDatetime>
          </IonItem>

          <IonItem>
            <IonLabel>Exclude weekends?:</IonLabel>
          </IonItem>

          <IonItem>
            <IonList>
              <IonRadioGroup id="weekends" value="weekends" onIonChange={($event) => setweekend($event)} >
                <IonRadio value="true">Yes</IonRadio>
                <IonRadio value="false">No</IonRadio>
              </IonRadioGroup>
            </IonList>
          </IonItem>

          <IonItem>
            <IonLabel>Days included:</IonLabel>
          </IonItem>

          <IonItem>
            <IonList>
              <IonItem>
                <IonSelect aria-label="Days in" placeholder="Select days in"
                  multiple={true} onIonChange={($event) => setdayvalues($event)} >
                  {days && days.map((day, id) => <IonSelectOption value={day}>{day}</IonSelectOption>
                  )}
                </IonSelect>
              </IonItem>
            </IonList >
          </IonItem >

          <IonItem>
            <IonLabel>Hours included:</IonLabel>
          </IonItem>

          <IonItem>
            <IonList>
              <IonItem>
                <IonSelect aria-label="Hours in" placeholder="Select hours in"
                  multiple={true} onIonChange={($event) => sethourvalues($event)} >

                  {hours && hours.map((hour, id) =>
                    <IonSelectOption value={hour}>{hour}</IonSelectOption>
                  )}

                </IonSelect>
              </IonItem>
            </IonList >
          </IonItem >

          <IonItem>
            <IonLabel>Minutes included:</IonLabel>
          </IonItem>

          <IonItem>
            <IonList>
              <IonItem>
                <IonSelect aria-label="Minutes in" placeholder="Select minutess in"
                  multiple={true} onIonChange={($event) => setminutevalues($event)} >
                  {minutes && minutes.map((minute, idx) =>
                    <IonSelectOption value={minute}>{minute}</IonSelectOption>
                  )}
                </IonSelect>
              </IonItem>
            </IonList>
          </IonItem>

          <IonItem>

            <IonButton type="submit" disabled={false} shape="round" color="danger" size="default">Accept</IonButton>

          </IonItem>

          {isDeleteButtonVisible &&
            <IonItem>
              <IonButton shape="round" color="warning" size="default" onClick={() => delete_()} >Delete</IonButton>
            </IonItem>
          }
        </form >

      </IonList >
    </>
  );
};

export default TurnRage;
































