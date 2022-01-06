import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import EmployeeSidebar from "../Components/EmployeeSidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseCircle, AiOutlineLogout } from "react-icons/ai";
import EmployeeProfile from "../Components/EmployeeProfile";
import MakeLeaveRequest from "../Components/MakeLeaveRequest";
import LeaveRequestHistory from "../Components/LeaveRequestHistory";


const EmployeeDashboard = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/auth/login", { replace: true });
    else if (user.type === "employee") navigate("/employee", { replace: true });
    else if (user.type === "admin") navigate("/admin", { replace: true });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login", { replace: true });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between ">
        <div className="sticky top-0 left-0 hidden md:flex h-screen overflow-y-auto flex-initial">
          <EmployeeSidebar />
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
          <span
            onClick={handleLogout}
            className="flex justify-between items-center p-2 pl-4 shadow-lg rounded-full md:hidden cursor-pointer  transition-all duration-150 ease-in-out bg-gray-400 hover:bg-gray-200"
          >
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
            <EmployeeSidebar closeToggle={setToggleSidebar} />
          </div>
        )}
        {/* {
                    toggleSidebar && (
                        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                            <div className="absolute w-full flex justify-end items-center p-2">
                                <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
                            </div>
                            <Sidebar user={user && user} closeToggle={setToggleSidebar} />

                        </div>
                    )
                } */}
        <div className="pb-2 flex-1 h-full overflow-y-auto hide-scrollbar min-h-screen bg-gray-600">
          {user && (
            <Routes>
              <Route path="/" element={<EmployeeProfile />} />
              <Route path="/add-request" element={<MakeLeaveRequest />} />
              <Route path="/history" element={<LeaveRequestHistory />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
