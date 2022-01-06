import React from 'react'
import { Routes , Route} from 'react-router-dom'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
const Auth = () => {
    return (
        <div className="bg-primary">
            <Routes>
                <Route path="login" element={<Login/>}/>
                <Route path="signup" element={<SignUp/>}/>
            </Routes>
        </div>
    )
}

export default Auth
