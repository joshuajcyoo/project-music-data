
function fetchFunction(url) {
    return fetch(url)
        .then((response) => {
            return response.json();
        });
}

export function fetchAllAlbums() {
    return fetchFunction("http://localhost:3000/albums");
}

export function fetchAlbum(albumId) {
    return fetchFunction(`http://localhost:3000/albums/${albumId}`)
}

export function fetchAllSongs() {
    return fetchFunction("http://localhost:3000/songs");
}

export function fetchSong(songId) {
    return fetchFunction(`http://localhost:3000/songs/${songId}`)
}

export function fetchAllComments() {
    return fetchFunction("http://localhost:3000/comments");
}

export function postComment(albumId, name, comment, timestamp) {
    return fetch(
        `https://localhost:3000/comments`, {
            method: "POST",
            body: JSON.stringify({
                album_id: albumId,
                name: name, 
                body: comment,
                timestamp: timestamp,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }
    )
    .then((response) => {
        return response.json();
    })
}