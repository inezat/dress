import React, { useState, useContext } from 'react';
//import {UserContextCreate} from "../LogIn/Login";
import UserProfile from '../../UserProfile.js';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Button,
    useRouteMatch,
    useParams,
    useHistory,
    useNavigate
  } from "react-router-dom";

function Addoutfit() {
    // const context = useContext(UserContextCreate);
    // var user = context[0];
    //var user = UserProfile.getName();
    var user = document.cookie.split("=",2)[1];
    console.log(user);
    const [email, setemail] = useState(user)
    const [name, setname] = useState({name: ''});
    const [type, settype] = useState({type:''});
    const [color, setcolor] = useState({color: ''});
    const [brand, setbrand] = useState({brand: ''});
    let navigate = useNavigate();
    
    async function HandleClick(){
    console.log(email)
    console.log(name)
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
      else if(response.data.code == 204){
        console.log("Username password do not match");
        alert("username password do not match")
      }
      else{
        console.log(response.data.code);
        alert("Username does not exist");
      }
      })
      .catch(function (error) {
      console.log(error);
      });
      }

    return (
      <div className="Signup">
        <header className="Signup-header">
            <h2>Add clothes!</h2>
                <label>Name: <input name="name" type="text"onChange={e =>setname(e.target.value)}/></label>
                <br/>
                <label>Color: <input name="color" type="text"onChange={e =>setcolor(e.target.value)}/></label>
                <br/>
                <label>Brand: <input name="brand" type="text"onChange={e =>setbrand(e.target.value)}/></label>
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
                <button onClick={HandleClick}>Store your outfit</button>
        </header>
        <button id="Login" onClick={() => navigate('/main')}>Main</button>
      </div>
    );
  }


export default Addoutfit;