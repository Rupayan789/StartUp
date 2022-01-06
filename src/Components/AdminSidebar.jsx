import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ closeToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login", { replace: true });
  };
  return (
    <div className="flex flex-col justify-start bg-primary min-h-screen overflow-y-auto  min-w-210 hide-scrollbar">
      <h1 className="pt-4 px-4 mb-8 md:text-2xl text-xl text-white text-center">
        Admin Dashboard
      </h1>

      <Link
        to="/admin"
        onClick={() => !!closeToggle && closeToggle(false)}
        className="flex items-center hover:shadow-lg justify-center text-xl py-10 text-white   opacity-70 hover:opacity-100 hover:bg-secondary w-full px-5"
      >
        <div>All Employees</div>
      </Link>
      <Link
        to="/admin/add"
        onClick={() => !!closeToggle && closeToggle(false)}
        className="flex items-center hover:shadow-lg justify-center text-xl py-10 text-white  opacity-70 hover:opacity-100 hover:bg-secondary w-full px-5"
      >
        <div>Add Employee</div>
      </Link>
      <Link
        to="/admin/leave"
        onClick={() => !!closeToggle &&  closeToggle(false)}
        className="flex items-center hover:shadow-lg justify-center text-xl py-10 text-white  opacity-70 hover:opacity-100 hover:bg-secondary w-full px-5"
      >
        <div>Leave Requests</div>
      </Link>

      <div
        onClick={handleLogout}
        className="flex items-center mt-auto hover:shadow-lg justify-center text-xl py-10 text-white  opacity-70 hover:opacity-100 hover:bg-secondary w-full px-5"
      >
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
