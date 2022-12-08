import { Outlet, useLoaderData } from "react-router-dom";
import Rating from "../Rating";

export default function Album() {    
    const album = useLoaderData();

    document.title = album.album + " by " + album.artist;

    return (
        <div id="album">
            <h1 id="album-title">Album: {album.album}</h1>
            <h6 id="album-artist">Artist: {album.artist}</h6>
            <h6 id="album-release-date">Release Date: {album.release_date}</h6>
            <h6 id="album-genre">Genre: {album.genre}</h6>
            <h5 id="score">Score: {album.score}</h5>

            <Rating 
                type={"Album"}
                number_of_tracks={album.number_of_tracks}
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
    );
}