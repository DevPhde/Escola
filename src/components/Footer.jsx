import React from 'react'
import '../styles/footer.css'

function Footer() {
    return (
        <footer>
            <div className='border p-3'>
                <p className='mt-2 text-center icones'>
                    <a href="https://pt-br.facebook.com/"><i class="text-center mt-2 font fa fa-facebook-f"></i></a>
                    <a href="https://pt-br.facebook.com/"><i class="text-center mt-2 font fa fa-facebook-f"></i></a>
                    <a href="https://pt-br.facebook.com/"><i class="text-center mt-2 font fa fa-facebook-f"></i></a>
                    <a href="https://pt-br.facebook.com/"><i class="text-center mt-2 font fa fa-facebook-f"></i></a>
                </p>
                <h5 className='text-center mt-2 font'>Projeto Módulo 3 - React</h5>
                <p className='mt-2 text-center font'>© 2022 Copyright: Squad 2 - Programadores Cariocas</p>
            </div>
        </footer>
    )
}

export default Footer