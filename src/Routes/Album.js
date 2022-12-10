import { Link, Outlet, useLoaderData } from "react-router-dom";
import Rating from "../Rating";

export default function Album() {    
    const album = useLoaderData();

    // Requirement: Document Title
    document.title = album.album + " by " + album.artist;

    let scoreClass;
    if (album.score >= 7) {
        scoreClass = "d-inline-flex justify-content-end text-success";
    }
    else if (album.score <= 3) {
        scoreClass = "d-inline-flex justify-content-end text-danger";
    }
    else {
        scoreClass = "d-inline-flex justify-content-end text-warning";
    }

    return (
        <>
            <Link to={`/scores`} id="back-arrow-link">
                <div id="back-arrow">←</div>
            </Link>
            <div id="album">
                <div id="album-title" className="d-inline-flex justify-content-start">Album: {album.album}</div>
                <div id="album-score" className={scoreClass}>Score: {album.score}</div>
                <h6 id="album-artist">Artist: {album.artist}</h6>
                <h6 id="album-number-of-tracks">Number of Tracks: {album.number_of_tracks}</h6>
                <h6 id="album-release-date">Release Date: {album.release_date}</h6>
                <h6 id="album-genre">Genre: {album.genre}</h6>

                <Rating 
                    type={"Album"}
                    length_formatted={album.avg_length[0]}
                    length_seconds={album.avg_length[1]}
                    tempo_bpm={album.avg_tempo_bpm}
                    popularity={album.avg_popularity}
                    danceability={album.avg_danceability}
                    energy={album.avg_energy}
                    positiveness={album.avg_positiveness}
                    speechiness={album.avg_speechiness}
                    liveness={album.avg_liveness}
                />

                <Outlet/>
            </div>
        </>
    );
}