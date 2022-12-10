
// FP Req: Reusable Component w/ Prop(s)
export default function Rating(props) {
    const {type, length_formatted, length_seconds, tempo_bpm, popularity, danceability, energy, positiveness, speechiness, liveness} = props;

    let descriptor;
    let songLength;
    if (type == "Album") {
        descriptor = "Avg";
        songLength = "Song "
    } 
    else if (type == "Song") {
        descriptor = "Song";
        songLength = "";
    }

    return (
        <div id="rating">
            <div data-testid="rating-title" id="rating-title"><span data-testid="rating-title-spotify" id="spotify">Spotify</span> Stats</div>
            <div data-testid="stat-container" className="container" id="rating-container">
                <div data-testid="stat-row1" className="row">
                    <div className="col rating-container-col">
                        <div data-testid="stat-length-title" className="stat-title">{descriptor} {songLength}Length:</div>
                        <div data-testid="stat-length" className="stat-stat">{length_formatted} / {length_seconds} s</div>
                    </div>
                    <div className="col rating-container-col">
                        <div data-testid="stat-tempo-title" className="stat-title">{descriptor} Tempo:</div> 
                        <div data-testid="stat-tempo" className="stat-stat">{tempo_bpm} (bpm)</div>
                    </div>
                </div>
                <div data-testid="stat-row2" className="row">
                    <div className="col rating-container-col">
                        <div data-testid="stat-popularity-title" className="stat-title">{descriptor} Popularity:</div>
                        <div data-testid="stat-popularity" className="stat-stat">{popularity}</div>
                    </div>
                    <div className="col rating-container-col">
                        <div data-testid="stat-danceability-title" className="stat-title">{descriptor} Danceability:</div>
                        <div data-testid="stat-danceability" className="stat-stat">{danceability}</div>
                    </div>
                    <div className="col rating-container-col">
                        <div data-testid="stat-energy-title" className="stat-title">{descriptor} Energy:</div>
                        <div data-testid="stat-energy" className="stat-stat">{energy}</div>
                    </div>
                </div>
                <div data-testid="stat-row3" className="row">
                    <div className="col rating-container-col">
                        <div data-testid="stat-positiveness-title" className="stat-title">{descriptor} Positiveness:</div>
                        <div data-testid="stat-positiveness" className="stat-stat">{positiveness}</div>
                    </div>
                    <div className="col rating-container-col">
                        <div data-testid="stat-speechiness-title" className="stat-title">{descriptor} Speechiness:</div>
                        <div data-testid="stat-speechiness" className="stat-stat">{speechiness}</div>
                    </div>
                    <div className="col rating-container-col">
                        <div data-testid="stat-liveness-title" className="stat-title">{descriptor} Liveness:</div>
                        <div data-testid="stat-liveness" className="stat-stat">{liveness}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}