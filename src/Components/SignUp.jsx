import React, { useState } from "react";
import {
  child,
  equalTo,
  get,
  orderByChild,
  push,
  query,
} from "firebase/database";
import { databaseRef as dbRef } from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
  const [phoneno, setPhoneno] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
  
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords doesn't match,Try again", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
      return;
    }
    try {
    
      const snapShot = await get(
        query(
          query(child(dbRef, "users"), orderByChild("phoneno")),
          equalTo(phoneno)
        )
      );
      if (snapShot.exists()) {
        toast.error("User already exists", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })
      
        return;
      }
    
     await push(child(dbRef, "users"), {
        type: "employee",
        phoneno: phoneno,
        name: name,
        leaves:0,
        leaveRequests: [],
      });
     
      toast.success('Successfully Added', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      
        setPhoneno("")
        setName("")
        setPassword("")
        setConfirmPassword("")
    } catch (e) {
      toast.error(e.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
  };
}
  
  return (
    <div className="App">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-gray-300 px-6 py-8 rounded shadow-xl text-black w-full">
            
            <h1 className="mb-8 text-3xl text-center">Sign up Employee</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Employee Name"
                name="name"
                value={name}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Employee phone number"
                name="phoneno"
                value={phoneno}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                onChange={(e) => setPhoneno(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Your Password"
                name="password"
                value={password}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirm-password"
                value={confirmPassword}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-600 hover:bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
    </div>
  );
};

export default SignUp;
