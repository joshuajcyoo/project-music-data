import { Outlet, useLoaderData, useParams } from "react-router-dom";

export default function Album() {
    const album = useLoaderData();
    
    const params = useParams();
    const albumId = params.id;

    return (
        <>
            <h1>{album.album}</h1>
            <h6>Artist: {album.artist}</h6>
            <h6>Release Date: {album.release_date}</h6>
            <h6>Genre: {album.genre}</h6>
            <h5>Score: {album.score}</h5>

            {/* Implement reusable component for Spotify stats here. */}

            {/* <Link to={`/albums/${albumId}/songs`} className="link">
                Show All Songs
            </Link> */}

            <Outlet/>
        </>
    );
}