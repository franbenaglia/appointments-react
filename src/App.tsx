import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router-dom';
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
import { isLoggedIn } from './helpers/AuthHelper';
import { useEffect, useState } from 'react';
import SuccessPaymentPage from './pages/SuccessPaymentPage';

setupIonicReact();

const App: React.FC = () => {

  //let [renderMenu, setRenderMenu] = useState(false);
  const history = useHistory();

  const logged = async () => {
    const islog = await isLoggedIn();
    if (!islog) {
      history.push('/Login')
    }
    //setRenderMenu(islog);
  }

  useEffect(() => {
    logged();
  }, []);

  return (
    <IonApp>
      <AppProvider>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
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
              <Route path="/Logout" exact={true}>
                <LogoutPage />
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
                <Redirect to="/folder/Inbox" />
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
