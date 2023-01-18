import React, { Suspense, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';
import { isTemplatePrepared } from "./utils/utils";
import { Store } from "./store/store-reducer";
import { updateMarketState } from "./store/actions";

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
      }
    }
    checkAppStatus();
  }, []);

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<></>}>
          <Routes>
            {state.isPrepared &&
              <>
                <Route exact path="/" element={<MainPage/>}/>
                <Route exact path="/offer/add" element={<NewOfferPage/>}/>
                <Route exact path="/admin" element={<AdminPage/>}/>
                <Route exact path="/auth" element={<SetupPage/>}/>
              </>
            }
            {!state.isPrepared && 
              <Route exact path="/" element={<SetupPage/>}/>
            }
          </Routes>
         </Suspense> 
      </Router>
    </div>
  );
}

export default App;
