/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export default function MovieDetails() {

  let params =useParams();
  const [MovieDetails, setMovieDetails] = useState({});

  async function getMovieDetails(id){
   let {data}= await axios.get(` https://api.themoviedb.org/3/movie/${id}?api_key=76780030766e96951b66f7598e7a0ef4&language=en-US`)
    setMovieDetails(data);
  }
  useEffect(()=>{
    getMovieDetails(params.id)
  },[])
  return (
    <>
    {MovieDetails? 
          <div className="row">
          <div className="col-md-3">
        <img   className="w-100"  src={"https://image.tmdb.org/t/p/w500" + MovieDetails.poster_path} alt="" />
        </div>
        <div className="col-md-9">
          <h2>{MovieDetails.title}</h2>
          <p className='text-muted py-3'>{MovieDetails.overview}</p>
          <ul>
            <li> Budget :{MovieDetails.budget}</li>
            <li> Vote :{MovieDetails.vote_average}</li>
            <li> popularity :{MovieDetails.popularity}</li>
            <li> vote_count :{MovieDetails.vote_count}</li>
          </ul>
        </div>
          </div>: <div className='vh-100 d-flex align-items-center justify-contant-center'>
            <i className='fas fa-spinner fa-spin fa-3x'></i></div>}
    </>
  )
}
