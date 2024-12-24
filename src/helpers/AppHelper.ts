import { BehaviorSubject, Observable } from 'rxjs';

const hiddenMenu: BehaviorSubject<boolean> = new BehaviorSubject(false);

const theevent: BehaviorSubject<string> = new BehaviorSubject('');

export const getTheEvent = () => theevent.asObservable();

export const setTheEvent = (event: string) => theevent.next(event);

export const getHiddenMenu = () => hiddenMenu.asObservable();

export const setHiddenMenu = (hidden: boolean) => hiddenMenu.next(hidden);