import './App.css';
import 'bulma/css/bulma.min.css';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NoteState from './contexts/NoteState';
import UserState from './contexts/UserState';
// import AlertState from './contexts/AlertState';
import { Login } from './components/Authentication/Login';
import { SignUp } from './components/Authentication/SignUp';
// import { useContext, useEffect } from 'react';
// import AlertContext from './contexts/AlertContext';

function App() {
  // const {alert,updateAlert}=useContext(AlertContext);

  // useEffect(() => {
  //   setTimeout(()=>{
  //     updateAlert("",false)
  //   },2000)
  // }, [alert]);
  
  return (<>
  {/* <AlertState> */}
    <UserState>
      <NoteState>
        <Router>
          <Navbar title="iNotebook" />
          {/* <div id="alert" class={`notification is-success${!alert.active?'is-hidden':''}`}>
            <button class="delete"></button>
           Logged In succesfully
          </div> */}
          <Routes>
            <Route exact path="/about" element={<About />}>
            </Route>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route exact path="/signup" element={<SignUp />}>
            </Route>
            <Route exact path="/login" element={<Login />}>
            </Route>
          </Routes>
        </Router>
      </NoteState>
    </UserState>
  {/* </AlertState> */}
  </>
  );
}

export default App;
