import React from 'react';
import { VscSaveAs } from 'react-icons/vsc'


import './styles.css';

function Header() {
    return (
      <div className='client-container'> 
          <header>
              <button className='button' type='submit'>SALVAR
              <VscSaveAs size={48} color='#000000' /> 
              </button>
          </header>
      </div>
    )

}

export default Header;