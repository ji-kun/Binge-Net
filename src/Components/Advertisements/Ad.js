import React, { useState, useEffect } from "react";
import styles from "./Ad.module.css";
import axios from "../../axios";
import req from "../../requests";

function Ad() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetching() {
      const request = await axios
        .get(req.fetchNetflixOriginals)
        .catch((err) => {
          console.log("err", err);
        });

      setMovie(
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );
    }
    fetching();
  }, []);

  return (
    <header
      className={styles.bgimg}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className={styles.content}>
        <h1 className={styles.heading1}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className={styles.allButtons}>
          <button className={styles.button}>Play</button>
          <button className={styles.button}>My List</button>
        </div>

        <h2 className={styles.description}>{movie?.overview}</h2>
      </div>

      <div className={styles.bottomFade}></div>
    </header>
  );
}

export default Ad;
