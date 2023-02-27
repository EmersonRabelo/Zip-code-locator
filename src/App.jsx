import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import api from './services/api';

import './app.css'

function App() {

  const [input, setInput ] = useState();
  const [dados, setDados ] = useState({})

  async function handleSearch(){
    if (input === ''){
      alert('Insira o CEP')
      return
    }

    try {
      const response = await api.get(`${input}/json`);
      setDados(response.data)
      setInput('')

    }catch (e){
      alert('erro ao buscar')
      setInput('')
    }
  }


  return (
    <div className="container">
      <h1 className="title"> Buscador CEP</h1>
      <div className="containerInput">
        <input 
          type="text" 
          name="" 
          id="" 
          placeholder="Insira o cep..."
          value={input}
          onChange={e => {
            setInput(e.target.value)
          }}
        />

        <button className="btnSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(dados).length > 0 && (
        <main className="main" >
          <h2>CEP: {dados.cep}</h2>
          <span>Logradouro: {dados.logradouro}</span>
          <span>Complemento: {dados.complemento}</span>
          <span>Bairro: {dados.bairro}</span>
          <span>Estado: {dados.localidade} - {dados.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App
