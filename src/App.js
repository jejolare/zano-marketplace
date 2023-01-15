import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';
const MainPage = React.lazy(() => import('./pages/Main/Main'));
const AdminPage = React.lazy(() => import('./pages/Admin/Admin'));
const NewOfferPage = React.lazy(() => import('./pages/NewOffer/NewOffer'));


function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<></>}>
          <Routes>
            <Route exact path="/" element={<MainPage/>}/>
            <Route exact path="/offer/add" element={<NewOfferPage/>}/>
            <Route exact path="/admin" element={<AdminPage/>}/>
          </Routes>
         </Suspense> 
      </Router>
    </div>
  );
}

export default App;
