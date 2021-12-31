import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Akibis Movies
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/genres">
                Genres
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies/filter">
                Filter Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/actors">
                Actors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movieTheater">
                Movie Theaters
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies/create">
                Create Movie
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
