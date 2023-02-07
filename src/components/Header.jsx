import React from 'react'
import Navbar from './Navbar'

function Header() {
    return (
        <header className='row'>
            <div className='col text-end mt-5'>
                <Navbar />
            </div>
            <hr className='mt-2 text-white'/>
        </header>
    )
}

export default Header