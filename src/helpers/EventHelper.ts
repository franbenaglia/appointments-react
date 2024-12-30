import { getAvailableRangeTurns } from "../api/TurnsApi";
import { AvailableRangeTurns } from "../model/availablerangeturns";

export const init = async () => {
    const es = await getAvailableRangeTurns();
    setEvents(es);
};

const events: Array<AvailableRangeTurns> = [];

export const setEvents = (events: Array<AvailableRangeTurns>) => events.push(...events);

export const addEvent = (e: any) => events.push(e);

export const deleteEvent = (e: any) => {
    let x = events.filter(item => item._id !== e._id);
    events.length = 0;
    events.push(...x);
}

export const getEvents = (): Array<AvailableRangeTurns> => events;