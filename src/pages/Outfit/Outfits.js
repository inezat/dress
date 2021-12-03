import React, { useState} from 'react';
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
    withRouter
  } from "react-router-dom";
  import {
    Container, Row, Col, Form, Input, Button, Navbar, Nav,
    NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';
import { Main } from '../index.js';

function Outfits() {
    
    //let navigate = useNavigate();
    var apiBaseUrl = "https://rocky-mesa-06315.herokuapp.com/";
    var user = document.cookie.split("=",2)[1];
    var table = document.createElement("table");
    table.setAttribute("id", "clothingdata");
    const [body, setbody] = useState("");
    const [loaded, setload] = useState(false);
    const [datareceived, setdr] = useState(false);


    async function deleteOutfit(){
        var table2 = document.getElementById("cdata").childNodes[0];
        var counter = 4;
        for (var i = 1; i < table2.rows.length; i++) {
            var recordcells = table2.rows.item(i).cells;
            for (var j = 0; j < recordcells.length; j++) {
                if(counter%4==0){
                 var element = recordcells.item(j).getElementsByTagName("input")[0];
                 if (element.checked){
                     deleteItem(element.value);
                 }
                }
                counter++;
            }
        }
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

    var tr = table.insertRow(-1);               
    var th = document.createElement("th");      
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");
    var th4 = document.createElement("th");
        th.innerHTML = ("Outfit");
        tr.appendChild(th);
        th2.innerHTML = ("Clothing Name");
        th3.innerHTML = ("Type");
        th4.innerHTML = ("Brand");
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);

    var counter = 4;
    var tempholder = '';
    for (var i = 0; i < wardrobetable.length; i++) {

        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            var temp = wardrobetable[i][col[j]];
            if(counter%4==0){
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
        axios.post(apiBaseUrl+'outfits',{
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
    
    async function deleteItem(item){
      axios.post(apiBaseUrl+'deleteoutfit',{
        email: user,
        outfitname: item
      })
      .then(function (response) {
      if(response.status == 200){
          //navigate('/main');
      }
      else{
        console.log(response.data.code);
        alert("DNE");
      }
      })
      .catch(function (error) {
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
          </NavItem>
          </div>
        </Navbar>
        <Col className="class-col">
                    <header className="Main-header">
                    <h2 id = "head">Outfits</h2>
                    </header>
                    </Col>
                        <p id="cdata"></p>
                        <Col className="class-col">
                        <Button className="buttons" outline color="secondary" onClick={deleteOutfit}>Delete</Button>
                        </Col>
        </div>
    );
}


export default Outfits;