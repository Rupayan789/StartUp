import React, { useState , useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { databaseRef as dbRef, fireDB } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { child, equalTo, get, orderByChild, query } from "firebase/database";
import { useEffect } from "react/cjs/react.development";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Loader  from "react-loader-spinner"
const Login = () => {
  const [phoneno, setPhoneno] = useState("");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
    if(user){
      user.type === "employee" ? navigate('/employee',{replace:true}) : navigate('/admin',{replace:true})
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])





  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = await getAuth(fireDB);
    auth.useDeviceLanguage();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    let appVerifier = window.recaptchaVerifier;
    let PhoneNo = `+91${phoneno}`;
 
    signInWithPhoneNumber(auth, PhoneNo, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        let code = prompt("Enter the code sent");
        setLoading(true)
        confirmationResult
          .confirm(code)
          .then(async (result) => {
 
            const snapShot = await get(query(query(child(dbRef,"users"),orderByChild("phoneno")),equalTo(phoneno)));
            const data = snapShot.val();
            localStorage.setItem("user",JSON.stringify({...Object.values(data)[0],uuid:Object.keys(data)[0]}));
            console.log({...Object.values(data)[0],uuid:Object.keys(data)[0]})
            setLoading(false)
            navigate("/employee",{replace:true})
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          })
          });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })
      });
  };

  const handleAdminLogin = async (e) => {
    localStorage.setItem("user",JSON.stringify({type:"admin"}))
    navigate("/admin")
  }


  return (
    <div>
      <div className="App">
        {
          loading ? <div className="min-h-screen min-w-screen flex justify-center items-center">
           <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
            </div> : 
          <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Login</h1>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Enter your Phone Number"
                  name="phoneno"
                  value={phoneno}
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  onChange={(e) => setPhoneno(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-600 hover:bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Login
                </button>
                <div className="text-md text-center mt-5 ">
                  Login as <Link to="/admin" onClick={handleAdminLogin} className="text-blue-400">Admin</Link>
                </div>
                <div id="recaptcha-container"></div>
              </form>
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
        
          
        }
        
      </div>
    </div>
  );
};

export default Login;

