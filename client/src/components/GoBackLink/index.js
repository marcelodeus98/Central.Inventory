import React from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom';

function GoBackLink () {
    return (
        <section>
            <Link className='back-link' to='/home'>
            <FiArrowLeft size={24} color='#1E8EF8' />
            <h1 style={{color:'#FFF'}}>Voltar para tela inicial</h1>
            </Link>
        </section>

    )
}

export default GoBackLink;