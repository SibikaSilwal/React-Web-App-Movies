import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { urlMovies } from "../endpoints";
import { coordinateDTO } from "../Utils/coordinates.model";
import Loading from "../Utils/Loading";
import Map from "../Utils/Map";
import { movieDTO } from "./movies.model";

export default function MovieDetail() {
  const { id }: any = useParams();
  const [movie, setMovie] = useState<movieDTO>();

  useEffect(() => {
    axios
      .get(`${urlMovies}/${id}`)
      .then((response: AxiosResponse<movieDTO>) => {
        response.data.releaseDate = new Date(response.data.releaseDate);
        setMovie(response.data);
      });
  }, [id]);

  function generateEmebedVideoURL(trailer: string): string {
    console.log("trailer: ", trailer);
    if (!trailer) return "";

    let videoID = trailer.split("v=")[1];
    const ampersandPosition = videoID.indexOf("&");
    if (ampersandPosition !== -1)
      videoID = videoID.substring(0, ampersandPosition);

    return `https://www.youtube.com/embed/${videoID}`;
  }

  function transformMapCoordinates(): coordinateDTO[] {
    if (movie?.movieTheaters) {
      const coordinates = movie.movieTheaters.map((movieTheater) => {
        return {
          lat: movieTheater.latitude,
          lng: movieTheater.longitude,
          name: movieTheater.name,
        } as coordinateDTO;
      });
      return coordinates;
    }
    return [];
  }

  return movie ? (
    <div>
      <h2>
        {movie.title}({movie.releaseDate.getFullYear()})
      </h2>
      {movie.genres?.map((genre) => (
        <Link
          key={genre.id}
          style={{ marginRight: "5px" }}
          className="btn btn-primary btn-sm rouded-pill"
          to={`/movies/filter?genreId=${genre.id}`}
        >
          {genre.name}
        </Link>
      ))}{" "}
      | {movie.releaseDate.toDateString()}
      <div style={{ display: "flex", margin: "1rem" }}>
        <span style={{ display: "inline-block", marginRight: "1rem" }}>
          <img
            src={movie.poster}
            style={{ width: "225px", height: "315px" }}
            alt="poster"
          />
        </span>
        {movie.trailer ? (
          <div>
            <iframe
              title="youtube-trailer"
              width="560"
              height="315"
              frameBorder={0}
              allow="accelerated; autoplay ; encrypted-media;"
              allowFullScreen
              src={generateEmebedVideoURL(movie.trailer)}
            ></iframe>
          </div>
        ) : null}
      </div>
      {movie.summary ? (
        <div style={{ marginTop: "1rem" }}>
          <h3>Summary</h3>
          <ReactMarkdown>{movie.summary}</ReactMarkdown>
        </div>
      ) : null}
      {movie.actors && movie.actors.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <h4> Actors </h4>
          <div
            className="movieActors"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {movie.actors?.map((actor) => (
              <div key={actor.id} style={{ marginBottom: "2px" }}>
                <img
                  alt="actor picture"
                  src={actor.picture}
                  style={{ width: "50px", verticalAlign: "middle" }}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "200px",
                    marginLeft: "1rem",
                  }}
                >
                  {actor.name}
                </span>
                <span style={{ display: "inline-block", width: "45px" }}>
                  ...
                </span>
                <span>{actor.character}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {movie.movieTheaters && movie.movieTheaters.length > 0 ? (
        <div>
          <h2>Showing On</h2>
          <Map coordinates={transformMapCoordinates()} readonly={true} />
        </div>
      ) : null}
    </div>
  ) : (
    <Loading />
  );
}
