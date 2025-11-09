/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import About from "./Component/About";
import Home from "./Component/Home";
import Movies from "./Component/Movies";
import NavBar from "./Component/NavBar";
import MovieDetails from "./Component/MovieDetails";
import NotFound from "./Component/NotFound";
import TvDetalies from "./Component/TvDetalies";
import Tv from "./Component/Tv";

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="tv" element={<Tv />} />
            <Route path="moviesdetalies" element={<MovieDetails />} >
              <Route path=":id" element={<MovieDetails />} />
            </Route>
            <Route path="tvdetalies" element={<TvDetalies />} >
              <Route path=":id" element={<TvDetalies />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
}

/// axios ==https://api.themoviedb.org/3/trending/movie/week?api_key=76780030766e96951b66f7598e7a0ef4
