import React from 'react'
import {useHistory } from 'react-router-dom'; 
import './Footer.css'

function Footer() {
    const history=useHistory();

    return (
        <footer className="px-5">
                    
                <div className="footer" style={{marginTop:'50px'}}> 
                    <p className ="mb-0"> <h6>Notes Website © 2022 - All Rights Reserved</h6></p>
                </div>
                <br/>
        </footer>
    )
}

export default Footer
