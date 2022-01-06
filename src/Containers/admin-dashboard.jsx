import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "../Components/AdminSidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseCircle, AiOutlineLogout } from "react-icons/ai";
import AllEmployee from "../Components/AllEmployee";
import SignUp from "../Components/SignUp";
import LeaveRequestAdmin from "../Components/leave-requests";
import { useEffect } from "react/cjs/react.development";
import EmployeeCard from "../Components/EmployeeCard";

const AdminDashboard = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))


  useEffect(()=>{
    if(!user)
    navigate("/auth/login",{replace: true})
    else if(user.type==="employee")
    navigate("/employee",{replace: true})
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="flex flex-col md:flex-row justify-between ">
      <div className="sticky top-0 left-0 hidden md:flex h-screen overflow-y-auto flex-initial">
        <Sidebar />
      </div>
      <div className="md:hidden sticky top-0 bg-white shadow-md flex justify-between items-center py-3 px-4">
        <span
          className="p-2 shadow-lg rounded-full md:hidden cursor-pointer  transition-all duration-150 ease-in-out bg-gray-400 hover:bg-gray-200 z-5"
          onClick={(e) => setToggleSidebar(!toggleSidebar)}
        >
          {toggleSidebar ? (
            <AiFillCloseCircle
              fontSize={20}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(false)}
            />
          ) : (
            <GiHamburgerMenu fontSize={20} />
          )}
        </span>
        <span className="text-2xl text-gray-500 ">Leave Approval</span>
        <span className="flex justify-between items-center p-2 pl-4 shadow-lg rounded-full md:hidden cursor-pointer  transition-all duration-150 ease-in-out bg-gray-400 hover:bg-gray-200">
          <span className="mr-3">Logout</span>
          <AiOutlineLogout />
        </span>
      </div>
      {toggleSidebar && (
        <div className="md:hidden fixed w-3/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
           <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
        </div>
      )}
      <div className="pb-2 flex-1 h-full overflow-y-auto hide-scrollbar bg-gray-200">
        <Routes>
          <Route path="/add" element={<SignUp />} />
          <Route path="/leave" element={<LeaveRequestAdmin />} />
          <Route path="/" element={<AllEmployee />} />
          <Route path="/:phoneno" element={<EmployeeCard/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
