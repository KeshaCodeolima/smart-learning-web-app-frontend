import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/header";
import Signup from "./Components/Signup/signup";
import Login from "./Components/Login/login";

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path ="/" element={<Login/>}/>
      <Route path ="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
