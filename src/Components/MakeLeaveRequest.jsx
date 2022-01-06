import {
  child,
  equalTo,
  get,
  orderByChild,
  push,
  query,
  set,
  update,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { databaseRef as dbRef } from "../config";
const MakeLeaveRequest = () => {
  const [leaveDate, setLeaveDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true)
  const [lrLeft, setLrLeft] = useState(10)
  let phoneno = "1234567891";
  let name = "Rupayan2";
 
  useEffect(() => {
    setLoading(true)
    get(
      query(
        query(child(dbRef, "users"), orderByChild("phoneno")),
        equalTo(phoneno)
      )
    ).then((snapShot) => {
      let leave = Object.values(snapShot.val())[0].leaves;
      setLrLeft(10-leave)
      setLoading(false)
    });



    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentDate = new Date();
    let ld = new Date(leaveDate);
    if (currentDate >= ld) {
      toast.error("You cannot make a leave request in past", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setLoading(true)
    const newKey = await push(child(dbRef, "leave-requests")).key;
    await set(child(dbRef, "leave-requests/" + newKey), {
      date: leaveDate,
      phoneno: phoneno,
      name: name,
      reason: reason,
      status: "pending",
    });
    const snapShot = await get(
      query(
        query(child(dbRef, "users"), orderByChild("phoneno")),
        equalTo(phoneno)
      )
    );
    let uuid = Object.keys(snapShot.val())[0];
    let leaves = Object.values(snapShot.val())[0].leaves;
    let userRef = child(dbRef, "users/" + uuid);
    let key = await push(child(userRef, "leaveRequests")).key;
    await set(child(userRef, "leaveRequests/" + key), {
      date: leaveDate,
      reason: reason,
      status: "pending",
      key: newKey,
    });
    update(userRef, {
      leaves: leaves !== undefined ? leaves + 1 : 0,
    });
    setReason("")
    setLeaveDate("")
    setLoading(false)

    await toast.success("Leave Request sent", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
 
  if (loading)
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );
  return lrLeft <= 10 ? (
    <div className="p-2 mt-5 md:mt-0 md:p-5">
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <div className="p-3 md:p-5 rounded-md shadow-lg inset-y-2 bg-primary">
        <h1 className="text-3xl text-white  text-left">Create Leave Request</h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="leave-date"
            className="block text-lg font-medium text-white mt-5 mb-2 "
          >
            Date of Leave
          </label>
          <input
            type="date"
            name="leave-date"
            id="leave-date"
            autoComplete="leave-date"
            required
            value={leaveDate}
            className="mt-1 p-4 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md w-3/5 md:w-2/5 focus:outline-none"
            onChange={(e) => setLeaveDate(e.target.value)}
          />
          <label
            htmlFor="leave-date"
            className="block text-lg font-medium text-white mt-5 mb-2 "
          >
            Reason of Leave
          </label>
          <textarea
            placeholder="Reason for Leave"
            className="text-grey-darkest flex-1 p-3 m-1 bg-white w-full rounded-md focus:outline-none"
            rows={"10"}
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{ resize: "none" }}
            required
          ></textarea>
          <div className="w-full flex justify-end items-center">
            <button
              className="bg-gray-600 hover:bg-gray-400  px-6 py-3 rounded-full ml-auto hover:shadow-xl transition duration-200 text-white"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      {/* <div className="mt-5 md:mt-10 bg-primary p-5 shadow-lg rounded-md text-white text-xl">
        Leave Requests left :{lrLeft}
      </div> */}
    </div>
  ) : (
    <div className="px-5 py-5">
      <div className="px-5 py-5 rounded-md border-2 border-black inset-y-2 bg-primary">
        <h1 className="text-3xl text-white  text-left">
          Sorry,you cannot take more Leave Request as you have already taken 10
          leave requests
        </h1>
      </div>
    </div>
  );
};

export default MakeLeaveRequest;
