import { movieDTO } from "./movies.model";
import css from "./IndividualMovie.module.css";
import { Link } from "react-router-dom";
import Button from "../Utils/Button";
import customConfirm from "../Utils/CustomConfirm";
import axios from "axios";
import { urlMovies } from "../endpoints";
import { useContext, useState } from "react";
import AlertContext from "../Utils/AlertContext";
import Authorized from "../Auth/Authorized";

export default function IndividualMovie(props: movieDTO) {
  const buildLink = () => `/movie/${props.id}`;
  const customAlert = useContext(AlertContext);
  const [hovered, setHovered] = useState(false);
  function toggleHover() {
    setHovered(!hovered);
  }
  function deleteMovie() {
    axios.delete(`${urlMovies}/${props.id}`).then(() => {
      customAlert();
    });
  }
  return (
    <div
      className={css.div + " individualMovie"}
      style={{ textAlign: "center" }}
      onMouseLeave={toggleHover}
      onMouseEnter={toggleHover}
    >
      <Link to={buildLink()} style={{ textAlign: "center" }}>
        <img alt="Poster" src={props.poster} />
      </Link>
      {/*<p>
        <a href={buildLink()}>{props.title}</a>
      </p>*/}
      <Authorized
        role="admin"
        authorized={
          <>
            <div
              className={
                hovered ? "displayBlock positionAbsolute" : "displayNone"
              }
            >
              <Link
                style={{ marginRight: "0rem" }}
                className="btn btn-info"
                to={`/movies/edit/${props.id}`}
              >
                Edit
              </Link>
              <Button
                onClick={() => customConfirm(() => deleteMovie())}
                className="btn btn-danger"
              >
                Delete
              </Button>
            </div>
          </>
        }
      />
    </div>
  );
}
