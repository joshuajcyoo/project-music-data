
function fetchFunction(url) {
    return fetch(url)
        .then((response) => {
            return response.json();
        });
}

// FP Req: GET call

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

export function fetchAllUsers() {
    return fetchFunction("http://localhost:3000/users");
}