import Link from 'next/link'
import React from 'react'

const CustomerHeader = () => {
  return (
    <div className='header-wrapper'>
        <div className='logo'>
            <h1>logo</h1>
        </div>
        <ul >
            <li>
                <Link href="/" >Home</Link>
            </li>
            <li>
                <Link href="/" >Login</Link>
            </li>
            <li>
                <Link href="/" >SignUp</Link>
            </li>
            <li>
                <Link href="/" > Cart (0)</Link>
            </li>
            <li>
                <Link href="/" > Add Restaurant</Link>
            </li>
        </ul>
    </div>
  )
}

export default CustomerHeader