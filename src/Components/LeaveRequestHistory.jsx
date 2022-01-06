import { child, equalTo, get, orderByChild, query } from "firebase/database";
import { databaseRef as dbRef } from "../config";
import React, { useEffect, useState } from "react";

const LeaveRequestHistory = () => {
  const [lr, setLr] = useState([]);
  const phoneno="1234567891"

  useEffect(() => {
    get(query(query(child(dbRef, "users"), orderByChild("phoneno")),equalTo(phoneno))).then(
      (snapShot) => {
        setLr(Object.values(Object.values(snapShot.val())[0].leaveRequests));
       
      }
    );
  }, []);

  return (
    <div className="p-2 md:p-5 min-h-screen z-20">
      <div>
        <h1 className=" text-2xl text-white py-4 px-3 pl-5  shadow-lg inset-y-2 rounded-lg h-full w-full bg-primary">
          History
        </h1>
        <div className="mt-5  bg-gray-400 shadow-lg p-2 md:p-5 rounded-lg">
          {lr.map((item, index) => (
            <div key={index} className="p-2 md:p-4 bg-white rounded-lg mb-4">
              <div className="flex justify-between items-center px-2">
                <div className="text-md  text-black mb-2">
                  Date - {item.date}
                </div>
                <div className={`text-md text-gray-600 mb-2 px-4 py-2 capitalize rounded-md ${item.status==='pending' ? 'bg-yellow-300' : item.status ==='approved' ? 'bg-green-300' : 'bg-red-300'}`}>
                  {item.status}
                </div>
              </div>

              <div className="text-md text-black px-2">
                Reason - {item.reason}
              </div>
              <div className="text-md text-black px-2 flex justify-end items-center">
                 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestHistory;
