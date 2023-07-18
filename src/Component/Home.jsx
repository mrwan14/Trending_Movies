/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Home() {
  const [trendingMovies, settrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);

  async function getTrending(dataType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${dataType}/week?api_key=76780030766e96951b66f7598e7a0ef4`
    );
    callback(data.results.slice(0, 10));
  }
  useEffect(() => {
    getTrending("movie", settrendingMovies);
    getTrending("tv", setTrendingTv);
    getTrending("person", setTrendingPeople);
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-2"></div>
            <h2>
              {" "}
              Trending <br /> movies <br /> to watch right now{" "}
            </h2>
            <p className="text-muted">top trending movies by day </p>
            <div className="brdr  mt-4"></div>
          </div>
        </div>
        {trendingMovies.map((movie, i) => (
          <div key={i} className="col-md-2">
            <div className="movie">
              <Link to={`/moviesdetalies/ ${movie.id}`}>
                <img
                  className="w-100 "
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt=""
                />
                <h3 className="h6 my-2">{movie.title}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="row ">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-2"></div>
            <h2>
              Trending <br /> TV <br /> to watch right now
            </h2>
            <p className="text-muted">top trending tv by day </p>
            <div className="brdr  mt-4"></div>
          </div>
        </div>
        {trendingTv.map((tv, i) => (
          <div key={i} className="col-md-2">
            <div className="tv">
              <Link to={`/tvdetalies/ ${tv.id}`}>
                <img
                  className="w-100"
                  src={"https://image.tmdb.org/t/p/w500" + tv.poster_path}
                  alt=""
                />
                <h3 className="h6 my-2">{tv.name}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-2"></div>
            <h2>
              {" "}
              Trending <br /> people <br /> to watch right now{" "}
            </h2>
            <p className="text-muted">top trending people by day </p>
            <div className="brdr  mt-4"></div>
          </div>
        </div>
        {trendingPeople.map((person, i) => (
          <div key={i} className="col-md-2">
            <div className="person">
              <img
                className="w-100"
                src={"https://image.tmdb.org/t/p/w500" + person.profile_path}
                alt=""
              />
              <h3 className="h6 my-2">{person.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
