import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import EmployeeDashboard from "./employee-dashboard";
import AdminDashboard from "./admin-dashboard";
const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // const user = JSON.parse(localStorage.getItem('user'))
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(()=>{
    if(location.pathname==="/") {
      if(user)
      navigate(`/${user.type}`,{replace:true})
      else
      navigate("/auth/login",{replace:true})
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div>
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard/>}/>
        <Route path="/employee/*" element={<EmployeeDashboard/>}/>
      </Routes>
    </div>
  );
};

export default Home;
