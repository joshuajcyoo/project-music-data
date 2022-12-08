import { Link } from "react-router-dom";

export default function Home() {
    document.title = "Home";

    return (
        <div id="home">
            <div id="home-top">
                <div className="d-flex justify-content-center">
                    <h2 id="home-msg">Explore the Data</h2>
                </div>
                
                <div id="home-buttons" className="d-flex justify-content-center">
                    <Link id="home-button-scores-div" to={`/scores`} className="scores-link">
                        <button className="home-button" id="home-button-scores" role="button">Explore Data by Scores</button>

                    </Link>

                    <Link to={`/stats`} className="stats-link">
                        <button className="home-button" id="home-button-stats" role="button">Explore Data by Spotify Stats</button>
                    </Link>
                </div>
                
            </div>
            <div id="home-bottom">
                <div id="home-about-title" className="d-flex justify-content-center">
                    <h2>About</h2>
                </div>

                <div id="home-about" className="d-flex justify-content-center">
                    Write about the website.
                </div>
            </div>
        </div>
    );
}