/* eslint-disable no-unused-vars */
import { Component, useEffect } from "react";
import { Route, Routes ,Navigate } from "react-router-dom";
import "./App.css";
import About from "./Component/About";
import Contacts from "./Component/Contacts";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Movies from "./Component/Movies";
import Register from "./Component/Register";
import NavBar from "./Component/NavBar";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import MovieDetails from "./Component/MovieDetails";
import NotFound from "./Component/NotFound";
import TvDetalies from "./Component/TvDetalies";
import Tv from "./Component/Tv";

export default function App() {
  const [userData, setUserData] = useState(null);

  ///SAVE USERDATA
  function saveUserData(){
    let encodeToken=localStorage.getItem('userToken');
    let decodedToken=jwtDecode(encodeToken);
    setUserData(decodedToken);
    console.log(decodedToken);
  }
  ///LOGOUT
  function logOut(props){
    setUserData(null);
    localStorage.removeItem('userToken');
    return <Navigate to= '/login' />
  }
  ///FOR REFRESHING
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      saveUserData();
    }
  },[])
  ///
  function ProtectedRouts(props){
    if(localStorage.getItem('userToken')=== null){
     return <Navigate to= '/login' />
    }
    else{
      return props.children;
    }
  }


  return (
    <>
      <NavBar  logOut={logOut} userData={userData}/>
      <div className="container">
        <div className="container">
          <Routes>
          <Route path="/" element={<ProtectedRouts><Home /></ProtectedRouts> } />
            <Route path="home" element={<ProtectedRouts><Home /></ProtectedRouts> } />
            <Route path="movies" element={<ProtectedRouts><Movies /></ProtectedRouts> } />
            <Route path="tv" element={<ProtectedRouts><Tv /></ProtectedRouts> } />

            <Route path="moviesdetalies" element={<ProtectedRouts><MovieDetails /></ProtectedRouts> } >
            <Route path=":id" element={<ProtectedRouts><MovieDetails /></ProtectedRouts> } />
            </Route>
            <Route path="tvdetalies" element={<ProtectedRouts><TvDetalies /></ProtectedRouts> } >
            <Route path=":id" element={<ProtectedRouts><TvDetalies /></ProtectedRouts> } />
            </Route>
            <Route path="contacts" element={<ProtectedRouts><Contacts /></ProtectedRouts> } />
            <Route path="about" element={<ProtectedRouts><About /></ProtectedRouts> } />
            <Route path="login" element={<Login saveUserData={saveUserData} />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
}

/// axios ==https://api.themoviedb.org/3/trending/movie/week?api_key=76780030766e96951b66f7598e7a0ef4
