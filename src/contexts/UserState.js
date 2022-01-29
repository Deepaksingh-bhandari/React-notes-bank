import React, { useState } from 'react';
import UserContext from './UserContext';

const UserState = (props) => {
    const host = "http://localhost:5000"

    // Authorization Context
   const userInitialState={name:"",email:"",loggedIn:false};
   const [userDetails, setuserDetails] = useState(userInitialState);
    // 1st Operation - Sign up
    const userSignUp = async (data)=>{
        console.log("User sign up function called");
        let url = `${host}/api/auth/createuser`
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // 'authToken':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMWVlYzlhZjIxMmZhMzg4Y2FiZjQ1In0sImlhdCI6MTY0MzI0NTI5Mn0.T-TZH-pgoYiGdAsvm-dr8A1FhjFtnId86-nfEgU-nNU' 
                // token
            },
            body: JSON.stringify(data)// body data type must match "Content-Type" header
        });

        let resp = await response.json();

        if (resp.status === "success") {//   success ALERT TO SHOW 
            sessionStorage.setItem('user',JSON.stringify(resp.userDetails))
            sessionStorage.setItem('authToken',resp.authToken)
            setuserDetails({name:data.name,email:data.email,loggedIn:true})
            console.log("User signed Up succesfully");
            alert("User signed Up succesfully")
        }
        else {//  SOME ERROR ALERT}
            console.log("Some error occured");
            alert("Some error occured");
        }
    }
    // 2nd Operation - Log in 
    const userLogIn = async (data)=>{
        console.log("User Log in function called");
        let url = `${host}/api/auth/login`
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        let resp = await response.json();

        if (resp.status === "success") {//   success ALERT TO SHOW 
            console.log("User Logged in succesfully");
            sessionStorage.setItem('authToken',resp.authToken)
            userDataFetch(data);
            setuserDetails({name:"",email:data.email,loggedIn:true})
           alert('User Logged In succesfully')

        }
        else {//  SOME ERROR ALERT}
            console.log("Some error occured while loggin in");
            alert("Some error occured while loggin in")
        }
    }

    // 3rd Operation - get User Data
    const userDataFetch = async (data)=>{
        console.log("get User data function called");
        let url = `${host}/api/auth/getUser`
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'authToken': sessionStorage.getItem("authToken")
            },
            body: JSON.stringify(data)
        });

        let resp = await response.json();

        if (resp.status === "success") {//   success ALERT TO SHOW 
            console.log("User Data fetched succesfully",resp.user);
            setuserDetails({name:resp.user.name,email:resp.user.email,loggedIn:true})
        }
        else {//  SOME ERROR ALERT}
            console.log("Some error occured while fetching user data");
        }
    }
    
    //4th Operation - Log Out
    const userLogOut=()=>{
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')
    setuserDetails(userInitialState)
    alert('User Logged Out succesfully')
    }
    return (
        <UserContext.Provider value={{userSignUp,userDataFetch,userLogIn,userLogOut,userDetails}}>
            {props.children}
        </UserContext.Provider>
    );

    }


export default UserState;