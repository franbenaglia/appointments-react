import axios from "axios";
import { User } from "../model/user";
import { getOGoogleJwtToken, getTokenJwt } from "../helpers/AuthHelper";
const URL_RESOURCE_SERVER = import.meta.env.VITE_URL_RESOURCE_SERVER;

const baseURL: string = URL_RESOURCE_SERVER + "/api/v1/auth";


export const getToken = async () => {

    let token = (await getTokenJwt()).value;

    if (!token) {
        token = (await getOGoogleJwtToken()).value
    }

    return token;

}

export const getUsers = async (pageNumber: number, pageSize: number) => {

    //const token = await getToken();

    try {

        return await axios.get<any>(baseURL + '/user/');

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const getUser = async () => {

    const token = await getToken();

    try {

        return await axios.get<User>(baseURL + + '/profileWithJustToken', {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

