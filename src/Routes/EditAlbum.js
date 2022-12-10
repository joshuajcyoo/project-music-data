import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditAlbum(props) {
    const propAlbumId = props.id
    const propAlbum = props.album;
    const propArtist = props.artist;
    const propReleaseDate = props.release_date;
    const propGenre = props.genre;
    const propNumberOfTracks = props.number_of_tracks;
    const propScore = props.score;

    const albumFieldId = "edit-album-name" + propAlbumId;
    const artistFieldId = "edit-artist-name" + propAlbumId;
    const releaseDateFieldId = "edit-release-date" + propAlbumId;
    const genreFieldId = "edit-genre" + propAlbumId;
    const numberOfTracksFieldId = "edit-number-of-tracks" + propAlbumId;
    const scoreFieldId = "edit-score" + propAlbumId;

    const emptyFields = "Fields must not be left blank.";

    const submit = async (event) => {
        event.preventDefault();

        let formIsFilled = true;

        const grabAllFields = document.getElementsByClassName('edit-field');
        const grabAllErrorMsgs = document.getElementsByClassName('edit-album-error');
        
        // Requirement: Custom Form Validation
        for (let i = 0; i < grabAllFields.length; i++) {
            if (!grabAllFields[i].value) {
                grabAllErrorMsgs[i].className = "text-danger edit-album-error";
                grabAllFields[i].className ="form-control form-control-sm edit-field is-invalid";
                formIsFilled = false;
            }
            else {
                grabAllErrorMsgs[i].className = "d-none text-danger edit-album-error";
                grabAllFields[i].className ="form-control form-control-sm edit-field";
            }
        }

        if (formIsFilled) {
            const album = document.getElementById(albumFieldId).value;
            const artist = document.getElementById(artistFieldId).value;
            const release_date = document.getElementById(releaseDateFieldId).value;
            const genre = document.getElementById(genreFieldId).value;
            const number_of_tracks = parseInt(document.getElementById(numberOfTracksFieldId).value);
            const score = parseInt(document.getElementById(scoreFieldId).value);

            // Requirement: PATCH call
            await fetch(
                `http://localhost:3000/albums/${propAlbumId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    album: album,
                    artist: artist,
                    release_date: release_date,
                    genre: genre,
                    number_of_tracks: number_of_tracks,
                    score: score
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                }
            );

            // Requirement: Toastify Notification
            toast.warning('Album information successfully edited!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    return (
        <form onSubmit={submit} id="edit-album-form">
            <label for={albumFieldId}>Album Title</label>
            <input id={albumFieldId} name="edit-album-name" className="form-control form-control-sm edit-field" type="text" defaultValue={propAlbum}/>
            <div className="d-none text-danger edit-album-error">{emptyFields}</div>

            <label for={artistFieldId}>Artist</label>
            <input id={artistFieldId} name="edit-artist-name" className="form-control form-control-sm edit-field" type="text" defaultValue={propArtist}/>
            <div className="d-none text-danger edit-album-error">{emptyFields}</div>

            <label for={releaseDateFieldId}>Release Date</label>
            <input id={releaseDateFieldId} name="edit-release-date" className="form-control form-control-sm edit-field" type="text" defaultValue={propReleaseDate}/>
            <div className="d-none text-danger edit-album-error">{emptyFields}</div>

            <label for={genreFieldId}>Genre</label>
            <input id={genreFieldId} name="edit-genre" className="form-control form-control-sm" type="text" defaultValue={propGenre}/>
            <div className="d-none text-danger edit-album-error">{emptyFields}</div>

            <label for={numberOfTracksFieldId}>Number of Tracks</label>
            <input id={numberOfTracksFieldId} name="edit-number-of-tracks" className="form-control form-control-sm edit-field" type="text" defaultValue={propNumberOfTracks}/>
            <div className="d-none text-danger edit-album-error">{emptyFields}</div>

            <label for={scoreFieldId}>Score</label>
            <input id={scoreFieldId} name="edit-score" className="form-control form-control-sm edit-field" type="text" defaultValue={propScore}/>
            <div className="d-none text-danger edit-album-error">{emptyFields}</div>

            <button id="edit-album-button" type="submit" className="btn btn-dark btn-sm">Edit Album</button>      
        </form>
    );
}