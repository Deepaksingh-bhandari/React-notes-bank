import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../contexts/UserContext';


export const SignUp = () => {
    const {userSignUp}  = useContext(UserContext);

    const [userData, setuserData] = useState({ name: "", email: "", password: "" });
    const [LoginEnabled, setLoginEnabled] = useState(true);

    const handleFormUpdate = (e) => {
        setuserData({ ...userData, [e.target.name]: e.target.value })
    }
    const navigate=useNavigate();
   const handleSubmit=(e)=>{
        e.preventDefault();
        userSignUp(userData)
        navigate('/')
   }
    return <div className='container is-fluid  my-6 is-flex is-justify-content-space-evenly is-align-items-center'>
        <div className='box column is-half'>
            <form onSubmit={handleSubmit}>
            <h2 className='is-size-2 has-text-weight-semibold has-text-centered'>Sign up Form</h2>
            <div className="field my-3">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" id="name" name="name" type="text" placeholder="eg: Johnny Doe" onChange={handleFormUpdate} value={userData.name} />
                </div>
            </div>

            <div className="field my-3">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger" id="email" name="email" type="email" placeholder="Email input" onChange={handleFormUpdate} value={userData.email} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <p className="help is-danger is-hidden">This email is invalid</p>
            </div>

            <div className="field my-3">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" id="password" name="password" type="password" placeholder="Enter Password" onChange={handleFormUpdate} value={userData.password} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
                <p className="help is-success is-hidden">Type a strong password</p>
            </div>

            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" onChange={(e)=>{e.target.checked?setLoginEnabled(false):setLoginEnabled(true)}}/>
                        &nbsp; I agree to the terms and conditions
                    </label>
                </div>
            </div>

            <div className="field is-grouped my-3 ">
                <div className="control has-text-centered">
                    <button disabled={LoginEnabled} className="button is-link mx-2" type='submit'>Sign Up</button>
                    {/* <Link className="button is-success mx-2" to='/login'>
                        Login
                    </Link> */}
                </div>
            </div>
            </form>

        </div>
    </div>;
};
