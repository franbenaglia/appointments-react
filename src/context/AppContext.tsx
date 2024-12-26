import { createContext, useState } from "react";
import { User } from "../model/user";


export interface AppContextI {

    user: User,
    setUser: (user: User) => void,
}

export const AppContext = createContext<AppContextI>(null);

export const AppProvider = ({ children }: any) => {

    const [user, setUser] = useState({} as User);

    return (
        <AppContext.Provider value={{
            user, setUser
        }}>
            {children}
        </AppContext.Provider>
    );

}