import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { mailOutline, mailSharp } from 'ionicons/icons';
import './Menu.css';
import { useContext, useEffect } from 'react';
import { AppContext, AppContextI } from '../context/AppContext';
import { getUser } from '../api/UserApi';
import { logout } from '../helpers/AuthHelper';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  role: Permission;
}

export enum Permission {
  admin,
  user,
  all,
}

const appPages: AppPage[] = [
  /*
   {
     title: 'Inbox',
     url: '/folder/Inbox',
     iosIcon: mailOutline,
     mdIcon: mailSharp,
     role: Permission.admin
   },
 */
  {
    title: 'Turn List',
    url: '/TurnList',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.all
  },

  {
    title: 'New Turn',
    url: '/TurnEdit',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.all
  },

  {
    title: 'Turn Range List',
    url: '/TurnListRange',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.all
  },

  {
    title: 'New Turn Range',
    url: '/TurnRange',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.all
  }
  ,
  {
    title: 'Select Event',
    url: '/SelectEvent',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.all
  },

  {
    title: 'Logout',
    url: '/Logout',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.all
  },

];

const Menu: React.FC = () => {
  const location = useLocation();

  const { setUser, user } = useContext<AppContextI>(AppContext);

  const init = async () => {

    const us = await getUser();

    setUser(us.data);

    if (us.response.status === 401) {
      await logout();
      window.location.replace('/');
    }

  }

  useEffect(() => {
    init()
  }, []);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Appointments</IonListHeader>
          <IonNote>{'User: ' + (user ? user.email : 'anonimo')}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                {(user.role === appPage.role.toString() || (appPage.role === Permission.all)) ?
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem> : ''
                }
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
