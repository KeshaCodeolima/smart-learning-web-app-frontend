import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/header";
import Signup from "./Components/Signup/signup";
import Login from "./Components/Login/login";
import Dashboard from "./Components/Dashboard/dashboard";
import Dashboardviode from "./Components/Dashboard/dashboardvideo/dashboardviode";
import Dashboardquiz from "./Components/Dashboard/dashboradquiz/dashboardquiz";

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path ="/login" element={<Login/>}/>
      <Route path ="/signup" element={<Signup/>}/>
      <Route path = "/" element={<Dashboard/>}/>
      <Route path="/video" element={<Dashboardviode/>}/>
      <Route path="/quiz" element={<Dashboardquiz/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
