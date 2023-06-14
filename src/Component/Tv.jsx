/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Tv() {

  const [Tv, setTv] = useState([]);
  let nums =new Array(13).fill(1).map((eleme,index)=>index+1);

  async function getTv(pageNumber){
    let {data} =await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=76780030766e96951b66f7598e7a0ef4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`)
    setTv(data.results);
  }
  useEffect(()=>{
    getTv(1);
  },[])
  return (
    <div>
      {Tv ? (
        <div className="row  justify-content-center">
          {Tv.map((Tv, i) => (
            <div key={i} className="col-md-2">
              <div className="tv">
                <Link to={`/tvdetalies/ ${Tv.id}`}>
                  <img
                    className="w-100"
                    src={"https://image.tmdb.org/t/p/w500" + Tv.poster_path}
                    alt=""
                  />
                  <h3 className="h6 my-2">{Tv.name}</h3>
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
    {nums.map((pageNumber)=>    <li onClick={()=>getTv(pageNumber)} key={pageNumber} className="page-item"> 
    <a  className="page-link bg-transparent text-white">{pageNumber}</a></li>
)}

  </ul>
</nav>
    </div>
  );
}
