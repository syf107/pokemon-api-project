'use strict';

const pokemonLogGroupEl = document.querySelector('.pokemon-log--group');
const pokemonListEl = document.querySelector('.pokemon-list');
const pokemonListImageEl = document.querySelector('.pokemon-list--image');
const pokemonListNameEl = document.querySelector('.pokemon-list--name');

function getPokemonList() {
  const url = 'https://pokeapi.co/api/v2/pokemon/';

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const pokemonArray = data.results;
      pokemonArray.forEach((eachPokemon) => {
        console.log(eachPokemon);
        const pokemonDetails = eachPokemon.url;

        // fetching each pokemon.
        fetch(pokemonDetails)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            generateNewPokemonList(data);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function generateNewPokemonList(data) {
  // generate new element
  const newPokemonList = document.createElement('li');
  const newPokemonImage = document.createElement('img');
  const newPokemonName = document.createElement('p');

  // add class and its data from API
  newPokemonList.className = 'pokemon-list';
  newPokemonImage.src = data.sprites.front_default;
  newPokemonImage.className = 'pokemon-list--image';
  const text = document.createTextNode(data.name);
  newPokemonName.appendChild(text);
  newPokemonName.className = 'pokemon-list--name';

  // insert each values.
  pokemonLogGroupEl.appendChild(newPokemonList);
  newPokemonList.appendChild(newPokemonImage);
  newPokemonList.appendChild(newPokemonName);
}

getPokemonList();
