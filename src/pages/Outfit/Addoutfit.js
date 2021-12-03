import React, { useState, useContext } from 'react';
import axios from 'axios';
import Logout from '../../Logout.js';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory,
    useNavigate,
    params,
    navigation,
    useLocation
  } from "react-router-dom";
  import {
    Container, Row, Col, Form, Input, Button, Navbar, Nav,
    NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';
import Outfits from './Outfits.js';

function Addoutfit() {
    const [fitname, setfitname] = useState("");
    var user = document.cookie.split("=",2)[1];
    let navigate = useNavigate();
    let location = useLocation();
    var fitarray = location.state
  
    //alert(JSON.stringify(fitarray));
    
    const [email, setemail] = useState(user)
    
    async function HandleClick(){
      var apiBaseUrl = "https://rocky-mesa-06315.herokuapp.com/";
    for(var i =0 ; i < fitarray.length; i++){
      var fitelement = fitarray[i];

      axios.post(apiBaseUrl+'addoutfit',{
        email:email,
        outfitname:fitname,
        name:fitelement
      })
      .then(function (response) {
      if(response.status == 200){
          navigate('/main');
      }
      })
      .catch(function (error) {
      //if(response.data.code == 500){
      alert("An outfit with that name already exists");
      console.log(error);
      });
    }
    console.log(email)
  
      }
    

    return (
      <div className="addclothes">
          <Navbar fixed="top" color ="light" light expand="xs"className="border-bottom border-gray bg-white" style={{ height: 70 }}>
          <div className = "container">
          <NavItem className="d-flex align-items-center">
          <NavLink className="navbar-brand" href="/main">DressYou</NavLink>
          <NavLink className="font-weight-bold" href="/" onClick={Logout}>Logout</NavLink>
          <NavLink className="font-weight-bold" href="/outfits" onClick={Outfits}>Outfits</NavLink>
          </NavItem>
          </div>
        </Navbar>
        <Col className="class-col">
        <header className="Signup-header">
            <h2>Add clothes!</h2>
            <label>Outfit Name: <input name="outfitname" className="label-control" class="shadow-sm bg-white rounded" type="text"onChange={e =>setfitname(e.target.value)}/></label>
        </header>
        <Button className="buttons" outline color="primary" onClick={HandleClick}>Store your outfit</Button>
        <br/>
        </Col>
      <br/>
      </div>
    );
  }


export default Addoutfit;