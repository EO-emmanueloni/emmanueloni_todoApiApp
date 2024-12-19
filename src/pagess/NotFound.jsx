import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='not-found'>
        <p style={{
            fontSize: '100px',
            margin: '0',
        }}>🤧</p>

        <h1>404: Not Found</h1>
        
        <p>The Page you Requested doesn't exist </p>
        <Link style={{
            background: '#646cff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
        }} to="/">Back Home</Link>
    </div>
  )
}

export default NotFound