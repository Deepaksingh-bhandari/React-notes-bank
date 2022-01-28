import './App.css';
import 'bulma/css/bulma.min.css';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Home } from './components/Home';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes,Route,useLocation } from "react-router-dom";

import NoteState from './contexts/NoteState';


function App() {

  
  
return (<>
  <NoteState>
    <Router>
      <Navbar title="iNotebook" />
      <Routes>
        <Route exact path="/about" element={<About />}>          
        </Route>
        <Route exact path="/" element={<Home />}>
          
        </Route>
      </Routes>
    </Router>
    </NoteState>
  </>
  );
}

export default App;
