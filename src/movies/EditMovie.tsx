import { actorMovieDTO } from "../Actors/actors.model";
import { genreDTO } from "../Genres/genres.model";
import { movieTheaterDTO } from "../movieTheaters/movieTheater.model";
import MovieForm from "./MovieForm";

export default function EditMovie() {
  const nonSelectedGenres: genreDTO[] = [{ id: 2, name: "Drama" }];
  const selectedGenres: genreDTO[] = [{ id: 1, name: "Comedy" }];

  const nonSelectedMovieTheaters: movieTheaterDTO[] = [
    { id: 2, name: "Agora" },
  ];
  const selectedMovieTheaters: movieTheaterDTO[] = [{ id: 1, name: "AMC 2" }];

  const selectedActors: actorMovieDTO[] = [
    {
      id: 1,
      name: "Emma Watson",
      character: "Genius",
      picture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Emma_Watson_2013.jpg/330px-Emma_Watson_2013.jpg",
    },
  ];

  return (
    <>
      <h3>Edit Movie</h3>
      <MovieForm
        model={{
          title: "Harry Porter",
          inTheaters: false,
          trailer: "url",
          releaseDate: new Date("2021-05-08T00:00:00"),
        }}
        onSubmit={(values) => console.log(values)}
        nonSelectedGenres={nonSelectedGenres}
        selectedGenres={selectedGenres}
        nonSelectedMovieTheaters={nonSelectedMovieTheaters}
        selectedMovieTheaters={selectedMovieTheaters}
        selectedActors={selectedActors}
      />
    </>
  );
}
