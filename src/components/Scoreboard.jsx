export default function Scoreboard({score, highscore}) {
    return <>
        <div className="scoreboard">
            <div className="scoreboard-counter">
                <div>Score: {score}</div>
                <div>Best score: {highscore}</div>
            </div>
            <div>Choose a pokemon. Do not choose the same pokemon twice!</div>
        </div>
    </>
}