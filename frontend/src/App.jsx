import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./signup.jsx";
import Login from "./login.jsx";
import Home from "./home.jsx";
import Profile from "./profile.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/candidateprofile" element={<candidateprofile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
