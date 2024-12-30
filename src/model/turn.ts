import { User } from "./user";

export class Turn {

    constructor() { }

    public _id: string;
    public date: Date;
    public user!: User;
    public cancelUser : Boolean;
    public cancelAdmin : Boolean;
    public event: string;
    public idTx: string;

}

