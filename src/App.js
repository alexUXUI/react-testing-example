import * as React from 'react'
import { getPokemonDetail } from './api';

import './App.css';

export const formId = 'pokemon-search-form';
export const inputId = 'pokemon-search-input';

function App() {

  const [pokemon, setPokemon] = React.useState();
  const [search, setSearch] = React.useState('');

  const getPokemon = (e) => {
    e.preventDefault();
    return getPokemonDetail(search).then(setPokemon)
  }

  return (
    <div className="App">
      <form
        data-testid={formId}
        title={formId}
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor={inputId}>Search for a Pokemon</label>
        <input
          id={inputId}
          type="text"
          data-testid={inputId}
          placeholder="search by name"
          onChange={(e) => {
            e.preventDefault()
            setSearch(e.target.value)
          }}
        />
        <button
          data-testid="pokemon-submit-btn"
          onClick={getPokemon}
        >Submit</button>
      </form>
      {
        pokemon && (
          <Pokemon pokemon={pokemon} />
        )
      }
    </div>
  );
};

export const Pokemon = ({ pokemon }) => {
  return (
    <div data-testid="pokemon-detail">
      <h2>{pokemon.name}</h2>
    </div>
  )
}

export default App;
