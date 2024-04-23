import Card from "./Card";

export default function Cards({ pokemonList, updater }) {
  return (
    <>
      <div className="card-container">
        {pokemonList.map((pokemon) => (
          <Card
            name={pokemon.name}
            key={pokemon.id}
            id={pokemon.id}
            updater={updater}
          ></Card>
        ))}
      </div>
    </>
  );
}
