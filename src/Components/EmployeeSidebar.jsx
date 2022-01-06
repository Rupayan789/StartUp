import React from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeSidebar = ({ closeToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear()
    navigate("/auth/login",{replace: true})
  }
  return (

      <div className="flex flex-col justify-start bg-primary min-h-screen overflow-y-auto  min-w-210 hide-scrollbar">
        <h1 className="pt-4 px-4 mb-8 md:text-2xl text-xl text-white text-center">
          Employee Dashboard
        </h1>
        <Link
          to="/employee"
          onClick={() => !!closeToggle && closeToggle(false)}
          className="flex items-center hover:shadow-lg justify-center text-xl py-10 text-white   opacity-70 hover:opacity-100 hover:bg-secondary w-full px-5"

        >
          <div>Profile</div>
        </Link>
        <Link
          to="/employee/add-request"
          onClick={() => !!closeToggle && closeToggle(false)}
          className="flex items-center hover:shadow-lg justify-center text-xl py-10 text-white  opacity-70 hover:opacity-100 hover:bg-secondary w-full px-5"
        >
          <div>Leave Request</div>
        </Link>
        <Link
          to="/employee/history"
          onClick={() => !!closeToggle && closeToggle(false)}
          className="flex items-center hover:shadow-lg justify-center text-xl py-10 text-white  opacity-70 hover:opacity-100 hover:bg-secondary w-full px-5"
        >
          <div>History</div>
        </Link>
        <div>
          <div 
          onClick={handleLogout}
          className="flex items-center mt-auto hover:shadow-lg justify-center text-xl py-10 text-white  opacity-70 hover:opacity-100 hover:bg-secondary w-full px-5">
            Logout
          </div>
        </div>
      </div>

  );
};

export default EmployeeSidebar;
