'use strict';

const pokemonLogGroupEl = document.querySelector('.pokemon-log--group');
const pokemonListImageEl = document.querySelector('.pokemon-list--image');
const pokemonListNameEl = document.querySelector('.pokemon-list--name');

// pokemon details data query selector
const idValue = document.querySelector('.details-id__value');
const frontImage = document.querySelector('.front-picture__image');
const backImage = document.querySelector('.back-picture__image');
const frontPicturePokemon = document.querySelector('.front-image-poke');
const backPicturePokemon = document.querySelector('.back-image-poke');

// pokemon details status query Selector
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

// fetching data to modal
const explanationAbility = document.querySelector('.explanation__ability');
const explanationMove = document.querySelector('.explanation__move');
const abilityName = document.querySelector('.explanation__ability-name');
const abilityDesc = document.querySelector('.explanation__ability-description');
const abiliyPokemonList = document.querySelector(
  '.explanation__ability-pokemon-list'
);
const moveName = document.querySelector('.explanation__move-name');
const moveDamageClass = document.querySelector(
  '.explanation__move-damage-class'
);
const moveTypeValue = document.querySelector('.explanation__move-type-value');
const movePpValue = document.querySelector('.explanation__move-pp-value');
const movePowerValue = document.querySelector('.explanation__move-power-value');
const moveAccuValue = document.querySelector('.explanation__move-accu-value');
const moveDescription = document.querySelector('.explanation__move-desc-value');
const movePokemonList = document.querySelector(
  '.explanation__move-pokemon-list'
);

// explanation modal
const explanationModal = document.querySelector('.explanation');
const blurScreen = document.querySelector('.blur-screen');
const explanationButton = document.querySelector('.explanation__esc');

// container from data fetching.
let pokemonContainer = [];
let abilitiesContainer = [];
let movesContainer = [];

// function to get pokemon inside pokemon log.
async function getPokemonList() {
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  let indexPokemon = 20;

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
  // adding ID
  idValue.textContent = user.id;

  // fixing style for new image
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

  // redefining the container to zero each time generating pokemon details.
  abilitiesContainer = [];
  movesContainer = [];

  // create function to generate ability and moves.
  const addingListOfAbilityMove = (
    parentList,
    lists,
    nameList,
    dataContainer
  ) => {
    parentList.innerHTML = '';

    user[lists].forEach(async (list, index) => {
      const newList = document.createElement('li');
      newList.className = `${nameList}-list`;
      newList.textContent = list[nameList].name;
      parentList.appendChild(newList);
      let response = await fetch(list[nameList].url);
      let user = await response.json();

      dataContainer.push(user);

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
  // use the function above to create the ability list
  addingListOfAbilityMove(
    abilityValue,
    'abilities',
    'ability',
    abilitiesContainer
  );

  // use the function above to create the move list.
  addingListOfAbilityMove(moveValue, 'moves', 'move', movesContainer);

  const abilityList = document.querySelectorAll('.ability-list');
  const moveList = document.querySelectorAll('.move-list');

  abilityList.forEach((ability, index) => {
    ability.addEventListener('click', () => {
      console.log(ability);
      const abilityName = ability.textContent;
      console.log(abilityName);

      generateExplanationModal(abilitiesContainer, abilityName, 'ability');
      openModal(explanationAbility);
    });
  });

  moveList.forEach((move) => {
    move.addEventListener('click', () => {
      console.log(move);
      const moveName = move.textContent;
      generateExplanationModal(movesContainer, moveName, 'move');
      openModal(explanationMove);
    });
  });

  explanationButton.addEventListener('click', closeModal);
}

// generate the ability.
async function generateExplanationModal(container, ability, type) {
  Promise.all(container).then((results) =>
    results.forEach((result) => {
      // if the index of clicked query same as index ability inside container,
      if (type === 'ability') {
        generateAbilityExplanation(result, ability);
      } else if (type === 'move') {
        generateMoveExplanation(result, ability);
      }
    })
  );
}

function generateAbilityExplanation(result, ability) {
  if (result.name === ability) {
    abilityName.textContent = result.name;
    // if to get the value with english language
    for (let i = 0; i < result.effect_entries.length; i++) {
      if (result.effect_entries[i].language.name === 'en') {
        abilityDesc.textContent = result.effect_entries[i].effect;
      }
    }

    abiliyPokemonList.textContent = result.pokemon
      // filter pokemon with the index smaller than total pokemon 898
      .filter((pokemon) => {
        const totalPokemon = pokemon.pokemon.url.split('/')[6];
        // console.log(indexPokemon);
        // console.log(pokemon);
        return totalPokemon <= 898;
      })

      // make all the content only the name of pokemon and then join the array.
      .map((pokemon) => pokemon.pokemon.name)
      .join(', ');
  }
}

function generateMoveExplanation(result, ability) {
  if (result.name === ability) {
    moveName.textContent = result.name;
    moveDamageClass.textContent = `(${result.damage_class.name})`;
    moveTypeValue.textContent = result.type.name;
    movePpValue.textContent = `${result.pp}/${result.pp}`;
    movePowerValue.textContent = result.power === null ? ' - ' : result.power;
    moveAccuValue.textContent =
      result.accuracy === null ? ' - ' : result.accuracy;
    console.log(result.effect_entries);
    moveDescription.textContent = result.effect_entries[0].short_effect;
    movePokemonList.textContent = result.learned_by_pokemon
      // filter pokemon with the index smaller than total pokemon 898
      .filter((pokemon) => {
        const totalPokemon = pokemon.url.split('/')[6];
        // console.log(indexPokemon);
        // console.log(pokemon);
        return totalPokemon <= 898;
      })

      // make all the content only the name of pokemon and then join the array.
      .map((pokemon) => pokemon.name)
      .join(', ');
  }
}

// blurScren clicked close modal
blurScreen.addEventListener('click', closeModal);

// if the escape on keyboard clicked, it will exit the modal.
document.addEventListener('keydown', function (e) {
  //   console.log(e.key);

  if (e.key === 'Escape' && !explanationModal.classList.contains('hidden')) {
    closeModal();
  }
});

// close modal function
function closeModal() {
  explanationModal.classList.add('hidden');
  blurScreen.classList.add('hidden');
  explanationAbility.classList.add('hidden');
  explanationMove.classList.add('hidden');
}

// open modal function
function openModal(explanation) {
  explanationModal.classList.remove('hidden');
  blurScreen.classList.remove('hidden');
  explanation.classList.remove('hidden');
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
        generateNewPokemonList(pokemonContainer[0]);
      });
  }
}
