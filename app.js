// Pokedex JavaScript

const getPokemon = () => {
    async function getPokemonByNum(number) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
        const data = await res.json();
        return data;
    }

    const pokeDex = [];

    for (let i = 1; i <= 12; i++) {
        pokeDex.push(getPokemonByNum(i));

    }

    Promise.all(pokeDex)
        .then((arrayOfPokemon) => {
            const pokeDex = arrayOfPokemon.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites.other['official-artwork'].front_default,
                type: data.types.map((type) => type.type.name).join(', '),
            }));
            console.log(pokeDex);
            showPokemon(pokeDex);
        });
}

const showPokemon = (pokeDex) => {
    const olElement = document.querySelector('ol');
    pokeDex.forEach((poke) => {
        const listElement = document.createElement('li');
        const imageElement = document.createElement('img');
        imageElement.src = poke.image;
        imageElement.alt = poke.image.title;
        listElement.appendChild(imageElement);
        olElement.appendChild(listElement);
    });
};

getPokemon();   