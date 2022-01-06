import {
  child,
  equalTo,
  get,
  orderByChild,
  query,
  update,
} from "firebase/database";
import { databaseRef as dbRef } from "../config";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";

const LeaveRequestAdmin = () => {
  const [lr, setLr] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setLoading(true)
    get(query(child(dbRef, "leave-requests"), orderByChild("date"))).then(
      (snapShot) => {
        setLr(
          Object.entries(snapShot.val()).filter(
            (item) => item[1].status === "pending"
          )
        );
        setLoading(false)
      }
    );
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (item) => {
    update(child(dbRef, "leave-requests/" + item[0]), {
      status: "approved",
    });
    update(
      query(
        query(
          child(dbRef, "users/" + user.uuid + "/leaveRequests"),
          orderByChild("date")
        ),
        equalTo(item[1].date)
      ),
      {
        status: "approved",
      }
    );
    window.location.reload();
  };

  const handleReject = async (item) => {
    update(child(dbRef, "leave-requests/" + item[0]), {
      status: "rejected",
    });

    const snapShot = await get(
      query(
        query(child(dbRef, "users"), orderByChild("phoneno")),
        equalTo(item[1].phoneno)
      )
    );
    const data = snapShot.val();
    let leaveR = Object.values(data)[0].leaveRequests;
    let uid = Object.keys(data)[0];

    let emptyObj = {};
    for (var key in leaveR) {
      // skip loop if the property is from prototype
      if (!leaveR.hasOwnProperty(key)) continue;
      var obj = leaveR[key];

      let emptyObj2 = {};
      for (var prop in obj) {
        // skip loop if the property is from prototype
        if (!obj.hasOwnProperty(prop)) continue;

        // your code
        if (prop === "status") obj[prop] = "rejected";
        emptyObj2[prop] = obj[prop];
      }
      emptyObj[key] = emptyObj2;
    }
    update(child(dbRef, "users/" + uid + "/leaveRequests"), emptyObj)
      .then(() => console.log("Done"))
      .catch((err) => console.log(err.message));

    window.location.reload();
  };
  if (loading)
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );
  return (
    <div className="p-2 md:p-5 min-h-screen z-20">
      <div>
        <h1 className=" text-2xl text-white py-4 px-3 pl-5  shadow-lg inset-y-2 rounded-lg h-full w-full bg-primary">
          List of all Recent Leave Requests
        </h1>
          <div className="mt-5  bg-gray-400 shadow-lg p-2 md:p-5 rounded-lg">
            {lr.length > 0 ? (
              lr.map((item, index) => (
                <div
                  key={index}
                  className="p-2 mt-2 md:p-4 bg-white rounded-md"
                >
                  <div className="flex justify-between items-center px-2">
                    <div className="text-md  text-black mb-2">
                      Name - {item[1].name}
                    </div>
                    <div className="text-md  text-black mb-2">
                      Phone Number - {item[1].phoneno}
                    </div>
                    <div className="text-md  text-black mb-2">
                      Date - {item[1].date}
                    </div>
                  </div>

                  <div className="text-md  text-black px-2 my-3">
                    Reason - {item[1].reason}
                  </div>
                  <div className="text-md  text-black px-2 flex justify-end items-center">
                    <div className="flex justify-between items-center">
                      <button
                        className="px-4 py-3 text-md mr-4 rounded-md shadow-lg text-white bg-green-500"
                        onClick={() => handleApprove(item)}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-3 text-md rounded-md shadow-lg text-white bg-red-500"
                        onClick={() => handleReject(item)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h1>All Cleared!!</h1>
                <div>No pending leave requests are found</div>
              </div>
            )}
          </div>
      
      </div>
    </div>
  );
};

export default LeaveRequestAdmin;
