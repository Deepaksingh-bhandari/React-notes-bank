import './App.css';
import 'bulma/css/bulma.min.css';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";

import NoteState from './contexts/NoteState';
import { Login } from './components/Authentication/Login';
import { SignUp } from './components/Authentication/SignUp';
import UserState from './contexts/UserState';

function App() {

  
  
return (<>
  <UserState>
  <NoteState>
    <Router>
      <Navbar title="iNotebook" />
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
  </>
  );
}

export default App;
