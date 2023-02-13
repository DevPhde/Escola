import React from 'react'
import Navbar from './Navbar'
import '../styles/header.css'

function Header() {
    return (
        <header className='row bg-dark'>
            <div className='col text-end mt-2'>
                <Navbar />
            </div>
        </header>
    )
}

export default Header