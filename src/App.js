import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/header";
import Signup from "./Components/Signup/signup";

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path ="/" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
