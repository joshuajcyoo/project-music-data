import { Link, useLoaderData } from "react-router-dom";
import Rating from "../Rating";

export default function Song() {
    const song = useLoaderData();

    // Requirement: Document Title
    document.title = song.song_title + " / " + song.album;
    
    return (
        <div id="song">
            <h1 id="song-title">Song: {song.song_title}</h1>
            <Link to={`/albums/${song.album_id}`}>
                <h6 id="song-album">Album: {song.album}</h6>
            </Link>
            <h6 id="song-artist">Artist: {song.artist}</h6>
            <h6 id="song-length">Length: {song.song_length_formatted}</h6>

            <Rating 
                type={"Song"}
                length_formatted={song.song_length_formatted}
                length_seconds={song.song_length_seconds}
                tempo_bpm={song.song_tempo}
                popularity={song.song_popularity}
                danceability={song.song_danceability}
                energy={song.song_energy}
                positiveness={song.song_positiveness}
                speechiness={song.song_speechiness}
                liveness={song.song_liveness}
            />
        </div>
    );
}