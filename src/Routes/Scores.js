import { Link, Outlet, useLoaderData } from "react-router-dom";

export default function Scores() {
    let albums = useLoaderData();
    console.log(albums);
    
    return (
    <>
        <div>
            Chart Goes Here
        </div>
        <div>
            <table className="table table-sm table-hover w-75">
                <thead>
                    <tr>
                        <th className="bg-dark th-score">Score</th>
                        <th className="th-album">Album</th>
                        <th className="th-artist">Artist</th>
                        <th className="th-release">Release Date</th>
                        <th className="th-genre">Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {albums.map((album) => {
                        let score_color;
                        if (album.score >= 7) {
                            score_color = "text-success";
                        }
                        else if (album.score <= 3) {
                            score_color = "text-danger";
                        }
                        else {
                            score_color = "text-warning"
                        }

                        return (
                        <tr>
                            <td className={score_color}>{album.score}</td>
                            <td>
                                <Link to={`/albums/${album.id}`} className="text-dark scores-link">{album.album}</Link>
                            </td> 
                            <td>{album.artist}</td>
                            <td>{album.release_date}</td>
                            <td>{album.genre}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

        <Outlet />
    </>
    );
}

// const filterAlbums = (albums, genre, year) => {
    
// }