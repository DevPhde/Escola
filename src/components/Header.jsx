import React from 'react'
import Navbar from './Navbar'
import "../styles/header.css"

function Header() {
    return (
        <header className='row mb-5'>
            <div className='col'>
                <img src="icon.png" alt="icone escola" width={'15%'} />
            </div>
            <div className='col text-end mt-5'>
                <Navbar />
            </div>
            <hr className='mt-2 text-white'/>
        </header>
    )
}

export default Header