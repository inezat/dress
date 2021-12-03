import Main from '../Main/Main.js';
import App from '../../index'
import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../dressyoulogo.png';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory,
    useNavigate
  } from "react-router-dom";
  import {
    Container, Row, Col, Form, Input, Button, Navbar, Nav,
    NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';

const Login = () => {
    const [user, setuser] = useState("");
    const [pass, setpass] = useState("");
    let navigate = useNavigate();

    async function HandleClick(){
        if(user == "" || pass ==""){
            alert("please fill in all fields");
            return;
        }
    
    var apiBaseUrl = "https://rocky-mesa-06315.herokuapp.com/";
      axios.post(apiBaseUrl+'login',{
          email: user,
          password: pass
      })
      .then(function (response) {
      //alert(response.status);
      if(response.status == 200){

        document.cookie = "username="+user+";path=/";
        let x = document.cookie;
        // console.log(x);
        navigate('/main');
      }
      else{
        console.log(response.data.code);
        alert("Username does not exist");
      }
      })
      .catch(function (error) {
      alert("Invalid username or password");
      console.log(error);
      });
      }
    return (
    <div className="login">
        <img src={logo} id="logo" className="App-logo" alt="logo" />
        <br/><br/><br/>
        <h3>Log in</h3>
        <Col className="class-col">
        <div className="label-group">
            <label>Email: <br/><input name="email" className="label-control" class="shadow-sm bg-white rounded" type="email"onChange={e =>setuser(e.target.value)}/></label>
        </div>
        </Col>
            <Col className="class-col">
        <div className="label-group">
            <label>Password: <br/><input name="password" className="label-control" class="shadow-sm bg-white rounded" type="password" onChange={e =>setpass(e.target.value)}/></label>
            <br/>
            <br/>
        </div>
        </Col>
        <div className = "login-button">
            <Col className="class-col">
                <Button className="buttons" color="primary" onClick={HandleClick}>Login</Button>
            </Col>
        </div>
        <br/>
        <div className = "signup-button">
            <Col className="class-col">
                <Button className="buttons" id="Signup" onClick={() => navigate('/signup')}>Sign Up</Button>
            </Col>
        </div>
    </div>
    );
}


export default Login;