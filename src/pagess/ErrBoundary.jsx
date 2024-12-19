// 
import React from 'react'
import { Link } from 'react-router-dom'

function ErrBoundary() {
  return (
    <div>
        <p style={{
            fontSize: '100px',
            margin: '0',
        }}>😢</p>
        <h2>Oops , something went wrong</h2>
        <p>Try refreshing the page or click the button below to go back to the home page.</p>
        <Link  style={{
            background: '#646cff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
        }} to="/">Back Home</Link>
    </div>
  )
}

export default ErrBoundary
