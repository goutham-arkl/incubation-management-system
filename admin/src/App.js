import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route,useNavigate} from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import AppList from "./pages/appList.jsx/AppList";
import Booking from "./pages/Booking";
import { UserContext } from "./Store/UserContext";
function App() {
  const navigate= useNavigate()
  const { darkMode } = useContext(DarkModeContext);
  const {userDetails} = useContext(UserContext)
  const user= JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
   if (!user) {
    navigate('/login')
   }
  }, [user])
  
  return (
    <div className={darkMode ? "app dark" : "app"}>
  
        <Routes>
        <Route path="/login" element={<Login />} /> 
          <Route path="/">{user&&<>
          
            <Route index element={<Home />} />
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="book" element={<Booking/>}></Route>
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
              
            </Route>
            <Route path="applications">
              <Route index element={<AppList />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            </>}
          </Route>
        </Routes>
   
    </div>
  );
}

export default App;
