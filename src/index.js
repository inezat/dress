import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import * as Pages from './pages';
import Login from './pages/LogIn/Login';
import Signup from './pages/SignUp/Signup';
import Main from './pages/Main/Main';
import Additem from './pages/Additem/Additem';
import Logout from './Logout';
import Addoutfit from "./pages/Outfit/Addoutfit";
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useNavigate
} from "react-router-dom";
import Outfits from "./pages/Outfit/Outfits";

function App(){
  var page = <Login/>;

  return (<Router>
      <div className = "App">
        <div className="wrapper">
          <div className="inner">
            <Routes>
              <Route path="/" element={page}>
              </Route>
              <Route path="/login" element={<Login/>}>
              </Route>
              <Route path="/signup"element={<Signup/>}>
              </Route>
              <Route path="/main"element={<Main/>}>
              </Route>
              <Route path="/additem"element={<Additem/>}>
              </Route>
              <Route path="/logout"element={<Logout/>}>
              </Route>
              <Route path="/addoutfit"element={<Addoutfit/>}>
              </Route>
              <Route path="/outfits"element={<Outfits/>}>
              </Route>
            </Routes>
          </div>
        </div>  
      </div>
    </Router>
  );
}

export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
