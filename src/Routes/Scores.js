import { Link, Outlet, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

export default function Scores() {
    document.title = "Explore Data by Scores";
    
    const compareId = (a, b) => {        
        return b.id - a.id;
    }
    const compareScore = (a, b) => {
        return b.score - a.score;
    }
    const compareAlbum = (a, b) => {
        return a.album.localeCompare(b.album);
    }
    const compareArtist = (a, b) => {
        return a.artist.localeCompare(b.artist);
    }
    const compareGenre = (a, b) => {
        return a.genre.localeCompare(b.genre);
    }
    
    const albumData = useLoaderData().sort(compareId);
    const [albums, setAlbums] = useState(albumData);

    const [chosenGenre, setChosenGenre] = useState("All Genres"); 
    const [chosenYear, setChosenYear] = useState("All Years");
    
    const count = new Map();
    for (let i = 0; i < 11; i++) {
        count.set(i, 0);
    }
    for (const album of albums) {
        const currentCount = count.get(album.score);
        count.set(album.score, currentCount + 1);
    }
    const calculatedData = Array.from(count.values())

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
            x: {
                ticks: {
                    color: 'white',
                    beginAtZero: true
                },
                title: {
                    display: true,
                    text: 'Album Score',
                    color: 'white'
                }
            },
            y: {
                ticks: {
                    color: 'white',
                    beginAtZero: true
                },
                title: {
                    display: true,
                    text: 'Number of Albums Scored',
                    color: 'white'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                color: 'white'
            },
            title: {
                display: true,
                text: 'Explore Data By Scores',
                font: {
                    size: 30
                },
                color: 'white'
            },
        },
    };

    const labels = [...Array(11).keys()];

    const data = {
        labels,
        datasets: [
          {
            label: 'Album Scores',
            data: calculatedData,
            backgroundColor: 'black',
          }
        ]
      };
    
    return (
    <div id="scores">
        <div id="chart-wrapper">
            <Bar options={options} data={data} />
        </div>
        <div id="filters-title" className="d-flex justify-content-center">Filters</div>
        <div id="scores-dropdowns" className="d-flex justify-content-center">
            <select className="form-select form-select-sm" id="select-genre" value={chosenGenre} onChange={((event) => {
                setChosenGenre(event.target.value);
                if (event.target.value === "All Genres") {
                    if (chosenYear == "All Years") {
                        setAlbums(albumData);
                    }
                    else {
                        setAlbums(albumData.filter(album => album.release_date.slice(6) == chosenYear));
                    }
                }
                else {
                    if (chosenYear == "All Years") {
                        setAlbums(albumData.filter(album => album.genre == event.target.value));
                    }
                    else {
                        setAlbums(albumData.filter(album => album.genre == event.target.value && album.release_date.slice(6) == chosenYear));
                    }
                }
            })}>
                <option value="All Genres">All Genres</option>
                <option value="Alternative">Alternative</option>
                <option value="Country">Country</option>
                <option value="Dance">Dance</option>
                <option value="Electronic">Electronic</option>
                <option value="Hip-Hop/Rap">Hip-Hop/Rap</option>
                <option value="K-Pop">K-Pop</option>
                <option value="Pop">Pop</option>
                <option value="R&B/Soul">R&B/Soul</option>
            </select>

            <select className="form-select form-select-sm" id="select-year" value={chosenYear} onChange={((event) => {
                setChosenYear(event.target.value);
                if (event.target.value === "All Years") {
                    if (chosenGenre == "All Genres") {
                        setAlbums(albumData);
                    }
                    else {
                        setAlbums(albumData.filter(album => album.genre == chosenGenre));
                    }
                }
                else {
                    if (chosenGenre == "All Genres") {
                        setAlbums(albumData.filter(album => album.release_date.slice(6) == event.target.value));
                    }
                    else {
                        setAlbums(albumData.filter(album => album.release_date.slice(6) == event.target.value && album.genre == chosenGenre));
                    }
                }
            })}>
                <option value="All Years">All Years</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
            </select>
        </div>
        <div>
            <table id="scores-table" className="table table-sm table-hover">
                <thead>
                    <tr id="scores-table-header">
                        <th className="th-score"><button className="sort-albums-table" id="sort-score" onClick={(() => {
                            const scoresScore = [...albums].sort(compareScore);
                            setAlbums(scoresScore);
                        })}>Score</button></th>
                        <th className="th-album"><button className="sort-albums-table" onClick={(() => {
                            const scoresAlbum = [...albums].sort(compareAlbum);
                            setAlbums(scoresAlbum);
                        })}>Album</button></th>
                        <th className="th-artist"><button className="sort-albums-table" onClick={(() => {
                            const scoresArtist = [...albums].sort(compareArtist);
                            setAlbums(scoresArtist);
                        })}>Artist</button></th>
                        <th className="th-release"><button className="sort-albums-table" onClick={(() => {
                            const scoresRelease = albumData;
                            setAlbums(scoresRelease);
                        })}>Release Date</button></th>
                        <th className="th-genre"><button className="sort-albums-table" onClick={(() => {
                            const scoresGenre = [...albums].sort(compareGenre);
                            setAlbums(scoresGenre);
                        })}>Genre</button></th>
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
                                <Link to={`/albums/${album.id}`} className="scores-link">{album.album}</Link>
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
    </div>
    );
}