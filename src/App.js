import React, { useState, useEffect } from 'react';

import api from 'services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      // console.log(response);
    });
  }, []);
  async function handleAddRepository() {
    // TODO

    const response = await api.post('repositories', {
      title: `Repositorio:${Date.now}`,
      owner: 'Douglas Moura'
    });

    const rep = response.data;

    setRepositories([...repositories, rep]);
  }

  async function handleRemoveRepository(id) {
    // TODO

    const response = await api.delete('repositories/' + id);

    const repIndex = repositories.findIndex(repo => repo.id === id);

    repositories.splice(repIndex, 1);

    setRepositories([...repositories]);

  }

  return (
    <>
      <ul data-testid="repository-list" >
      {repositories.map(item => (
        <>
            <li key={item.id}>
              {item.title}

            <button onClick={() => handleRemoveRepository(item.id)}>
          Remover
            </button>
            </li>
        </>
      ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
      </>
  );
}

export default App;
