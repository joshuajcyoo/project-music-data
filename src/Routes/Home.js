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

                <div className="home-about d-flex justify-content-center">
                    <div>About four years ago, my childhood friend asked me to start a music social media page with him, where our goal was to write album reviews on current releases and share the page with our circle of friends to start a fun side passion. We both were pretty busy with high school obligations at the time, so it didn't amount to much at the beginning.</div>
                </div>

                <div className="home-about d-flex justify-content-center">
                    <div>The pandemic hit, and out of the abundance of free time on my hand, I decided to give it another go, attempting to dedicate myself to uploading album reviews consistently. I'm surprised that I've been able to keep the consistent upload streak to this very day, as I continue to write album reviews as a deep personal passion and important getaway from the stresses of life.</div>
                </div>

                <div className="home-about d-flex justify-content-center">
                    <div>The goal of this website is to analyze the data for all of the albums that I've ever written an album review for and scored, supplemented with Spotify's advanced music metrics. All together, I wanted to see for myself any trends, biases, or patterns with my reviewing process, as well as have a platform for my friends and others to see and explore it with me. If you're familiar with my music reviewing, thanks for following along what I do, I really appreciate it. If you aren't, and you don't have anything to do right now, you could check out some reviews that I've written. You might find an album you like. :)</div>
                </div>
            </div>
        </div>
    );
}