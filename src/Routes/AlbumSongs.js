import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";

export default function AlbumSongs() {
    const allSongs = useLoaderData();
    const params = useParams();
    const albumId = params.id;

    const albumSongs = allSongs.filter(song => song.album_id == albumId);
    let songNumber = 1;
    
    return (
        <>
            <div id="album-songs">
                <div id="album-songs-title">Tracklist</div>
                <table id="album-songs-table" className="table table-hover w-50">
                    <thead>
                        <tr>
                            <th className="th-song-number"></th>
                            <th className="th-song-title"></th>
                            <th className="th-song-length"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {albumSongs.map((song) => {
                            songNumber++;
                            
                            return (
                                <tr>
                                    <td>{songNumber - 1}</td>
                                    <td>
                                        <Link to={`/songs/${song.id}`} className="scores-link">{song.song_title}</Link>
                                    </td>
                                    <td>{song.song_length_formatted}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Outlet/>
        </>
    );
}