import CreateActor from "./Actors/CreateActor";
import EditActor from "./Actors/EditActor";
import IndexActors from "./Actors/IndexActors";

import CreateGenre from "./Genres/CreateGenre";
import EditGenre from "./Genres/EditGenre";
import INdexGenres from "./Genres/IndexGenres";
import CreateMovie from "./movies/CreateMovie";
import EditMovie from "./movies/EditMovie";
import FilterMovies from "./movies/FilterMovies";

import LandingPage from "./movies/LandingPage";

import CreateMovieTheater from "./movieTheaters/CreateMovieTheater";
import EditMovieTheater from "./movieTheaters/EditMovieTheater";
import IndexMovieTheater from "./movieTheaters/IndexMovieTheaters";
import RedirectToLanding from "./Utils/RedirectToLandingPage";

const routes=[
  {path: '/', component: LandingPage, exact:true},
  {path: '/movies/create', component: CreateMovie},
  {path: '/movies/edit/:id(\\d+)', component: EditMovie},
  {path: '/movies/filter', component: FilterMovies},

  {path: '/genres', component: INdexGenres, exact:true},
  {path: '/genres/create', component: CreateGenre},
  {path: '/genres/edit/:id(\\d+)', component: EditGenre},

  {path: '/actors', component: IndexActors, exact:true},
  {path: '/actors/create', component: CreateActor},
  {path: '/actors/edit/:id(\\d+)', component: EditActor},

  {path: '/movieTheater', component: IndexMovieTheater, exact:true},
  {path: '/movieTheater/create', component: CreateMovieTheater},
  {path: '/movieTheater/edit/:id(\\d+)', component: EditMovieTheater},

  {path: '*', component: RedirectToLanding}
];

export default routes;