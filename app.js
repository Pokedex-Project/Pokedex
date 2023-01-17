const pokemonURL = 'https://pokeapi.co/api/v2/pokemon/1/';
async function getPokemonByNum(number) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const data = await res.json();
    return data;
}
const pokeBag = [];

for (let i = 1; i <= 151; i++) {
    pokeBag.push(getPokemonByNum(i));
}
console.log(pokeBag);

Promise.all(pokeBag)

    .then((arrayOfPokemon) => {
        arrayOfPokemon.forEach(pokemon => {
            console.log(pokemon.name);
        })
    })