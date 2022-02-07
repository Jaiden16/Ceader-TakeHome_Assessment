// import './App.css';
import Navbar from './Components/NavBar';
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Appointment from './Pages/Appointments';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/'element={<HomePage/>}/>
        <Route path='/appointments'element={<Appointment/>}/>
      </Routes>
    </div>
  );
}

export default App;
