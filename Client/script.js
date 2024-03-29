const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentPokemon;

const sock=io();

let points = 0;


function startGame() {
    const randomPokemonId = Math.floor(Math.random() * 700) + 1; // Fetching from the first 151 Pokemon
    fetch(apiUrl + randomPokemonId)
        .then(response => response.json())
        .then(data => {
            currentPokemon = {
                name: data.name,
                image: data.sprites.front_default
            };

            // Display the Pokemon image
            var image = document.getElementById("pokemonImage");
            image.style.filter = 'brightness(0) contrast(100%)';
            image.src = currentPokemon.image;

            // Clear the input and result
            document.getElementById("guessInput").value = "";
            document.getElementById("result").innerText = "";
        })
        .catch(error => console.error("Error fetching Pokemon data:", error));
}

function checkEnterKey(event) {
    if (event.key === "Enter") {
        checkGuess();
        // if(checkGuess()){
        //     points++;
        // }
    }
}

function checkGuess() {
    const userGuess = document.getElementById("guessInput").value.toLowerCase();

    sock.emit("User guess:", userGuess);
    if (userGuess === currentPokemon.name) {
        var image = document.getElementById("pokemonImage");
        image.style.filter = 'none';
        document.getElementById("result").style.color = "green";
        document.getElementById("result").innerText = "Correct! It's " + currentPokemon.name;
        // return true;
    } else {
        var image = document.getElementById("pokemonImage");
        image.style.filter = 'none';
        document.getElementById("result").style.color = "red";
        document.getElementById("result").innerText = "Wrong! It's " + currentPokemon.name;
        // return false;
    }

    // Add a delay of 0.1 second (100 milliseconds) before moving to the next Pokemon
    setTimeout(startGame, 1000);
}

// Initial start of the game
startGame();
