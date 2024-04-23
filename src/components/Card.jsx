function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export default function Card({ id, name, updater }) {
  return (
    <>
      <div className="card" onClick={() => updater(id)}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt=""
        />
        <div className="card-footer">{capitalize(name)}</div>
      </div>
    </>
  );
}
