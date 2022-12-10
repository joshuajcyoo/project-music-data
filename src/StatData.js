import regression from 'regression';

export function getCoordinates(albums, statType) {
    let arrayCoordObj = [];

    if (statType == "avg_length") {
        arrayCoordObj.push("Avg Song Length (sec)")
        for (let album of albums) {
            let coordinateObj = {
                x: album.avg_length[1],
                y: album.score
            }
            arrayCoordObj.push(coordinateObj);
        }
    }
    else if (statType == "avg_tempo_bpm") {
        arrayCoordObj.push("Avg Song Tempo (bpm)");
        for (let album of albums) {
            let coordinateObj = {
                x: album.avg_tempo_bpm,
                y: album.score
            }
            arrayCoordObj.push(coordinateObj);
        }
    }
    else if (statType == "avg_popularity") {
        arrayCoordObj.push("Avg Popularity");
        for (let album of albums) {
            let coordinateObj = {
                x: album.avg_popularity,
                y: album.score
            }
            arrayCoordObj.push(coordinateObj);
        }
    }
    else if (statType == "avg_danceability") {
        arrayCoordObj.push("Avg Danceability");
        for (let album of albums) {
            let coordinateObj = {
                x: album.avg_danceability,
                y: album.score
            }
            arrayCoordObj.push(coordinateObj);
        }
    }
    else if (statType == "avg_energy") {
        arrayCoordObj.push("Avg Energy");
        for (let album of albums) {
            let coordinateObj = {
                x: album.avg_energy,
                y: album.score
            }
            arrayCoordObj.push(coordinateObj);
        }
    }
    else if (statType == "avg_positiveness") {
        arrayCoordObj.push("Avg Positiveness");
        for (let album of albums) {
            let coordinateObj = {
                x: album.avg_positiveness,
                y: album.score
            }
            arrayCoordObj.push(coordinateObj);
        }
    }
    else if (statType == "avg_speechiness") {
        arrayCoordObj.push("Avg Speechiness");
        for (let album of albums) {
            let coordinateObj = {
                x: album.avg_speechiness,
                y: album.score
            }
            arrayCoordObj.push(coordinateObj);
        }
    }
    else if (statType == "avg_liveness") {
        arrayCoordObj.push("Avg Liveness");
        for (let album of albums) {
            let coordinateObj = {
                x: album.avg_liveness,
                y: album.score
            }
            arrayCoordObj.push(coordinateObj);
        }
    }
    else if (statType == "number_of_tracks") {
        arrayCoordObj.push("Number of Tracks");
        for (let album of albums) {
            let coordinateObj = {
                x: album.number_of_tracks,
                y: album.score
            }
            arrayCoordObj.push(coordinateObj);
        }
    }

    return arrayCoordObj;
}

export function getRegressionCoordinates(albums, statType) {
    let arrayCoordArr = [];
    let minX = 1000;
    let maxX = 0;
    if (statType == "avg_length") {
        for (let album of albums) {
            arrayCoordArr.push([album.avg_length[1], album.score]);
            if (album.avg_length[1] > maxX) {
                maxX = album.avg_length[1];
            }
            if (album.avg_length[1] < minX) {
                minX = album.avg_length[1];
            }
        }
    }
    else if (statType == "avg_tempo_bpm") {
        for (let album of albums) {
            arrayCoordArr.push([album.avg_tempo_bpm, album.score]);
            if (album.avg_tempo_bpm > maxX) {
                maxX = album.avg_tempo_bpm;
            }
            if (album.avg_tempo_bpm < minX) {
                minX = album.avg_tempo_bpm;
            }
        }
    }
    else if (statType == "avg_popularity") {
        for (let album of albums) {
            arrayCoordArr.push([album.avg_popularity, album.score]);
            if (album.avg_popularity > maxX) {
                maxX = album.avg_popularity;
            }
            if (album.avg_popularity < minX) {
                minX = album.avg_popularity;
            }
        }
    }
    else if (statType == "avg_danceability") {
        for (let album of albums) {
            arrayCoordArr.push([album.avg_danceability, album.score]);
            if (album.avg_danceability > maxX) {
                maxX = album.avg_danceability;
            }
            if (album.avg_danceability < minX) {
                minX = album.avg_danceability;
            }
        }
    }
    else if (statType == "avg_energy") {
        for (let album of albums) {
            arrayCoordArr.push([album.avg_energy, album.score]);
            if (album.avg_energy > maxX) {
                maxX = album.avg_energy;
            }
            if (album.avg_energy < minX) {
                minX = album.avg_energy;
            }
        }
    }
    else if (statType == "avg_positiveness") {
        for (let album of albums) {
            arrayCoordArr.push([album.avg_positiveness, album.score]);
            if (album.avg_positiveness > maxX) {
                maxX = album.avg_positiveness;
            }
            if (album.avg_positiveness < minX) {
                minX = album.avg_positiveness;
            }
        }
    }
    else if (statType == "avg_speechiness") {
        for (let album of albums) {
            arrayCoordArr.push([album.avg_speechiness, album.score]);
            if (album.avg_speechiness > maxX) {
                maxX = album.avg_speechiness;
            }
            if (album.avg_speechiness < minX) {
                minX = album.avg_speechiness;
            }
        }
    }
    else if (statType == "avg_liveness") {
        for (let album of albums) {
            arrayCoordArr.push([album.avg_liveness, album.score]);
            if (album.avg_liveness > maxX) {
                maxX = album.avg_liveness;
            }
            if (album.avg_liveness < minX) {
                minX = album.avg_liveness;
            }
        }
    }
    else if (statType == "number_of_tracks") {
        for (let album of albums) {
            arrayCoordArr.push([album.number_of_tracks, album.score]);
            if (album.number_of_tracks > maxX) {
                maxX = album.number_of_tracks;
            }
            if (album.number_of_tracks < minX) {
                minX = album.number_of_tracks;
            }
        }
    }

    const result = regression.linear(arrayCoordArr);
    const slope = result.equation[0];
    const yInt = result.equation[1];
    
    let regressionCoordinates = [];
    const y1 = slope * minX + yInt;
    regressionCoordinates.push({x: minX, y: y1});
    const y2 = slope * maxX + yInt;
    regressionCoordinates.push({x: maxX, y: y2});

    return regressionCoordinates;
}