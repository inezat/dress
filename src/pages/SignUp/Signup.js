import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Signup.css';
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

function Signup() {
    const [firstname, setfn] = useState("");
    const [lastname, setln] = useState("");
    const [user, setuser] = useState("");
    const [pass, setpass] = useState("");
    let navigate = useNavigate();

    async function HandleClick(){
    if(firstname == "" || lastname=="" || user==""|| pass==""){
        alert("please fill in all fields");
        return;
    }
    var apiBaseUrl = "https://rocky-mesa-06315.herokuapp.com/";
      axios.post(apiBaseUrl+'signup',{
          firstname: firstname,
          lastname: lastname,
          email: user,
          password: pass
      })
      .then(function (response) {
      if(response.status == 200){
          document.cookie = "username="+user+";path=/";
          navigate('/main');
      }
      })
      .catch(function (error) {
        alert("This email is already registered");
      console.log(error);
      });
      }
    return (
      <div className="signup">
            <header>
            </header>
            <h3>Sign up for DressYou!</h3>
            <Col className="class-col">
            <div className="label-group">
                <label>First Name: <br/><input name="firstname" className="label-control" class="shadow-sm bg-white rounded" type="text"onChange={e =>setfn(e.target.value)}/></label>
            </div>
            </Col>
                <Col className="class-col">
            <div className="label-group">
                <label>Last Name: <br/><input name="lastname" className="label-control" class="shadow-sm bg-white rounded" type="text"onChange={e =>setln(e.target.value)}/></label>
            </div>
            </Col>
                <Col className="class-col">
            <div className="label-group">
                <label>Email: <br/><input name="email" className="label-control" class="shadow-sm bg-white rounded" type="email"onChange={e =>setuser(e.target.value)}/></label>
            </div>
            </Col>    
                <Col className="class-col">
            <div className="label-group">
                <label>PassWord: <br/><input name="password" className="label-control" class="shadow-sm bg-white rounded" type="password"onChange={e =>setpass(e.target.value)}/></label>
            </div>
            </Col>
                <br/>
                <div className = "signup-button">
            <Col className="class-col">
                <Button className="buttons" color="primary" onClick={HandleClick}>Sign up</Button>
            </Col>
        </div>
        <br/>
        <div className = "login-button">
            <Col className="class-col">
                <Button className="buttons" id="Signup" onClick={() => navigate('/login')}>Log In</Button>
            </Col>
        </div>
      </div>
    );
  }

  
  export default Signup;