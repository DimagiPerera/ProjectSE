import * as React from 'react';
import Box from '@mui/material/Box';
import Button from "@material-ui/core/Button";
import Icon from '@mui/material/Icon';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import './Header.css'


export default function Header() {
  const userLogout = () => {
    localStorage.removeItem("token");
    window.location.replace('/login')
  }
  let token = localStorage.getItem("token");
  return (
    <div className="headerdiv">
    <Box sx={{ flexGrow: 1 }}>
          <div className='topic'>
          My Notes
          </div>
            

          {token ? <Button component="div" sx={{ flexGrow: 1 }} align="right" onClick={() => { userLogout() }}>
            Logout
          </Button> : <></>}
    </Box>
    </div>
  );
}