import { Outlet, useLoaderData } from "react-router-dom";
import Rating from "../Rating";

export default function Album() {
    const album = useLoaderData();

    return (
        <>
            <h1>{album.album}</h1>
            <h6>Artist: {album.artist}</h6>
            <h6>Release Date: {album.release_date}</h6>
            <h6>Genre: {album.genre}</h6>
            <h5>Score: {album.score}</h5>

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
        </>
    );
}