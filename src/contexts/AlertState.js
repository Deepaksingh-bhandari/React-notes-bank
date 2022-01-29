import { useState } from "react";
import React from 'react';
import AlertContext from "./AlertContext";
const AlertState = (props) => {   
    const [alert, setalert] = useState({mssg:"",active:true});
    
    const updateAlert=(mssg,active)=>{
          setalert(mssg,active)
    }
  return (
        <AlertContext.Provider value={{alert,updateAlert}}>
            {props.children}
        </AlertContext.Provider>
    
  );
};

export default AlertState;