import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import {getCoordinates, getRegressionCoordinates} from "../StatData";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function SpotifyStats() {
    document.title = "Explore Data by Stats";

    const compareId = (a, b) => {        
        return b.id - a.id;
    }

    const albumData = useLoaderData().sort(compareId);
    const [albums, setAlbums] = useState(albumData);
    const [stat, setStat] = useState("avg_length");

    const [chosenGenre, setChosenGenre] = useState("All Genres"); 
    const [chosenYear, setChosenYear] = useState("All Years");

    const calculatedData = getCoordinates(albums, stat);
    const regressionData = getRegressionCoordinates(albums, stat);
    const xLabelSpotifyStat = calculatedData.shift();

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
            x: {
                ticks: {
                    color: 'white',
                    beginAtZero: true,
                    font: {
                        size: 14
                    },
                },
                title: {
                    display: true,
                    text: xLabelSpotifyStat,
                    color: 'white',
                    font: {
                        size: 18
                    },
                }
            },
            y: {
                min: 0,
                max: 11,
                labels: [0, 2, 4, 6, 10],
                ticks: {
                    color: 'white',
                    beginAtZero: true,
                    font: {
                        size: 14
                    },
                    stepSize: 2
                },
                title: {
                    display: true,
                    text: 'Album Rating',
                    color: 'white',
                    font: {
                        size: 18
                    },
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
                text: 'Explore Data By Spotify Stats',
                font: {
                    size: 30
                },
                color: 'white'
            },
        },
    };

    const data = {
        datasets: [
            {
                label: 'idk yet',
                data: calculatedData, 
                backgroundColor: 'black',
            },
            {
                type: 'line',
                label: 'line test',
                data: regressionData,
                pointRadius: 0,
                borderColor: 'white',
                backgroundColor: 'white'
            }
        ]
    };
    
    return (
        <div id="spotify-stats">
            <div className="chart-wrapper">
                <Scatter options={options} data={data} />
            </div>
            <div id="stats-stat-title" className="d-flex justify-content-center">Spotify Stat</div>
            <div id="stat-dropdown" className="d-flex justify-content-center">
                <select className="form-select form-select-sm" id="select-stat" value={stat} onChange={((event) => {
                    setStat(event.target.value);
                })}>
                    <option value="avg_length">Average Song Length (sec)</option>
                    <option value="avg_tempo_bpm">Average Tempo (bpm)</option>
                    <option value="avg_popularity">Average Popularity</option>
                    <option value="avg_danceability">Average Danceability</option>
                    <option value="avg_energy">Average Energy</option>
                    <option value="avg_positiveness">Average Positiveness</option>
                    <option value="avg_speechiness">Average Speechiness</option>
                    <option value="avg_liveness">Average Liveness</option>
                    <option value="number_of_tracks">Number of Tracks</option>
                </select>
            </div>
            <div id="stats-filters-title" className="d-flex justify-content-center">Filters</div>
            <div className="year-genre-dropdowns d-flex justify-content-center">
                <select className="form-select form-select-sm" id="select-genre-stats" value={chosenGenre} onChange={((event) => {
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

                <select className="select-year form-select form-select-sm" id="select-year-stats" value={chosenYear} onChange={((event) => {
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
        </div>
    );
}