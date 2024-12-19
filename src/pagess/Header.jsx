import React from 'react'




function Header() {
  return (
    <div className='profile-card'>
        <div className='profile-image'>
            
        </div>

        <h2 className='profile-name'>Emmanuel Oni
            <a href="#"></a>
        </h2>

        <div className='Technologies'>
            <p>HTML | CSS| JAVASCRIPT| REACT</p>
            
            
        </div>

        <div className='profile-links'>
            <h3> Connect with me</h3>
            <a href="https://www.linkedin.com/in/emmanuel-oni-377a01205/?originalSubdomain=ng" 
            target="_blank"
            rel="noopener noreferrer">LinkedIn</a>
            
            <a href="https://github.com/EO-emmanueloni" 
            target="_blank"
            rel="noopener noreferrer">Git-hub</a>

            <a href="https://x.com/home" target="_blank"
            rel="noopener noreferrer">X</a>

           
            {/* <Link to='/Navbar'>error 404</Link> */}

            
                
           

        </div>
    </div>
  )
}

export default Header