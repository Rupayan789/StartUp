import React, { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import {databaseRef as dbRef} from "../config"
import { child, get} from 'firebase/database'
import Loader from 'react-loader-spinner'
const AllEmployee = () => {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        get(child(dbRef,'users')).then(snapShot=>{
            let list = snapShot.val()
            setUsers(Object.entries(list).map(e=>({[e[0]]:e[1]})))
            setLoading(false)
        })
    },[])
    if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
      </div>
    );
    return (
        <div className="py-5 px-5 min-h-screen z-20">
            <div className="text-3xl  inset-y-2 rounded-lg h-full w-full">
                <h1 className="px-5 py-5 text-white rounded-md mb-10 bg-primary shadow-xl">List of all Employees</h1>
                <EmployeeTable users={users}/>
                
            </div>
        </div>
    )
}

export default AllEmployee
