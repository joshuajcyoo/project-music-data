import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="container">
      <Link to={`/`} className="nav-home">Home</Link>
      <br/>
      <Link to={`/scores`} className="nav-scores">Scores</Link>
      <br/>
      <Link to={`/stats`} className="nav-home">Stats</Link>
      <Outlet />
    </div>
  );
}