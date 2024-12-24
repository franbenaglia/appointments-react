import axios from "axios";
import { Email } from "../model/email";
const URL_RESOURCE_SERVER = import.meta.env.VITE_URL_RESOURCE_SERVER;

export const sendEmail = async (email: Email) => {

    //const token = await getToken();

    try {

        return await axios.post(URL_RESOURCE_SERVER + '/email', email, {
            headers: {
                //'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};