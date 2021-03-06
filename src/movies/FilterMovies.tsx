import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { urlGenres, urlMovies } from "../endpoints";
import { genreDTO } from "../Genres/genres.model";
import Button from "../Utils/Button";
import { movieDTO } from "./movies.model";
import MoviesList from "./MoviesList";

export default function FilterMovies() {
  const initialValues: filterMoviesForm = {
    title: "",
    genreId: 0,
    upcomingReleases: false,
    inTheaters: true,
    page: 1,
    recordsPerPage: 10,
  };

  const [genres, setGenres] = useState<genreDTO[]>([]);
  const [movies, setMovies] = useState<movieDTO[]>([]);

  useEffect(() => {
    axios
      .get(`${urlGenres}/all`)
      .then((response: AxiosResponse<genreDTO[]>) => {
        setGenres(response.data);
      });
  }, []);

  useEffect(() => {
    searchMovies(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function searchMovies(value: filterMoviesForm) {
    axios
      .get(`${urlMovies}/filter`, { params: value })
      .then((response: AxiosResponse<movieDTO[]>) => {
        setMovies(response.data);
      });
  }

  return (
    <>
      <h3>Filter Movie</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          values.page = 1;
          searchMovies(values);
        }}
      >
        {(formikProps) => (
          <>
            <Form>
              <div className="row gx-3 align-items-center mb-3">
                <div className="col-auto mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title of the movie."
                    {...formikProps.getFieldProps("title")}
                  />
                </div>
                <div className="col-auto mb-3">
                  <select
                    className="form-select"
                    {...formikProps.getFieldProps("genreId")}
                  >
                    <option value="0">--Choose a genre--</option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <div className="form-check">
                    <Field
                      className="form-check-input"
                      id="upcomingReleases"
                      name="upcomingReleases"
                      type="checkbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="upcomingReleases"
                    >
                      Upcoming Releasse
                    </label>
                  </div>
                </div>
                <div className="col-auto mb-3">
                  <div className="form-check">
                    <Field
                      className="form-check-input"
                      id="inTheaters"
                      name="inTheaters"
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="inTheaters">
                      In Theaters
                    </label>
                  </div>
                </div>
                <div className="col-auto mb-3">
                  <Button onClick={() => formikProps.submitForm()}>
                    Filter
                  </Button>
                  <Button
                    className=" btn btn-danger ms-3"
                    onClick={() => {
                      formikProps.setValues(initialValues);
                      searchMovies(initialValues);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </Form>

            <MoviesList movies={movies} />
          </>
        )}
      </Formik>
    </>
  );
}

interface filterMoviesForm {
  title: string;
  genreId: number;
  upcomingReleases: boolean;
  inTheaters: boolean;
  page: number;
  recordsPerPage: number;
}
