
// FP Req: Reusable Component w/ Prop(s)
export default function Rating(props) {
    const {number_of_tracks, length_formatted, length_seconds, tempo_bpm, popularity, danceability, energy, positiveness, speechiness, liveness} = props;

    return (
        <div className="container" id="rating-container">
            <div className="row">
                <div class="col rating-container-col">
                    SPOTIFY STATS
                </div>
            </div>
            <div className="row">
                <div class="col rating-container-col">
                    Number of Tracks: {number_of_tracks}
                </div>
                <div class="col rating-container-col">
                    Average Length: {length_formatted} / {length_seconds} s
                </div>
                <div class="col rating-container-col">
                    Average Tempo (BPM): {tempo_bpm}
                </div>
            </div>
            <div class="row">
                <div class="col rating-container-col">
                    Average Popularity: {popularity}
                </div>
                <div class="col rating-container-col">
                    Average Danceability: {danceability}
                </div>
                <div class="col rating-container-col">
                    Average Energy: {energy}
                </div>
            </div>
            <div class="row">
                <div class="col rating-container-col">
                    Average Positiveness: {positiveness}
                </div>
                <div class="col rating-container-col">
                    Average Speechiness: {speechiness}
                </div>
                <div class="col rating-container-col">
                    Average Liveness: {liveness}
                </div>
            </div>
        </div>
    );
}