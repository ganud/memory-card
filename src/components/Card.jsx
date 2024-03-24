// Takes in an id to display a pokemon infographic
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{index}.png

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

export default function Card({id, name, updater}) {
    return <>
    <div className="card" onClick={() => updater(id)}>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="" />
        <div className="name">{capitalize(name)}</div>
    </div>
    
    
    </>
}