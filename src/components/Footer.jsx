import React from 'react'
import '../styles/footer.css'

function Footer() {
    return (
        <footer>
            <div className='border p-3'>
                <p className='text-center mt-2 font'>
                    <a href="https://pt-br.facebook.com/" className='icones font'><i class="text-center mt-2 fa fa-facebook-f"></i></a>
                    <a href="https://pt-br.facebook.com/" className='icones font'><i class="fa fa-instagram"></i></a>
                    <a href="https://pt-br.facebook.com/" className='icones font'><i class="material-icons font">mail</i></a>
                    <a href="https://pt-br.facebook.com/" className='icones font'><i class="fa fa-whatsapp"></i></a>
                </p>
                <h5 className='text-center mt-2 font'>Projeto Módulo 3 - React</h5>
                <p className='mt-2 text-center font'>© 2022 Copyright: Squad 2 - Programadores Cariocas</p>
            </div>
        </footer>
    )
}

export default Footer