// Pokedex JavaScript

const pokeDex = {};
pokeDex.generation = 1;
pokeDex.numPokemon = 151;
pokeDex.region = 'Kanto';
pokeDex.pokemon = [];

pokeDex.getPokemon = () => {
    async function getPokemonByNum(number) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
        const data = await res.json();
        return data;
    }

    for (let i = 1; i <= 151; i++) {
        pokeDex.pokemon.push(getPokemonByNum(i));
    }

    Promise.all(pokeDex.pokemon)
        .then((arrayOfPokemon) => {
            pokeDex.pokemon = arrayOfPokemon.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites.other['official-artwork'].front_default,
                type: data.types.map((type) => type.type.name).join(', '),
            }));
            pokeDex.showPokemon(pokeDex.pokemon);
        });
}

pokeDex.showPokemon = (pokemon) => {
    const olElement = document.querySelector('ol');
    pokemon.forEach((poke) => {
        const listElement = document.createElement('li');
        const imageElement = document.createElement('img');
        imageElement.src = poke.image;
        imageElement.alt = `Official Artwork for pokemon ${poke.name}`;
        listElement.appendChild(imageElement);
        olElement.appendChild(listElement);
        listElement.innerHTML = `<p class="pokeId"><span class="idBold">ID:</span> ${poke.id}</p>
        <img src="${imageElement.src}" alt="${imageElement.alt}">
        <p class="pokeName"><span>Name:</span> ${poke.name}</p>
        <p class="pokeType"><span>Type:</span> ${poke.type}</p>
        `;
    });
};

pokeDex.searchPokemon = () => {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener("input", (event) => {
        const value = event.target.value;
        const showSearch = pokeDex.pokemon.filter((poke) => {
            if (value === 'undefined') {
                searchInput[0].innertext = '';
                console.log(showSearch[0].innerHTML);
            } else {
                return (poke.name == value || poke.id == value);
            };
        });
        pokeDex.searchBar(showSearch[0]);
        console.log(showSearch[0]);
        // pokeDex.deletePokemon(showSearch[0]);
    });
};

pokeDex.searchBar = (poke) => {
    const ulElement = document.querySelector('ul');
    const listElement = document.createElement('li');
    const imageElement = document.createElement('img');
    imageElement.src = poke.image;
    imageElement.alt = `Official Artwork for pokemon ${poke.name}`;
    listElement.appendChild(imageElement);
    ulElement.appendChild(listElement);
    listElement.innerHTML = `<p class="pokeId"><span class="idBold">ID:</span> ${poke.id}</p>
    <img src="${imageElement.src}" alt="${imageElement.alt}">
    <p class="pokeName"><span>Name:</span> ${poke.name}</p>
    <p class="pokeType"><span>Type:</span> ${poke.type}</p>`;
};

// pokeDex.deletePokemon = () => {
//     const searchInput = document.getElementById('search');
//     searchInput.addEventListener("change", (event) => {
//         const value = event.target.value;
//         if (value === 'undefined') {
//             searchInput[0].innerHTML = '';
//             console.log(showSearch[0].innerHTML);
//         };
//     });
// };

// Delete pokemon function incomplete

pokeDex.init = () => {
    pokeDex.getPokemon();
    pokeDex.searchPokemon();
};

pokeDex.init(); 