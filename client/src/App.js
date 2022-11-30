import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Home from './pages/Home';
import Form from './pages/Form';
import { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';



function App() {
 
  const {userDetails} = useContext(UserContext)
  const user = userDetails

 
  return (
    <div className="App">
       <Router>
       <Routes>
          <Route exact path="/" element={user ? <Home />: <Signup/> }/>
          <Route path="/login" element={user ? <Home />: <Login/> }  />
          <Route path="/signup" element={user ? <Home />: <Signup/> }  />
        {user&& <>
          <Route path="/apply" element={<Form/> }  />
        </>
        }
            
            
          


          </Routes>

        </Router>

    </div>
  )
}

export default App;
