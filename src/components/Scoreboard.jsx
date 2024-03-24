export default function Scoreboard({score, highscore}) {
    return <>
        <div className="scoreboard">
            <div>High score: {highscore}</div>
            <div>Score: {score}</div>
            <div>Choose a pokemon. Do not choose the same pokemon twice!</div>
        </div>
    </>
}