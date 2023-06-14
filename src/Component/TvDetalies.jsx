/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export default function TvDetalis() {

  let params =useParams();
  const [TvDetalis, setTvDetalis] = useState({});

  async function getTvDetalis(id){
   let {data}= await axios.get(` https://api.themoviedb.org/3/tv/${id}?api_key=76780030766e96951b66f7598e7a0ef4&language=en-US`)
    setTvDetalis(data);
  }
  useEffect(()=>{
    getTvDetalis(params.id)
  },[])
  return (
    <>
    {TvDetalis? 
          <div className="row">
          <div className="col-md-3">
        <img   className="w-100"  src={"https://image.tmdb.org/t/p/w500" + TvDetalis.poster_path} alt="" />
        </div>
        <div className="col-md-9">
          <h2>{TvDetalis.name}</h2>
          <p className='text-muted py-3'>{TvDetalis.overview}</p>
          <ul>
            <li> Budget :{TvDetalis.budget}</li>
            <li> Vote :{TvDetalis.vote_average}</li>
            <li> popularity :{TvDetalis.popularity}</li>
            <li> vote_count :{TvDetalis.vote_count}</li>
          </ul>
        </div>
          </div>: <div className='vh-100 d-flex align-items-center justify-contant-center'>
            <i className='fas fa-spinner fa-spin fa-3x'></i></div>}
    </>
  )
}
