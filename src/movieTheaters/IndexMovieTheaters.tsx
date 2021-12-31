import { Link } from "react-router-dom";

export default function IndexMovieTheater(){
  return(
    <>
      <h3>Movie Theater</h3>
      <Link className="btn btn-primary" to="/movieTheater/create"> Create Movie Theater</Link>
    </>
  )
}