import React from "react";
import { useLocation } from "react-router-dom";

const EmployeeCard = () => {
  const { state } = useLocation();

  const user = state.user;

  return (
    <div className="min-h-screen flex items-center justify-center mx-1 md:mx-5">
      <div className="w-full md:w-2/5 p-2 lg:p-5 bg-gray-100 rounded-t-xl shadow-lg">
        <div className="font-bold text-center text-2xl mt-2 text-dark p-2">
          {user.name}
        </div>
        <div className="font-regular text-lg text-center mt-1 p-2">
          Phone Number-{user.phoneno}
        </div>
        {
            user.gender ? 
            (
                <div className="flex bg-gray-400 rounded-md flex-col justify-between items-center">
                <div className="p-3 w-full shadow-lg flex flex-col justify-between items-center">
                  <h1 className="text-white font-bold text-lg">Gender</h1>
                  <div className="text-white text-lg capitalize px-5 py-2 rounded-full bg-green-400 shadow-lg">{user.gender}</div>
                </div>
                <div className="px-4 w-full py-3 shadow-lg flex flex-col justify-between items-center">
                  <h1 className="text-white font-bold text-lg">Years of Experience</h1>
                  <div className="text-white text-lg capitalize px-5 p-3 rounded-full bg-green-400 shadow-lg">{user.yearsOfExperience}</div>
                </div>
                <div className="px-4 w-full py-3 shadow-lg flex flex-col justify-between items-center">
                  <h1 className="text-white font-bold text-lg">Age</h1>
                  <div className="text-white text-lg capitalize px-5 p-3 rounded-full bg-green-400 shadow-lg">{user.age}</div>
                </div>
                <div className="px-4 w-full py-3 shadow-lg flex flex-col justify-between items-center">
                  <h1 className="text-white font-bold text-lg">Address</h1>
                  <div className="text-white text-lg capitalize px-5 p-3 rounded-full bg-green-400 shadow-lg">{user.address}</div>
                </div>
              </div>    
            ) : <div className="text-center text-md px-5 py-3 bg-red-300 mt-3 rounded-t-md shadow-lg">This Employee has not filled his Profile</div>
        }
             
        </div>
      </div>
    
  );
};

export default EmployeeCard;
