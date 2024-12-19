import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <nav className='nav-links'>
          <div>
            <p><Link to="/"> Home |</Link></p>
          </div>
          <div>
            <p><Link to="/error-boundary">Err Boundary |</Link></p>
          </div>

          <div> 
            <p><Link to="/not-found">Not Found</Link></p>
          </div>
          
            
       
       
            
        </nav>
    </div>
  )
}

export default Navbar