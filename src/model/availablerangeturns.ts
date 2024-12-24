export class AvailableRangeTurns {

    constructor() { }

    public _id: string;
    public event: string;
    //dates availables
    public dayValues: number[] = [];
    public hourValues: number[] = [];
    public minuteValues: number[] = [];
    public minDate: string;
    public maxDate: string;
    public weekends: Boolean;
    public specificdays: string[] = [];

}