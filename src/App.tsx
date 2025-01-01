import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import TurnEditPage from './pages/TurnEditPage';
import TurnRangePage from './pages/TurnRangePage';
import LogoutPage from './pages/LogoutPage';
import TurnListRangePage from './pages/TurnListRangePage';
import TurnListPage from './pages/TurnListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AppProvider } from './context/AppContext';
import SuccessPaymentPage from './pages/SuccessPaymentPage';
import { useEffect, useState } from 'react';
import { isLoggedIn, setGoogleJwtToken } from './helpers/AuthHelper';
import { useCookies } from 'react-cookie';
import TurnDetailPage from './pages/TurnDetailPage';
import SelectEventPage from './pages/SelectEventPage';

setupIonicReact();

const App: React.FC = () => {

  const [renderMenu, setRenderMenu] = useState(false);

  const [cookies] = useCookies(['googleJwtToken']);

  const logged = async () => {
    if (cookies.googleJwtToken) {
      await setGoogleJwtToken(cookies.googleJwtToken)
    }
    const islog = await isLoggedIn();

    if (!islog) {
      setRenderMenu(false);
    } else {
      setRenderMenu(true);
    }

  }

  useEffect(() => {
    logged();
  }, []);

  return (
    <IonApp>
      <AppProvider>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            {renderMenu ? <Menu /> : ''}
            <IonRouterOutlet id="main">
              <Route path="/TurnListRange" exact={true}>
                <TurnListRangePage />
              </Route>
              <Route path="/TurnList" exact={true}>
                <TurnListPage />
              </Route>
              <Route path="/TurnEdit" exact={true}>
                <TurnEditPage />
              </Route>
              <Route path="/TurnRange" exact={true}>
                <TurnRangePage />
              </Route>
              <Route path="/TurnRange/:id" exact={true}>
                <TurnRangePage />
              </Route>
              <Route path="/TurnDetail/:id" exact={true}>
                <TurnDetailPage />
              </Route>
              <Route path="/Logout" exact={true}>
                <LogoutPage />
              </Route>
              <Route path="/SelectEvent" exact={true}>
                <SelectEventPage />
              </Route>
              <Route path="/Login" exact={true}>
                <LoginPage />
              </Route>
              <Route path="/Register" exact={true}>
                <RegisterPage />
              </Route>
              <Route path="/SuccessPayment" exact={true}>
                <SuccessPaymentPage />
              </Route>
              <Route path="/" exact={true}>
                <Redirect to="/folder/HomePage" />
              </Route>
              <Route path="/folder/:name" exact={true}>
                <Page />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </AppProvider>
    </IonApp>
  );
};

export default App;
