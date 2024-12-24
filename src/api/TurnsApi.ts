import axios from "axios";
import { getOGoogleJwtToken, getTokenJwt } from "../helpers/AuthHelper";
import { Turn } from "../model/turn";
import { AvailableRangeTurns } from "../model/availablerangeturns";
import { AvailableDates } from "../model/availabledates";

const URL_RESOURCE_SERVER = import.meta.env.VITE_URL_RESOURCE_SERVER;
const baseURL: string = URL_RESOURCE_SERVER + "/turn/";

type ApiResponse = { page: number, per_page: number, total: number, total_pages: number, results: Turn[] }

export const getToken = async () => {

    let token = (await getTokenJwt()).value;

    if (!token) {
        token = (await getOGoogleJwtToken()).value
    }

    return token;

}

export const getAllEvents = async () => {

    //const token = await getToken();

    try {

        return await axios.get<string[]>(baseURL + 'allEvents');

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const getAvailableRangeTurnById = async (id: string) => {

    //const token = await getToken();

    try {

        return await axios.get<AvailableRangeTurns>(baseURL + 'availableRangeById/' + id);

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const getAvailableRangeTurns = async () => {

    //const token = await getToken();

    try {

        return await axios.get<AvailableRangeTurns[]>(baseURL + 'availableRange');

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const getAvailableTurns = async (event: String) => {

    //const token = await getToken();

    try {

        return await axios.get<AvailableRangeTurns>(baseURL + 'availableRange/' + event);

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const getAvailableTurnsWithSelectedDates = async (event: String) => {

    //const token = await getToken();

    try {

        return await axios.get<AvailableDates>(baseURL + 'availableDates/' + event);

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const getAvailableTurnsTimes = async (event: String, date: String) => {

    //const token = await getToken();

    try {

        return await axios.get<AvailableDates>(baseURL + 'availableTimesDates/' + event + '/' + date);

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

const createAvailableTurns = async (rangeTurn: AvailableRangeTurns) => {

    //const token = await getToken();
    const body = JSON.stringify(rangeTurn);

    try {

        return await axios.post<AvailableRangeTurns>(baseURL + 'availableRange', body, {
            headers: {
                //'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

const updateAvailableTurns = async (rangeTurn: AvailableRangeTurns) => {

    //const token = await getToken();
    const body = JSON.stringify(rangeTurn);

    try {

        return await axios.post<AvailableRangeTurns>(baseURL + 'availableRange/' + rangeTurn._id, body, {
            headers: {
                //'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const addTurn = async (turn: Turn) => {

    //const token = await getToken();
    const body = JSON.stringify(turn);

    try {

        return await axios.post<Turn>(baseURL, body, {
            headers: {
                //'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const updateTurn = async (turn: Turn) => {

    //const token = await getToken();
    const body = JSON.stringify(turn);

    let id: String = turn._id;

    try {

        return await axios.put<Turn>(baseURL + id, body, {
            headers: {
                //'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};



export const createOrUpdateAvailableTurns = (rangeTurn: AvailableRangeTurns) => {
    if (!rangeTurn._id) {
        return createAvailableTurns(rangeTurn);
    }
    return updateAvailableTurns(rangeTurn);
}


export const getAll = async () => {

    //const token = await getToken();

    try {

        return await axios.get<ApiResponse>(baseURL);

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const getTurnById = async (id: string) => {

    const token = await getToken();

    try {

        return await axios.get<Turn>(baseURL + id, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};



export const getPaginated = async (pageNumber: number, pageSize: number) => {

    //const token = await getToken();

    try {

        return await axios.get<ApiResponse>(baseURL + pageNumber + '/' + pageSize);

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const getPaginatedByUser = async (pageNumber: number, pageSize: number, email: string) => {

    //const token = await getToken();

    try {

        return await axios.get<ApiResponse>(baseURL + pageNumber + '/' + pageSize + '/' + email);

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};



export const deleteTurn = async (id: string) => {

    //const token = await getToken();

    try {

        return await axios.delete<Turn>(baseURL + id);

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};


export const deleteRangeTurn = async (id: string) => {

    //const token = await getToken();

    try {

        return await axios.delete<Turn>(baseURL + 'deleteRange/' + id);

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};
