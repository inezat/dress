import React from 'react';
  
const Logout = (e) =>{
    // removeCookie('user')
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export default Logout;