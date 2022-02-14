import { Link } from "react-router-dom";
import { urlMovieTheaters } from "../endpoints";
import IndexEntity from "../Utils/IndexEntity";
import { movieTheaterDTO } from "./movieTheater.model";

export default function IndexMovieTheater() {
  return (
    <IndexEntity<movieTheaterDTO>
      url={urlMovieTheaters}
      createURL="/movieTheater/create"
      title="Movie Theaters"
      entityName="Movie Theater"
    >
      {(theaters, buttons) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {theaters?.map((theater) => (
              <tr key={theater.id}>
                <td>
                  {buttons(`movieTheater/edit/${theater.id}`, theater.id)}
                </td>
                <td>{theater.name}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}
