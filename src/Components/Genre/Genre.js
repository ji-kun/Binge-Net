import React, { useState, useEffect } from "react";
import styles from "./Genre.module.css";
import axios from "../../axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { RWebShare } from "react-web-share";

const urlPrefix = "https://image.tmdb.org/t/p/original/";

function Genre({ title, fetchUrl, isLargeRow, setList }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetching() {
      const request = await axios.get(fetchUrl).catch((err) => {
        console.log("err", err);
      });

      setMovies(request.data.results);
      console.table(request);
      return request;
    }
    fetching();
  }, [fetchUrl]);

  return (
    <Movies
      title={title}
      isLargeRow={isLargeRow}
      list={movies}
      setList={setList}
    />
  );
}

export function Movies({ title, isLargeRow, list, setList }) {
  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [currentMovie, setCurrentMovie] = useState();

  const handleClick = (movie) => {
    setCurrentMovie(movie);
    if (trailerUrl) {
      setTrailerUrl("");
      setDesc("");
      setHeading("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || " ")
        .then((url) => {
          console.log("url", url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((e) => console.log(e));
      setHeading(movie?.title || movie?.name || " ");
      setDesc(movie?.overview);
    }
  };

  const addToList = (movie) => {
    setList((list) => {
      if (list.some((m) => m.id === movie.id)) {
        return list;
      }
      return [...list, movie];
    });
  };

  const options = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className={styles.genre}>
      <h2 className={styles.trends}>{title}</h2>
      <div className={styles.posts}>
        {list.map((movie) =>
          isLargeRow ? (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              src={`${urlPrefix}${movie.poster_path}`}
              className={styles.poster}
              alt={movie.name}
            />
          ) : (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              src={`${urlPrefix}${movie.backdrop_path}`}
              className={styles.largePoster}
              alt={movie.name}
            />
          )
        )}
      </div>
      {trailerUrl && (
        <div>
          <div className={styles.top}>
            <h1 className={styles.heading}>{heading}</h1>
            <button
              className={styles.addlist}
              onClick={() => addToList(currentMovie)}
            >
              {" "}
              Add to List{" "}
            </button>
          </div>
          <div className={styles.top}>
            <h3 className={styles.desc}>{desc}</h3>
          </div>
          <YouTube videoId={trailerUrl} opts={options} />
          <div className={styles.bottom}>
            <RWebShare
              data={{
                title: { heading },
                text: { desc },
                url: { trailerUrl },
              }}
              onClick={() => console.log("Shared Successfully")}
            >
              <div className={styles.social}>Share</div>
            </RWebShare>
          </div>
        </div>
      )}
    </div>
  );
}

export default Genre;
