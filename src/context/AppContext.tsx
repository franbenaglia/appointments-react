import { createContext, useState } from "react";
import { User } from "../model/user";


export interface AppContextI {

    user: User,
    setUser: (user: User) => void,
    ev: string,
    setEv: (ev: string) => void,
    idTurn: string,
    setIdTurn: (ev: string) => void,
}

export const AppContext = createContext<AppContextI>(null);

export const AppProvider = ({ children }: any) => {

    const [user, setUser] = useState({} as User);
    const [ev, setEv] = useState('');
    const [idTurn, setIdTurn] = useState('');

    return (
        <AppContext.Provider value={{
            user, setUser, setEv, ev, idTurn, setIdTurn
        }}>
            {children}
        </AppContext.Provider>
    );

}