import { useEffect, useState } from "react"
import Card from "./components/Card"
import Cards from "./components/Cards";
import Scoreboard from "./components/Scoreboard"

// Get random numbers ranged 1 to x
// Todo: make random numbers unique
function randomIntegerArray(len, max) {
  return Array.from({length: len}, () => Math.floor(Math.random() * max) + 1);
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

async function getPokemonCount() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=0', {
    mode: "cors"
  });
  const pokeCount = await response.json();
  return pokeCount.count
}

async function getPokemon() {
  // Return an object with pokemon id and pokemon name
  const pokemon = []
  const pokemonCount = await getPokemonCount()
  const selectedPokemon = randomIntegerArray(16, pokemonCount) // Get 16 random pokemon
  for (let i = 0; i < selectedPokemon.length; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon[i]}`, {
      mode: "cors"
    });
    const species = await response.json()
    pokemon.push({'id' : selectedPokemon[i], 'name' : species.species.name })
  }
  return pokemon
}



function App() {
  const [pokemonChosen, setPokemonChosen] = useState([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [pokemonClicked, setPokemonClicked] = useState([])
  const [resetCount, setResetCount] = useState(0)
  function updateScore() {
    setScore(score => score + 1)
    if (score >= highScore) {
      setHighScore(score + 1)
    }
  }

  function runTurn(id) {
    // If id is a non-duplicate
    if (!pokemonClicked.includes(id)) {
      setPokemonClicked([
        ...pokemonClicked,
        id
      ])
      updateScore()
    }
    else {
      // Reset game
      console.log('game over!')
      setScore(0)
      setResetCount(resetCount + 1)
      setPokemonClicked([])
    }
    const shufflePokemon = shuffle(pokemonChosen)
    setPokemonChosen(shufflePokemon)
  }


  // Hook that updates pokemonChosen after score set to 0
  useEffect(() => {
    getPokemon().then((pokemonList) => {
      setPokemonChosen(pokemonList)
    })
  }, [resetCount])

// Some useeffect below to mount these 16 integers on mount and once the game ends.
// Randomly select x pokemon from api to be used for the game (Done)
// Shuffle on lose
// Counters for score, stored by a hook
// Grid of pokemon on bottom

// Code to fetch 16 pokemon, assign them an index, and place them into a list goes here

  return (
    <>
      <Scoreboard
      score={score}
      highscore={highScore}
      ></Scoreboard>
      <Cards 
      pokemonList={pokemonChosen}
      updater={runTurn}
      ></Cards>
    </>
  )
}

export default App
