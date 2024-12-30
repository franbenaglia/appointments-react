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
import { useContext } from 'react';
import { AppContext, AppContextI } from '../context/AppContext';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  role: Permission;
}

export enum Permission {
  admin,
  client,
  both,
}

const appPages: AppPage[] = [
  {
    title: 'Inbox',
    url: '/folder/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.admin
  },
  {
    title: 'Logout',
    url: '/Logout',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.admin
  },

  {
    title: 'TurnList',
    url: '/TurnList',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.admin
  },

  {
    title: 'TurnEdit',
    url: '/TurnEdit',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.admin
  },

  {
    title: 'TurnRangeList',
    url: '/TurnRangeList',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.admin
  },

  {
    title: 'TurnRange',
    url: '/TurnRange',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    role: Permission.admin
  },

];

const Menu: React.FC = () => {
  const location = useLocation();

  const { user } = useContext<AppContextI>(AppContext);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>Appointment</IonNote>
          <IonNote>{user ? user.email : 'anonimo'}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
