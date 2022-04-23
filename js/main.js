'use strict';

const pokemonLogGroupEl = document.querySelector('.pokemon-log--group');
const pokemonListImageEl = document.querySelector('.pokemon-list--image');
const pokemonListNameEl = document.querySelector('.pokemon-list--name');

// pokemon details query selector
const idValue = document.querySelector('.details-id__value');
const frontImage = document.querySelector('.front-picture__image');
const backImage = document.querySelector('.back-picture__image');
const frontPicturePokemon = document.querySelector('.front-image-poke');
const backPicturePokemon = document.querySelector('.back-image-poke');

const nameValue = document.querySelector('.details-name__value');
const typeValue = document.querySelector('.details-types__value');
const hpValue = document.querySelector('.hp');
const attackValue = document.querySelector('.attack');
const defenseValue = document.querySelector('.defense');
const specialAttackValue = document.querySelector('.spatk');
const specialDefenseValue = document.querySelector('.spdef');
const speedValue = document.querySelector('.speed');
const abilityValue = document.querySelector('.details-ability__value');
const moveValue = document.querySelector('.details-move__value');
let pokemonContainer = [];
let abilitiesContainer = [];
let movesContainer;

// function to get pokemon inside pokemon log.
async function getPokemonList() {
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  let indexPokemon = 151;

  for (let i = 1; i <= indexPokemon; i++) {
    let response = await fetch(url + i);
    let user = await response.json();
    pokemonContainer.push(user);
  }

  Promise.all(pokemonContainer).then((results) => {
    results.forEach((result, index) => {
      generateNewPokemonList(result, index, indexPokemon);
    });
  });
}

getPokemonList();

// run the pokemon list

async function generateNewPokemonList(user, index = 0, indexPokemon = 1) {
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

  const pokemonListElemAll = document.querySelectorAll('.pokemon-list');

  // if the number of index similar with the total of pokemon
  // console.log(index, indexPokemon);
  if (index + 1 === indexPokemon) {
    // if amount of element list is bigger than one but lesser than the full index.
    if (
      pokemonListElemAll.length > 1 &&
      pokemonListElemAll.length < indexPokemon
    ) {
      // do again the iteration.
      getPokemonList();
    } else {
      // if everything is good, go fetch data based on the name.
      pokemonListElemAll.forEach((pokemon, index) => {
        pokemon.addEventListener('click', function () {
          console.log(pokemonContainer[index]);
          generatePokemonDetails(pokemonContainer[index]);
        });
      });
    }
  }
}

async function generatePokemonDetails(user) {
  // fetching each pokemon.
  // let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
  // let user = await response.json();

  // adding ID
  idValue.textContent = user.id;

  // delete inside the picture, fixing style for new image
  [frontImage, backImage].forEach((eachImage) => {
    eachImage.style.background = 'none';
    eachImage.style.transform = 'scale(1)';
    eachImage.style.width = '15rem';
    eachImage.style.height = 'auto';
  });

  // adding image.
  frontPicturePokemon.src = user.sprites.front_default;
  backPicturePokemon.src = user.sprites.back_default;

  // adding name of pokemon.
  nameValue.textContent = user.name;

  // adding type of pokemon,
  const arrayType = [];
  user.types.forEach((type) => arrayType.push(type.type.name));
  typeValue.textContent = arrayType.join(', ');

  // adding status value
  const statusValue = [
    hpValue,
    attackValue,
    defenseValue,
    specialAttackValue,
    specialDefenseValue,
    speedValue,
  ];

  statusValue.forEach(
    (value, index) => (value.textContent = user.stats[index].base_stat)
  );

  // adding ability
  const addingListOfAbilityMove = (containerList, lists, nameList) => {
    containerList.innerHTML = '';

    user[lists].forEach((list, index) => {
      const newList = document.createElement('li');
      newList.className = `${nameList}-list`;
      newList.textContent = list[nameList].name;
      containerList.appendChild(newList);

      //condition to create a scroll for so many moves.
      if (index > 4) {
        newList.parentElement.style.overflowY = 'scroll';
        newList.parentElement.style.height = '12rem';
      } else {
        newList.parentElement.style.overflowY = 'visible';
        newList.parentElement.style.height = 'auto';
      }
    });
  };
  addingListOfAbilityMove(abilityValue, 'abilities', 'ability');
  addingListOfAbilityMove(moveValue, 'moves', 'move');
}

// function to search the pokemon.

const searchBoxEl = document.querySelector('.search-box');
const searchButtonEl = document.querySelector('.search-button');

searchButtonEl.addEventListener('click', getPokemonSearch);

function getPokemonSearch() {
  pokemonLogGroupEl.innerHTML = '';
  pokemonContainer = [];

  const pokemonName = searchBoxEl.value;
  const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase();

  if (pokemonName === '') {
    getPokemonList();
  } else {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        pokemonContainer.push(result);
        console.log(result);
        generateNewPokemonList(pokemonContainer[0]);
      });
  }
  // console.log(promises[0]);
}
