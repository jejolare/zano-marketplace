import React, { Suspense, useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.scss';
import { isTemplatePrepared, checkAuth, redefineStyle } from "./utils/utils";
import { Store } from "./store/store-reducer";
import { updateMarketState, updateAdminState, updateConfigState } from "./store/actions";
import AdminHandler from "./pages/Admin/AdminHandler";
import Preloader from "./components/Preloader/Preloader";

const MainPage = React.lazy(() => import('./pages/Main/Main'));
const AdminPage = React.lazy(() => import('./pages/Admin/Admin'));
const NewOfferPage = React.lazy(() => import('./pages/NewOffer/NewOffer'));
const SetupPage = React.lazy(() => import('./pages/Setup/Setup'));


function App() {

  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    async function checkAppStatus() {
      const isPrepared = await isTemplatePrepared();

      if (!isPrepared) {
        updateMarketState(dispatch, false);
      } else {

        checkAuth()
        .then((res) => {
            if (res) updateAdminState(dispatch, true);
        });
        
      }

    }
    checkAppStatus();
  }, []);

  useEffect(() => {
    async function getConfig() {
        const configJson = await fetch('/api/data/get-config')
        .then(res => res.json())
        .then(json => JSON.parse(json.data || '{}'));
        
        updateConfigState(dispatch, {...configJson,  _DEFAULT: configJson });
        for (const iterator of (configJson.styles || [])) {
          redefineStyle(iterator.property, iterator.value);
        }
    }
    getConfig();
  }, [state.isPrepared]);

  function RouteStylesHandler() {

    const location = useLocation();

    useEffect(() => {


      // We can compare objects here as they should be identical if the user is not on styles page.
      if (
        (JSON.stringify(state.config?.offerConfig) !== JSON.stringify(state.config?._DEFAULT?.offerConfig)) &&
        location.pathname !== '/admin/styles' 
      ) {
        updateConfigState(dispatch, {...state.config, offerConfig: state.config?._DEFAULT?.offerConfig });
      }

      for (const iterator of (state.config?.styles || [])) {
        redefineStyle(iterator.property, iterator.value);
      }
    }, [location.pathname]);

    return (<></>);
  }

  const [stylesLoaded, setStylesLoaded] = useState(false);

  useEffect(() => {

    const timeout = setTimeout(() => {
      if (state.config.styles[0] && !stylesLoaded) {
        setStylesLoaded(true);
      }
    }, 1000);

    return () => clearTimeout(timeout);

  }, [state.config.styles]);

  if (!state.config.styles[0]) return <></>;


  return (
    <div className="App">

      {!stylesLoaded &&
        <Preloader fullPage={true}/>
      }

      <Router>
        <Suspense fallback={<></>}>
          <Routes>
            {state.isPrepared &&
              <>
                <Route exact path="/" element={<MainPage/>}/>
                {state.isAdmin && <Route exact path="/editor" element={<MainPage/>}/>}
                <Route exact path="/offer/add" element={<NewOfferPage/>}/>
                <Route exact path="/admin" element={<AdminPage/>}/>
                <Route exact path="/admin/:type" element={<AdminPage/>}/>
                <Route exact path="/auth" element={<SetupPage/>}/>
              </>
            }
            {!state.isPrepared && 
              <Route exact path="/*" element={<SetupPage/>}/>
            }
          </Routes>
          <RouteStylesHandler/>
          <AdminHandler/>
         </Suspense> 
      </Router>
    </div>
  );
}

export default App;
