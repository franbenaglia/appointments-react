import axios from "axios";
import { User } from "../model/user";
const URL_RESOURCE_SERVER = import.meta.env.VITE_URL_RESOURCE_SERVER;


export const registerUser = async (user: User) => {

  //const token = await getToken();

  try {

    return await axios.post(URL_RESOURCE_SERVER + '/register', user, {
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

export const login = async (user: User) => {

  //const token = await getToken();

  try {

    return await axios.post(URL_RESOURCE_SERVER + '/login', user, {
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






