import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Main.css';
import Addoutfit from '../Outfit/Addoutfit.js';
//import {UserContextCreate} from "../LogIn/Login";
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
    withRouter
  } from "react-router-dom";
  import {
    Container, Row, Col, Form, Input, Button, Navbar, Nav,
    NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';
import Outfits from '../Outfit/Outfits';

function Main() {
    let navigate = useNavigate();
    var apiBaseUrl = "https://rocky-mesa-06315.herokuapp.com/";

    var user = document.cookie.split("=",2)[1];
    var table = document.createElement("table");
    table.setAttribute("id", "clothingdata");
    const [body, setbody] = useState("");
    const [loaded, setload] = useState(false);
    const [datareceived, setdr] = useState(false);
    var fit = [];

    //const [cookies, removeCookie] = useCookies(['user'])
    async function HandleClick(){
        navigate('/additem');
    }

    async function deleteClothes(){
        var table2 = document.getElementById("cdata").childNodes[0];
        var counter = 5;
        for (var i = 1; i < table2.rows.length; i++) {
            var recordcells = table2.rows.item(i).cells;
            for (var j = 0; j < recordcells.length; j++) {
                if(counter%5==0){
                 var element = recordcells.item(j).getElementsByTagName("input")[0];
                 if (element.checked){
                     deleteItem(element.value);
                     console.log(element.value);
                 }
                }
                counter++;
            }
        }
    }
    async function createOutfit(){
        var table2 = document.getElementById("cdata").childNodes[0];
        var counter = 5;
        for (var i = 1; i < table2.rows.length; i++) {
            var recordcells = table2.rows.item(i).cells;
            for (var j = 0; j < recordcells.length; j++) {
                if(counter%5==0){
                 var element = recordcells.item(j).getElementsByTagName("input")[0];
                 if (element.checked){
                     fit.push(element.value);
                     console.log(element.value);
                 }
                }
                counter++;
            }
        }
        // navigate('/addoutfit');
        //alert(fit);
    }

async function tableFromJson() {
    
    var wardrobetable = JSON.parse(body)
    var col = [];
    for (var i = 0; i < wardrobetable.length; i++) {
        for (var key in wardrobetable[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var table = document.createElement("table");
    var tr = table.insertRow(-1);                 

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");     
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    //for every 5th cell (name cell) create a checkbox
    var counter = 5;
    for (var i = 0; i < wardrobetable.length; i++) {

        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            var temp = wardrobetable[i][col[j]];
            if(counter%5==0){
                tabCell.innerHTML = "<input type='checkbox' value='"+temp+"' />" + temp;    
            }else{
                tabCell.innerHTML = temp;
            }
            counter++;
        }
    }
    document.getElementById('cdata').append(table);
    table.setAttribute('class', 'table table-success table-striped- table-hover');
}

    async function getClothes(){
        axios.post(apiBaseUrl+'main',{
            email: user})
        .then(function (response) {
        if(response.status == 200){
            console.log(user)
            if(JSON.stringify(response.data) != "[]"){
                setbody(JSON.stringify(response.data))
                setdr(true)
            }
        }
        else{
          console.log(response.data.code);
          alert("DNE");
        }
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    
    function deleteItem(item){
        var apiBaseUrl = "https://rocky-mesa-06315.herokuapp.com/";
      axios.post(apiBaseUrl+'delete',{
        email: user,
        name: item
      })
      .then(function (response) {
      if(response.status == 200){
          //navigate('/main');
      }
      else{
        console.log(response.data.code);
        alert("Username does not exist");
      }
      })
      .catch(function (error) {
        alert("Please delete the outfit this item belongs to first");
      console.log(error);
      });
      window.location.reload(false);
    }

if(!loaded){
    getClothes();
    setload(true);
}
if(!datareceived){
    tableFromJson();
}
    return (
        <div className="main">
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
                    <header className="Main-header">
                    <h2 id = "head">Welcome to your wardrobe {user}</h2>
                    </header>
                    </Col>
                        <p id="cdata"></p>
                        <h7>Click add clothes to get started, then use the checkboxes to delete clothes or create an outift.</h7>
                        <Col className="class-col">
                        <Button className="buttons" outline color="primary" onClick={HandleClick}>Add Clothes</Button>
                        <Button className="buttons" outline color="secondary" onClick={deleteClothes}>Delete</Button>
                        <Link to={"/addoutfit"} state={fit}>
                            <Button className="buttons" outline color="secondary" onClick={createOutfit}>Create Outfit</Button>
                        </Link>
                        </Col>
        </div>
    );
}


export default Main;