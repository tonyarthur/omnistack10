import React, { useState, useEffect } from 'react';
import api from './services/api';
import DevItem from './components/devItem';
import DevForm from './components/devForm';

import './global.css';
import './App.css';
import './Siderbar.css';
import './Main.css';


// Componente : Bloco isolado de HTML, CSS, JS, o qual não interfere no restante da aplicação.
// Propriedade : Informações que o component pai passa para o componente filho.
// Estado : Informações mantidas pelo componente (Lembrar : imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() =>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data){
    const response = await api.post('/devs', data);
    console.log(response);
    
    setDevs([...devs, response.data]);
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
          <ul>
            {devs.map(dev => (
              <DevItem key={dev._id} dev={dev}/> 
            ))}
                      
          </ul>
      </main>
    </div>
  );
}

export default App;
