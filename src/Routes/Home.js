import { Link } from "react-router-dom";

export default function Home() {
    return (
    <>
        <h1>Home Page</h1>

        <Link to={`/scores`} className="scores-link">
            <button type="button" className="btn btn-success">
                Explore Data by Scores
            </button>
        </Link>

        <Link to={`/stats`} className="stats-link">
            <button type="button" className="btn btn-primary">
                Explore Data by (Spotify) Stats
            </button>
        </Link>

        <br/>
        <br/>

        <Link to={`/admin`} className="admin-link">
            <button type="button" className="btn btn-sm btn-warning">
                Admin (Login)
            </button>
        </Link>
    </>
    );
}