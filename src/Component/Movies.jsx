/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Movies() {

  const [Movies, setMovies] = useState([]);
  let nums =new Array(13).fill(1).map((eleme,index)=>index+1);

  async function getMovies(pageNumber){
    let {data} =await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=76780030766e96951b66f7598e7a0ef4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`)
    setMovies(data.results);
  }
  useEffect(()=>{
    getMovies(1);
  },[])
  return (
    <div>
      {Movies ? (
        <div className="row  justify-content-center">
          {Movies.map((movie, i) => (
            <div key={i} className="col-md-2">
              <div className="movie">
                <Link to={`/moviesdetalies/ ${movie.id}`}>
                  <img
                    className="w-100"
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt=""
                  />
                  <h3 className="h6 my-2">{movie.title}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-contant-center">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}
      <nav aria-label="..." className='py-5'>
  <ul className="pagination pagination-lg d-flex justify-content-center">
    {nums.map((pageNumber)=>    <li onClick={()=>getMovies(pageNumber)} key={pageNumber} className="page-item"> 
    <a  className="page-link bg-transparent text-white">{pageNumber}</a></li>
)}

  </ul>
</nav>
    </div>
  );
}
