import GenericList from "../Utils/GenericList";
import Loading from "../Utils/Loading";
import IndividualMovie from "./IndividualMovies";
import { movieDTO } from "./movies.model";
import css from "./MoviesList.module.css";

// Import css files for carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function MoviesList(props: moviesListProps) {
  const settingsCarousel = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <GenericList list={props.movies}>
      <Slider {...settingsCarousel}>
        {props.movies?.map((movie) => (
          <IndividualMovie {...movie} key={movie.id} />
        ))}
      </Slider>
    </GenericList>
  );
}

interface moviesListProps {
  movies?: movieDTO[];
}
