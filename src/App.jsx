import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Scoreboard from "./components/Scoreboard";
import Castelia from "./assets/castelia.mp4";
// Get unique random numbers ranged 1 to x
function randomIntegerArray(len, max) {
  let arr = [];
  while (arr.length < len) {
    var r = Math.floor(Math.random() * max) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

async function getPokemonCount() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species/?limit=0",
    {
      mode: "cors",
    }
  );
  const pokeCount = await response.json();
  return pokeCount.count;
}

function App() {
  const [pokemonChosen, setPokemonChosen] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemonClicked, setPokemonClicked] = useState([]); // Logs already clicked Pokemon
  const [resetCount, setResetCount] = useState(0); // Updates dependency useEffect
  const [isLoading, setisLoading] = useState(true);

  // Get 16 pairs of random pokemon ids and their names
  async function getPokemon() {
    // Return an object with pokemon id and pokemon name
    const pokemon = [];
    const pokemonCount = await getPokemonCount();
    const selectedPokemon = randomIntegerArray(16, pokemonCount); // Get 16 random pokemon
    for (let i = 0; i < selectedPokemon.length; i++) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemon[i]}`,
        {
          mode: "cors",
        }
      );
      const species = await response.json();
      pokemon.push({ id: selectedPokemon[i], name: species.species.name });
    }
    setisLoading(false);
    return pokemon;
  }

  function updateScore() {
    setScore((score) => score + 1);
    if (score >= highScore) {
      setHighScore(score + 1);
    }
  }

  function runTurn(id) {
    // If id is a non-duplicate
    if (!pokemonClicked.includes(id)) {
      setPokemonClicked([...pokemonClicked, id]);
      updateScore();
    } else {
      // On game over
      setScore(0);
      setResetCount(resetCount + 1);
      setPokemonClicked([]);
      setisLoading(true);
    }
    const shufflePokemon = shuffle(pokemonChosen);
    setPokemonChosen(shufflePokemon);
  }

  // Hook that updates pokemonChosen after each game
  useEffect(() => {
    getPokemon().then((pokemonList) => {
      setPokemonChosen(pokemonList);
    });
  }, [resetCount]);

  return (
    <>
      <video autoPlay muted loop>
        <source src={Castelia} type="video/mp4"></source>
      </video>
      <Scoreboard score={score} highscore={highScore}></Scoreboard>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Cards pokemonList={pokemonChosen} updater={runTurn}></Cards>
      )}
    </>
  );
}

export default App;
