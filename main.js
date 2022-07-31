const pokeContainer$$ = document.getElementById('poke_container')
const previousBtn = document.getElementById('previous')
const nextBtn = document.getElementById('next')

previousBtn.addEventListener('click', () => {
  if (offset !== 1) {
    offset -= 9
    removePokemons(pokeContainer$$)
    fetchPokemons(offset, limit)
  }
})

nextBtn.addEventListener('click', () => {
  offset += 9
  removePokemons(pokeContainer$$)
  fetchPokemons(offset, limit)
})

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  .then(res => res.json())
  .then(res => {
    createPokemon(res)
  })
}

let offset = 1
let limit = 8

function fetchPokemons(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i)
  }
}

function createPokemon(pokemon) {
  const flipCard$$ = document.createElement('div')
  flipCard$$.classList.add('flip-card')
 
  const containerCard$$ = document.createElement('div')
  containerCard$$.classList.add('card-container')
  flipCard$$.appendChild(containerCard$$)



  const card$$ = document.createElement('div')
  card$$.classList.add('pokeBlock')

  const imgContainer$$ = document.createElement('div')
  imgContainer$$.classList.add('imgContanier')

  const img$$ = document.createElement('img')
  img$$.src = pokemon.sprites.front_default

  imgContainer$$.appendChild(img$$)

  const number = document.createElement('p')
  number.textContent = `#${pokemon.id.toString()}`

  const name$$ = document.createElement('p')
  name$$.classList.add('name')
  name$$.textContent = pokemon.name

  card$$.appendChild(imgContainer$$)
  card$$.appendChild(number)
  card$$.appendChild(name$$)

  const cardBack$$ = document.createElement('div')
  cardBack$$.classList.add('pokemon-block-back')

  cardBack$$.appendChild(statsBars(pokemon.stats))

  containerCard$$.appendChild(card$$)
  containerCard$$.appendChild(cardBack$$)
  
  pokeContainer$$.appendChild(flipCard$$)
}

function removePokemons(father) {
  while (father.firstChild) {
    father.removeChild(father.firstChild)
  }
}

function statsBars(stats) {
  const statsContainer$$ = document.createElement('div')
  statsContainer$$.classList.add('stats-container')

  for (let i = 0; i < 3; i++) {
    const stat = stats[i]

    const statPerc = stat.base_state  + "%"
    const statContainer$$ = document.createElement('div')
    statContainer$$.classList.add('stat-container')

    const statName$$ = document.createElement('div')
    statName$$.textContent = stat.stat.name

    const progress$$ = document.createElement('div')
    progress$$.classList.add('progress')

    const progressContainer$$ = document.createElement('div')

    progressContainer$$.textContent = stat.base_stat

    progress$$.appendChild(progressContainer$$)
    statContainer$$.appendChild(statName$$)
    statContainer$$.appendChild(progress$$)
    statsContainer$$.appendChild(statContainer$$)
  }
  return statsContainer$$
}

fetchPokemons(offset, limit)