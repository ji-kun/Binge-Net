import React, { useState } from "react";
import "./App.css";
import req from "./requests";
import Genre, { Movies } from "./Components/Genre/Genre";
import Navbar from "./Components/Navbar/Navbar";
import SignIn from "./Components/SignIn/SignIn";
import Advertisements from "./Components/Advertisements/Ad";

function App() {
  const [user, setUser] = useState();
  const [list, setList] = useState([]);

  return (
    <div className="App">
      {user ? (
        <>
          <Navbar user={user} />
          <Advertisements />
          {list.length && <Movies list={list} title="My list" isLargeRow />}
          <Genre
            title="Trending Now"
            fetchUrl={req.fetchTrending}
            setList={setList}
            isLargeRow
          />
          <Genre
            title="Originals"
            fetchUrl={req.fetchNetflixOriginals}
            setList={setList}
          />
          <Genre
            title="Top Rated"
            fetchUrl={req.fetchTopRated}
            setList={setList}
          />
          <Genre
            title="Action"
            fetchUrl={req.fetchActionMovies}
            setList={setList}
          />
          <Genre
            title="Comedy"
            fetchUrl={req.fetchComdeyMovies}
            setList={setList}
          />
          <Genre
            title="Horror"
            fetchUrl={req.fetchHorrorMovies}
            setList={setList}
          />
          <Genre
            title="Romance"
            fetchUrl={req.fetchRomanceMovies}
            setList={setList}
          />
          <Genre
            title="Documentaries"
            fetchUrl={req.fetchDocumentaries}
            setList={setList}
          />
        </>
      ) : (
        <SignIn setUser={setUser} />
      )}
    </div>
  );
}

export default App;
