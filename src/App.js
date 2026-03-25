import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/header";
import Signup from "./Components/Signup/signup";
import Login from "./Components/Login/login";
import Dashboard from "./Components/Dashboard/dashboard";
import Dashboardviode from "./Components/Dashboard/dashboardvideo/dashboardviode";
import Dashboardquiz from "./Components/Dashboard/dashboradquiz/dashboardquiz";
import Dashboardnotes from "./Components/Dashboard/dashboardnotes/dashboardnotes";
import Dashboardprogress from "./Components/Dashboard/dashboardprogress/dashboardprogress";
import { useEffect, useState } from "react";
import About from "./Components/Header/About/about";
import Contact from "./Components/Header/Contact/contact";
import Dashboardtotaltopic from "./Components/Dashboard/dashboardprogress/dashboardtotaltopic";
import Dashboardweakconcept from "./Components/Dashboard/dashboardprogress/dashboardweakconcept";
import Forgotpassword from "./Components/Login/forgotpassword";
import Resetpassword from "./Components/Login/resetpassword";
import AdminLogin from "./Components/Login/Admin/adminlogin";
import Adminpage from "./Components/Login/Admin/adminpage";
import './i18n';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("keepLoggedIn")));

  useEffect(() => {
    const authStatus = JSON.parse(localStorage.getItem("keepLoggedIn"));
    setIsLoggedIn(authStatus);
  }, [])
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to={'/dashboard'} /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/video" element={<Dashboardviode />} />
          <Route path="/quiz" element={<Dashboardquiz />} />
          <Route path="/note" element={<Dashboardnotes />} />
          <Route path="/progress" element={<Dashboardprogress />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/TotalTopic" element={<Dashboardtotaltopic />} />
          <Route path="/WeakConcept" element={<Dashboardweakconcept />} />
          <Route path="/forgot" element={<Forgotpassword />} />
          <Route path="/resetpassword/:token" element={<Resetpassword />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminpage" element={<Adminpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
