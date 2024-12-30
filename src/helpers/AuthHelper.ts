import { Preferences } from "@capacitor/preferences";

const URL_RESOURCE_SERVER = import.meta.env.VITE_URL_RESOURCE_SERVER;

export const logout = async () => {
    removeGoogleJwtToken();
    removeTokenJwt();
    removeGoogleJwtTokenCookie();
}

const removeGoogleJwtTokenCookie = () => {
    //const [removeCookie] = useCookies(['googleJwtToken']);
    //removeCookie.googleJwtToken;
    document.cookie = "googleJwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const removeTokenJwt = async () => Preferences.remove({ key: 'tokenJwt' });

export const getTokenJwt = async () => Preferences.get({ key: 'tokenJwt' });

export const setTokenJwt = async (token: string) => {
    await Preferences.set({
        key: 'tokenJwt',
        value: token,
    });
};

const removeGoogleJwtToken = async () => Preferences.remove({ key: 'googleJwtToken' });

export const getOGoogleJwtToken = async () => Preferences.get({ key: 'googleJwtToken' });

export const setGoogleJwtToken = async (flag: string) => {
    await Preferences.set({
        key: 'googleJwtToken',
        value: flag,
    });
};

export const isLoggedIn = async (): Promise<boolean> => {
    if ((await getTokenJwt()).value || (await getOGoogleJwtToken()).value) {
        return true;
    } else {
        return false;
    }
}

export const googleOauth2Login = (): void => {
    window.open(URL_RESOURCE_SERVER + "/googleoauth2/google", "_self");
}

export const githubOauth2Login = (): void => {
    window.open(URL_RESOURCE_SERVER + "/googleoauth2/github", "_self");
}