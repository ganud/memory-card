// Takes in an id to display a pokemon infographic
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{index}.png

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

export default function Card({id, name}) {
    return <>
    <div className="card">
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="" />
        <div className="name">{capitalize(name)}</div>
    </div>
    
    
    </>
}