import React, { useState, useContext } from 'react';
import './Additem.css'
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
    useNavigate
  } from "react-router-dom";
  import {
    Container, Row, Col, Form, Input, Button, Navbar, Nav,
    NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';
import Outfits from '../Outfit/Outfits.js';

function Additem() {
    var user = document.cookie.split("=",2)[1];
    console.log(user);
    const [email, setemail] = useState(user)
    const [name, setname] = useState('');
    const [type, settype] = useState("hat");
    const [color, setcolor] = useState('');
    const [brand, setbrand] = useState('');
    let navigate = useNavigate();
    
    async function HandleClick(){

    if(name != '' && color != '' && brand !=''){
      var apiBaseUrl = "https://rocky-mesa-06315.herokuapp.com/";
        axios.post(apiBaseUrl+'additem',{
          email:email,
          name:name, 
          type:type, 
          color:color, 
          brand:brand
        })
        .then(function (response) {
        if(response.status == 200){
            navigate('/main');
        }
        })
        .catch(function (error) {
        alert("There is already an item named "+name);
          console.log(error);
        });
        }
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
                <label>Name: <input name="name" className="label-control" type="text"onChange={e =>setname(e.target.value)}/></label>
                <br/>
                <label>Color: <input name="color" className="label-control" type="text"onChange={e =>setcolor(e.target.value)}/></label>
                <br/>
                <label>Brand: <input name="brand" className="label-control" type="text"onChange={e =>setbrand(e.target.value)}/></label>
                <br/>
                <div>
                <label>Type:</label>
                <select name="type" id="type"onChange={e =>settype(e.target.value)}>
                    <option value="hat">Hat</option>
                    <option value="top">Top</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="dress">Dress</option>
                    <option value="shoes">Shoes</option>
                    <option value="accessory">Accessory</option>
                </select>
                </div>
        </header>
        <br/>
        <Button className="buttons" outline color="primary" onClick={HandleClick}>Store your clothes</Button>
      </Col>
      <br/>
      </div>
    );
  }


export default Additem;