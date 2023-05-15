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
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defence: data.stats[2].base_stat,
                special_attack: data.stats[3].base_stat,
                special_defence: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
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

pokeDex.searchPokemon = () => {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (event) => {
        const value = event.target.value.toLowerCase();
        let showSearch = [];
        if (value === '') {
            searchInput.innerText = '';
        } else {
            showSearch = pokeDex.pokemon.filter((poke) => {
                return (poke.name == value || poke.id == value);
            });
        }
        pokeDex.searchBar(showSearch.length > 0 ? showSearch[0] : null);
    });
};

pokeDex.searchBar = (poke) => {
    const ulElement = document.querySelector('ul');
    ulElement.innerHTML = '';
    if (!poke) {
        searchInput[0].innerText = '';
        return;
    }
    const listElement = document.createElement('li');
    const imageElement = document.createElement('img');
    imageElement.src = poke.image;
    imageElement.alt = `Official Artwork for pokemon ${poke.name}`;
    listElement.appendChild(imageElement);
    ulElement.appendChild(listElement);
    listElement.innerHTML = 
    `
    <p class="pokeId"><span class="idBold">ID:</span> ${poke.id}</p>
    <section class="pokemonStats">
        <section class="pokeInfo">
        <img src="${imageElement.src}" alt="${imageElement.alt}">
        <p class="pokeName"><span>Name:</span> ${poke.name}</p>
        <p class="pokeType"><span>Type:</span> ${poke.type}</p>
        </section>
        <section class="pokeStats">
        <p><span>HP:</span> ${poke.hp}</p>
        <p><span>Attack:</span> ${poke.attack}</p>
        <p><span>Defence:</span> ${poke.defence}</p>
        <p><span>Sp. Atk:</span> ${poke.special_attack}</p>
        <p><span>Sp. Def:</span> ${poke.special_defence}</p>
        <p><span>Speed:</span> ${poke.speed}</p>
        </section>
    </section>
    `;

    pokeDex.pokeType = () => {
        const type = document.querySelector('ul li');
        const typeText = poke.type;
        const commaIndex = poke.type.indexOf(', ');
        let specifiedTextContext = '';

        if (commaIndex !== -1) {
            specifiedTextContext = typeText.substring(0, commaIndex);
        } else {
            specifiedTextContext = typeText;
        }
        console.log(specifiedTextContext);

        type.classList.add(`${specifiedTextContext}`);
    }
    pokeDex.pokeType();
};



pokeDex.init = () => {
    pokeDex.getPokemon();
    pokeDex.showMore();
    pokeDex.searchPokemon();
};

pokeDex.init(); 