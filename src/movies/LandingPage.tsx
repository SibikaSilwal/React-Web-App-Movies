import { useEffect, useState } from "react";
import { landingPageDTO } from "./movies.model";
import MoviesList from "./MoviesList";

// Import css files for carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";
import AlertContext from "../Utils/AlertContext";
import Authorized from "../Auth/Authorized";

export default function LandingPage() {
  const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    loadData();
    /*const timerId = setTimeout(() => {
      setMovies({
        inTheaters: [
          {
            id: 1,
            title: "Don't Look Up",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/5/5c/Don%27t_Look_Up_2021_film.jpg",
          },
          {
            id: 2,
            title: "Forrest Gump",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
          },
          {
            id: 3,
            title: "Spider-Man: No Way Home",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
          },
          {
            id: 4,
            title: "National Champions",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/8/83/National_Champions_%28film%29.jpg",
          },
          {
            id: 5,
            title: "Chopsticks",
            poster:
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQeOIkIAxJsYVYWbtUTrwjN5D03Fq75RwXjnonFATrg3lUPoF0y",
          },
          {
            id: 13,
            title: "Encanto",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/8/83/Encanto_poster.jpg",
          },
          {
            id: 14,
            title: "Catch Me If You Can",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/4/4d/Catch_Me_If_You_Can_2002_movie.jpg",
          },
        ],
        upcomingReleases: [
          {
            id: 6,
            title: "Piku",
            poster: "https://upload.wikimedia.org/wikipedia/en/9/98/Piku.jpg",
          },
          {
            id: 7,
            title: "Bell Bottom",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/2/21/Bell_Bottom_film_Poster.jpg",
          },
          {
            id: 8,
            title: "Tides",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/e/e5/Tides_film_poster.jpg",
          },
          {
            id: 9,
            title: "The Girl on the Train",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/3/34/The_Girl_on_The_Train.jpg",
          },
          {
            id: 10,
            title: "Spencer",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/e/ea/Spencer_%28film%29.png",
          },
          {
            id: 11,
            title: "Encanto",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/8/83/Encanto_poster.jpg",
          },
          {
            id: 12,
            title: "Catch Me If You Can",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/4/4d/Catch_Me_If_You_Can_2002_movie.jpg",
          },
        ],
      });
    }, 1000);*/
  }, []);

  function loadData() {
    axios.get(urlMovies).then((response: AxiosResponse<landingPageDTO>) => {
      setMovies(response.data);
    });
  }

  return (
    <AlertContext.Provider
      value={() => {
        loadData();
      }}
    >
      <Authorized
        notAuthorized={<>You are not authorized.</>}
        authorized={<>You are authorized.</>}
        role="admin"
      />
      <div className="inTheater">
        <h3>In Theaters</h3>
        <MoviesList movies={movies.inTheaters} />
      </div>

      <div className="upComing">
        <h3>Upcoming Releases</h3>
        <MoviesList movies={movies.upcomingReleases} />
      </div>
      {console.log(movies.upcomingReleases)}
    </AlertContext.Provider>
  );
}
