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
            pokeDex.showPokemon(pokeDex.pokemon.slice(0, 12));
        });
}

pokeDex.showPokemon = (pokemon) => {
    const olElement = document.querySelector('ol');

    for (let i = 0; i < pokemon.length; i++) {
        const poke = pokemon[i];
        const listElement = document.createElement('li');
        const imageElement = document.createElement('img');
        imageElement.src = poke.image;
        imageElement.alt = `Official Artwork for pokemon ${poke.name}`;
        listElement.appendChild(imageElement);
        listElement.innerHTML = `<p class="pokeId"><span class="idBold">ID:</span> ${poke.id}</p>
        <img src="${imageElement.src}" alt="${imageElement.alt}">
        <p class="pokeName"><span>Name:</span> ${poke.name}</p>
        <p class="pokeType"><span>Type:</span> ${poke.type}</p>
        `;
        olElement.appendChild(listElement);
    }
}

const loadMoreButton = document.getElementById('showMore');
const loadLessButton = document.getElementById('showLess');
const olElement = document.querySelector('ol');
loadLessButton.disabled = true;

pokeDex.showMore = () => {
    loadMoreButton.addEventListener('click', () => {
        const olElement = document.querySelector('ol');
        const startIndex = olElement.children.length;
        const endIndex = startIndex + 12;
        pokeDex.showPokemon(pokeDex.pokemon.slice(startIndex, endIndex));
    
        if (endIndex >= pokeDex.pokemon.length) {
            loadMoreButton.disabled = true;
        };

        if (olElement.children.length > 12) {
            loadLessButton.disabled = false;
        };
    });
    pokeDex.showLess();
}

pokeDex.showLess = () => {
    loadLessButton.addEventListener('click', () => {
        const olElement = document.querySelector('ol');
        const startIndex = olElement.children.length;        
        let endIndex;
        
        if (olElement.children.length === 151) {
            endIndex = startIndex - 7;
        } else {
            endIndex = startIndex - 12;
        };

        const removedChildren = Array.from(olElement.children).slice(endIndex, startIndex);
        removedChildren.forEach(child => olElement.removeChild(child));
        
        if (olElement.children.length === 12) {
            loadLessButton.disabled = true;
        };

        if (olElement.children.length < 151) {
            loadMoreButton.disabled = false;
        };
    });
}

pokeDex.init = () => {
    pokeDex.getPokemon();
    pokeDex.showMore();
};

pokeDex.init(); 

