import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "../pages/LoginRegister/LoginRegister.jsx";
import Register from "../pages/Register/Register.jsx";
import Activities from "../pages/Activities/Activities.jsx";
import Historico from "../pages/History/History.jsx"
import PrivateRoute from "./PrivateRoute.jsx";
import Ranking from "../pages/Ranking/Ranking.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/activities" 
        element={
        <PrivateRoute>
          <Activities />
        </PrivateRoute>
        }/>
        <Route path="/history" 
        element={
        <PrivateRoute>
          <Historico />
        </PrivateRoute>
        }/>
        <Route path="/ranking" 
        element={
          <PrivateRoute>
            <Ranking />
          </PrivateRoute>
        }/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;