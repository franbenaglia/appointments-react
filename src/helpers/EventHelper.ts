import { AvailableRangeTurns } from "../model/availablerangeturns";

export const init = () => getAvailableRangeTurns().subscribe(es => {
    setEvents(es);
});

const event: Array<AvailableRangeTurns> = [];

export const setEvents = (events: Array<AvailableRangeTurns>) => event.push(...events);

export const addEvent = (e: any) => event.push(e);

export const deleteEvent = (e: any) => {
    let x = event.filter(item => item._id !== e._id);
    event.length = 0;
    event.push(...x);
}

export const getEvents = (): Array<AvailableRangeTurns> => event;