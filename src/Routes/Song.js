import { useLoaderData } from "react-router-dom";

export default function Song() {
    const song = useLoaderData();

    document.title = song.song_title + " / " + song.album;
    
    return (
        <>
            <h1>{song.song_title}</h1>
            <h6>Album: {song.album}</h6>
            <h6>Artist: {song.artist}</h6>
            <h6>Length: {song.song_length_formatted}</h6>

            {/* Implement reusable component for Spotify stats here. */}
        </>
    );
}