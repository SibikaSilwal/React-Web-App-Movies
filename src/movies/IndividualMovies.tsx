import { movieDTO } from "./movies.model";
import css from "./IndividualMovie.module.css";

export default function IndividualMovie(props: movieDTO) {
  const buildLink = () => `/movie/${props.id}`;
  return (
    <div
      className={css.div + " individualMovie"}
      style={{ textAlign: "center" }}
    >
      <a href={buildLink()} style={{ textAlign: "center" }}>
        <img alt="Poster" src={props.poster} />
      </a>
      {/*<p>
        <a href={buildLink()}>{props.title}</a>
      </p>*/}
    </div>
  );
}
