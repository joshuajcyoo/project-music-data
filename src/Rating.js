
// FP Req: Reusable Component w/ Prop(s)
export default function Rating(props) {
    const {type, number_of_tracks, length_formatted, length_seconds, tempo_bpm, popularity, danceability, energy, positiveness, speechiness, liveness} = props;

    let descriptor;
    if (type == "Album") {
        descriptor = "Average";
    } 
    else if (type == "Song") {
        descriptor = "Song";
        document.getElementById("rating-number-of-tracks").className="d-none col rating-container-col"
    }

    return (
        <div classNameName="container" id="rating-container">
            <div classNameName="row">
                <div className="col rating-container-col">
                    SPOTIFY STATS
                </div>
            </div>
            <div classNameName="row">
                <div id="rating-number-of-tracks" className="col rating-container-col">
                    Number of Tracks: {number_of_tracks}
                </div>
                <div className="col rating-container-col">
                    {descriptor} Length: {length_formatted} / {length_seconds} s
                </div>
                <div className="col rating-container-col">
                    {descriptor} Tempo (BPM): {tempo_bpm}
                </div>
            </div>
            <div className="row">
                <div className="col rating-container-col">
                    {descriptor} Popularity: {popularity}
                </div>
                <div className="col rating-container-col">
                    {descriptor} Danceability: {danceability}
                </div>
                <div className="col rating-container-col">
                    {descriptor} Energy: {energy}
                </div>
            </div>
            <div className="row">
                <div className="col rating-container-col">
                    {descriptor} Positiveness: {positiveness}
                </div>
                <div className="col rating-container-col">
                    {descriptor} Speechiness: {speechiness}
                </div>
                <div className="col rating-container-col">
                    {descriptor} Liveness: {liveness}
                </div>
            </div>
        </div>
    );
}