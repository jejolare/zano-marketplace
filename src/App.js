import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';
import MainPage from './pages/Main/Main';
import AdminPage from './pages/Admin/Admin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route exact path="/" element={<MainPage/>}/>
            <Route exact path="/admin" element={<AdminPage/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
