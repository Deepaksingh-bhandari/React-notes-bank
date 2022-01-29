import React, { useState, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

export const Login = () => {
    const { userLogIn } = useContext(UserContext);

    const [userData, setuserData] = useState({ email: "", password: "" });

    const handleFormUpdate = (e) => {
        setuserData({ ...userData, [e.target.name]: e.target.value })
    }

    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        userLogIn(userData)
        navigate('/')
    }

    return (<div className="container is-fluid  my-6 is-flex is-justify-content-space-evenly is-align-items-center">
        <div className="box  column is-two-fifths-desktop is-two-fifths-mobile">
            <form onSubmit={handleSubmit}>
                <h2 className='is-size-2 has-text-centered'>Log in to your acount</h2>
                <div className="field my-3">
                    <label className="label" htmlFor="email" >Email address</label>
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" id="email" name="email" type="email" onChange={handleFormUpdate} placeholder="Email" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field my-3">
                    <label className="label" htmlFor="password" >Password</label>
                    <p className="control has-icons-left">
                        <input className="input" id="password" name="password" type="password" onChange={handleFormUpdate} placeholder="Password" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field is-grouped my-3 ">
                    <p className="control has-text-centered">
                        <button className="button is-link mx-2" type="submoit" >
                            Login
                        </button>
                        {/* <Link className="button is-success mx-2" to='/signup'>
                        Sign up
                    </Link> */}
                    </p>
                </div>
            </form>
        </div>
    </div>

    );
}
