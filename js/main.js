'use strict';

const pokemonLogGroupEl = document.querySelector('.pokemon-log--group');
const pokemonListElAll = document.querySelectorAll('.pokemon-list');
const pokemonListImageEl = document.querySelector('.pokemon-list--image');
const pokemonListNameEl = document.querySelector('.pokemon-list--name');

// function to get pokemon inside pokemon log.
function getPokemonList() {
  const url = 'https://pokeapi.co/api/v2/pokemon/';

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    })
    .then((pokemons) => {
      pokemons.forEach((pokemon) => {
        generateNewPokemonList(pokemon.url);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function generateNewPokemonList(data) {
  // fetching each pokemon.
  let response = await fetch(data);
  let user = await response.json();

  generateNewElement(user);
}

function generateNewElement(user) {
  // generate element needed to create pokemon list and its data
  const newPokemonList = document.createElement('li');
  const newPokemonNumber = document.createElement('p');
  const newPokemonImage = document.createElement('img');
  const newPokemonName = document.createElement('p');

  // add class and its data from API
  newPokemonList.className = 'pokemon-list';

  newPokemonImage.src = user.sprites.front_default;
  newPokemonImage.className = 'pokemon-list--image';

  const text = document.createTextNode(user.name);
  newPokemonName.appendChild(text);

  const number = document.createTextNode(user.id);
  newPokemonNumber.className = 'pokemon-list--number';
  newPokemonNumber.appendChild(number);
  newPokemonName.className = 'pokemon-list--name';

  // insert each element to the log and list.
  pokemonLogGroupEl.appendChild(newPokemonList);
  newPokemonList.appendChild(newPokemonImage);
  newPokemonList.appendChild(newPokemonName);
  newPokemonList.appendChild(newPokemonNumber);
}

getPokemonList();

// function to search the pokemon.

const searchBoxEl = document.querySelector('.search-box');
const searchButtonEl = document.querySelector('.search-button');

searchButtonEl.addEventListener('click', getPokemonSearch);

function getPokemonSearch() {
  pokemonLogGroupEl.innerHTML = '';

  const pokemonName = searchBoxEl.value;
  const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase();

  if (pokemonName === '') {
    getPokemonList();
  } else {
    generateNewPokemonList(url);
  }
}
