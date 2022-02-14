import { urlMovieTheaters } from "../endpoints";
import EditEntity from "../Utils/EditEntity";
import { movieTheaterCreationDTO, movieTheaterDTO } from "./movieTheater.model";
import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater() {
  return (
    <EditEntity<movieTheaterCreationDTO, movieTheaterDTO>
      url={urlMovieTheaters}
      entityName="Movie Theater"
      indexURL="/movieTheater"
    >
      {(theater, edit) => (
        <>
          <MovieTheaterForm
            model={theater}
            onSubmit={async (values) => await edit(values)}
          />
        </>
      )}
    </EditEntity>
  );
}
