import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlGenres } from "../endpoints";
import Button from "../Utils/Button";
import GenericList from "../Utils/GenericList";
import Pagination from "../Utils/Pagination";
import { genreDTO } from "./genres.model";

export default function INdexGenres() {
  const [genres, setGenres] = useState<genreDTO[]>();

  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(urlGenres, {
        params: { page, recordsPerPage },
      })
      .then((response: AxiosResponse<genreDTO[]>) => {
        const totalAmountofRecords = parseInt(
          response.headers["totalamountofrecords"],
          10
        );
        setTotalAmountOfPages(Math.ceil(totalAmountofRecords / recordsPerPage));
        setGenres(response.data);
      });
  }, [page, recordsPerPage]); // the empty array [] so that this function only executes once...

  return (
    <>
      <h3>Genres</h3>
      <Link className="btn btn-primary" to="/genres/create">
        {" "}
        Create Genre
      </Link>
      <Pagination
        currentPage={page}
        totalAmountofPage={totalAmountOfPages}
        onChange={(newPage) => setPage(newPage)}
      />

      <GenericList list={genres}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {genres?.map((genre) => (
              <tr key={genre.id}>
                <td>
                  <Link className="btn btn-success" to={`/genres/${genre.id}`}>
                    Edit
                  </Link>
                  <Button className="btn btn-danger">Delete</Button>
                </td>
                <td>{genre.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GenericList>
    </>
  );
}
