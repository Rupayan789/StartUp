import {
  child,
  update,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { databaseRef as dbRef } from "../config";
const EmployeeProfile = () => {
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(0);
  const [yoe, setYoe] = useState(0);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setName(user.name);
    setPhoneno(user.phoneno);
    !!user.gender && setGender(user.gender);
    !!user.age && setAge(user.age);
    !!user.yoe && setYoe(user.yoe);
    !!user.address && setAddress(user.address);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    update(child(dbRef, "users/" + user.uuid), {
      gender: gender,
      age: age,
      yearsOfExperience: yoe,
      address: address,
      name: name,
    }).then((data) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: name,
          phoneno: phoneno,
          age: age,
          yoe: yoe,
          address: address,
          gender: gender,
          uuid: user.uuid,
        })
      );
      setLoading(false);
      window.location.reload();
    });
  };
  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
      </div>
    );
  return (
    <div className="pt-10 px-3 md:px-5 pb-5">
      <h1 className="text-3xl  text-white">Profile</h1>
      <div className="mt-3 shadow-xl py-10 px-5 rounded-md bg-light  bg-primary ">
        <form
          action="POST"
          onSubmit={handleSubmit}
          className=" grid grid-cols-2 gap-10"
        >
          <div className="md:col-span-1 col-span-2">
            <label
              htmlFor="first-name"
              className="block text-md font-medium text-gray-700 text-xl"
            >
              Name
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 p-2 text-md text-tertiary focus:outline-none focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="md:col-span-1 col-span-2">
            <label
              htmlFor="phone"
              className="block text-md font-medium text-gray-700 text-xl"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              autoComplete="phone"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
              required
              disabled={true}
              className="mt-1 p-2 text-md text-tertiary focus:outline-none focus:ring-primary focus:border-primary block w-full  border-gray-300 rounded-md"
            />
          </div>
          <div className="md:col-span-1 col-span-2">
            <label
              htmlFor="gender"
              className="block text-md font-medium text-gray-700 text-xl"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              required
              value={gender}
              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Others</option>
            </select>
          </div>
          <div className="md:col-span-1 col-span-2">
            <label
              htmlFor="age"
              className="block text-md font-medium text-gray-700 text-xl"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              autoComplete="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="mt-1 p-2 text-md text-tertiary focus:outline-none focus:ring-primary focus:border-primary block w-full  border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-1 col-span-2">
            <label
              htmlFor="yoe"
              className="block text-md font-medium text-gray-700 text-xl"
            >
              Years of Exprience
            </label>
            <input
              type="number"
              name="yoe"
              id="yoe"
              autoComplete="yoe"
              value={yoe}
              onChange={(e) => setYoe(e.target.value)}
              required
              className="mt-1 p-2 text-md text-tertiary focus:outline-none focus:ring-primary focus:border-primary block w-full  border-gray-300 rounded-md"
            />
          </div>
          <div className="md:col-span-1 col-span-2">
            <label
              htmlFor="address"
              className="block text-md font-medium text-gray-700 text-xl"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              autoComplete="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 p-2 text-md text-tertiary focus:outline-none focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-2 mt-auto ml-auto">
            <button
              className="bg-gray-600 hover:bg-gray-400  px-6 py-3 rounded-full ml-auto hover:shadow-xl transition duration-200 text-white"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <div>
        {/* <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          /> */}
      </div>
    </div>
  );
};

export default EmployeeProfile;
