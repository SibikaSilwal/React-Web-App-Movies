import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater() {
  return (
    <>
      <h3>Edit Movie Theater</h3>
      <MovieTheaterForm
        model={{
          name: "CTC",
          latitude: 41.08156382473715,
          longitude: -74.18249416349683,
        }}
        onSubmit={(values) => console.log(values)}
      />
    </>
  );
}
