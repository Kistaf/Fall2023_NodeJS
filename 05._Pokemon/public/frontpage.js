function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomPokemonId = randomIntFromInterval(1, 151);

fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
  .then((response) => response.json())
  .then((result) => {
    const pokemonElement = document.getElementById("pokemon");
    pokemonElement.innerText = result.name;
  });
