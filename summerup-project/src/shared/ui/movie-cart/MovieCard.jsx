import styles from "./MovieCard.module.css";
import grayStar from "../../../assets/grayStar.svg";
import yellowStar from "../../../assets/yellowStar.svg";
import axios from "axios";
import { useState, useEffect } from "react";

const API_KEY = "e95ffe9d54ceda1a8fe0ec53aa607317";
const tmbd_api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});

// https://api.themoviedb.org/3/genre/movie/list?language=en
const fetch = async () => {
    try {
        const response = await tmbd_api.get("genre/movie/list?language=en", {
            Authorization:
                "Bearer " +
                "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTVmZmU5ZDU0Y2VkYTFhOGZlMGVjNTNhYTYwNzMxNyIsInN1YiI6IjY2NDYyZGI5MzUxNjI2OTVhZTk1M2IwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CsAYMSxRGhbuDoUkigq7y2CrvYm0sy69GJhIUfvLJ90",
            params: { api_key: API_KEY },
        });
        // console.log("results", response.data);
        return response.data;
    } catch (e) {
        console.error(`Error in MovieCard. Error ${e}`);
        return [];
    }
};

function findGenresById(allGenres, aimIds) {
    let displayGenres = [];
    console.log(allGenres);
    for (let i = 0; i < aimIds.length; i++) {
        console.log(i);
        allGenres.genres.forEach((genreObj) => {
            // console.log(aimIds[i], genreObj.id, genreObj.name);
            if (aimIds[i] == genreObj.id) {
                displayGenres.push(genreObj.name);
                displayGenres.push(", ");
            }
        });
    }

    displayGenres.length = displayGenres.length - 1;

    return displayGenres;
}

function convertNumberToShortFormat(num) {
    const symbols = ["", "K", "M", "B"];
    const level = Math.floor(Math.log10(Math.abs(num)) / 3);
    if (level === 0) return num.toString();
    const suffix = symbols[level];
    const scale = Math.pow(10, level * 3);
    const scaled = num / scale;
    return scaled.toFixed(1) + suffix;
}

export function MovieCard({ movie }) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const genresData = await fetch();
            // console.log("genresData: ", genresData);
            setGenres(findGenresById(genresData, movie.genre_ids));
        };
        fetchData();
    }, []);

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardInfo}>
                <img
                    src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}
                    width={119}
                    height={170}
                />
                <div className={styles.infoItems}>
                    <div className={styles.headerOfInfo}>
                        <p className={styles.movieTitle}>{movie.title}</p>
                        <p className={styles.releaseDate}>
                            {movie.release_date.split("-")[0]}
                        </p>
                        <div className={styles.ratingContainer}>
                            <div className={styles.ratingInfo}>
                                <img src={yellowStar} alt="..." />
                                <p>{movie.vote_average.toFixed(1)}</p>
                            </div>
                            <p className={styles.grayText}>
                                ({convertNumberToShortFormat(movie.vote_count)})
                            </p>
                        </div>
                    </div>
                    <div className={styles.genresInfo}>
                        <p className={styles.grayText}>Genres</p>
                        <p className={styles.genresList}>{genres}</p>
                    </div>
                </div>
            </div>
            <button className={styles.favourite}>
                <img src={grayStar} />
            </button>
        </div>
    );
}
