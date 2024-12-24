import { AvailableRangeTurns } from "./availablerangeturns";
import { Turn } from "./turn";

export class AvailableDates {

    constructor() { }

    public range: AvailableRangeTurns[] = [];
    public datesUsed : string[] = [];
    public timeFree:  string[] = [];

}