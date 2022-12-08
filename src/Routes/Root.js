import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav className="navbar navbar-expand-md p-3 py-2">   
        <a className="navbar-brand" href="/">
          <img id="logo" src="/logo.png" width="70"/>
        </a>

        <ul id="nav-brand" className="navbar-nav ml-auto text-center w-100 justify-content-between ml-lg-0 d-lg-flex align-items-center">
          <div className="nav-item h-100"><a id="brand" className="nav-link" href="/">The UpBeat Data</a></div>
        </ul>

        <Link to={`/admin`} className="admin-link">
            <button type="button" className="btn btn-sm btn-warning">
                Admin
            </button>
        </Link>
      </nav>

      <Outlet />
    </>
  );
}