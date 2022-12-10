
// FP Req: Reusable Component w/ Prop(s)
export default function Rating(props) {
    const {type, length_formatted, length_seconds, tempo_bpm, popularity, danceability, energy, positiveness, speechiness, liveness} = props;

    let descriptor;
    let songLength;
    if (type == "Album") {
        descriptor = "Avg";
        songLength = "Song"
    } 
    else if (type == "Song") {
        descriptor = "Song";
        songLength = ""
    }

    return (
        <div id="rating">
            <div id="rating-title"><span id="spotify">Spotify</span> Stats</div>
            <div className="container" id="rating-container">
                <div className="row">
                    <div className="col rating-container-col">
                        <div className="stat-title">{descriptor} {songLength} Length:</div>
                        <div className="stat-stat">{length_formatted} / {length_seconds} s</div>
                    </div>
                    <div className="col rating-container-col">
                        <div className="stat-title">{descriptor} Tempo:</div> 
                        <div className="stat-stat">{tempo_bpm} (bpm)</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col rating-container-col">
                        <div className="stat-title">{descriptor} Popularity: </div>
                        <div className="stat-stat">{popularity}</div>
                    </div>
                    <div className="col rating-container-col">
                        <div className="stat-title">{descriptor} Danceability: </div>
                        <div className="stat-stat">{danceability}</div>
                    </div>
                    <div className="col rating-container-col">
                        <div className="stat-title">{descriptor} Energy: </div>
                        <div className="stat-stat">{energy}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col rating-container-col">
                        <div className="stat-title">{descriptor} Positiveness: </div>
                        <div className="stat-stat">{positiveness}</div>
                    </div>
                    <div className="col rating-container-col">
                        <div className="stat-title">{descriptor} Speechiness: </div>
                        <div className="stat-stat">{speechiness}</div>
                    </div>
                    <div className="col rating-container-col">
                        <div className="stat-title">{descriptor} Liveness: </div>
                        <div className="stat-stat">{liveness}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}