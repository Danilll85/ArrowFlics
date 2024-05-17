import styles from "./MoviesList.module.css";
//import fetch from "node-fetch";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MovieCard } from "../../shared/ui/movie-cart/MovieCard";

const API_KEY = "e95ffe9d54ceda1a8fe0ec53aa607317";
const tmbd_api = axios.create({ baseURL: "https://api.themoviedb.org/3/" });

const fetch = async () => {
    try {
        const response = await tmbd_api.get("movie/popular", {
            Authorization:
                "Bearer " +
                "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTVmZmU5ZDU0Y2VkYTFhOGZlMGVjNTNhYTYwNzMxNyIsInN1YiI6IjY2NDYyZGI5MzUxNjI2OTVhZTk1M2IwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CsAYMSxRGhbuDoUkigq7y2CrvYm0sy69GJhIUfvLJ90",
            params: { api_key: API_KEY },
        });
        return response.data.results;
    } catch (e) {
        console.error(`Error in moviesList. Error ${e}`);
        return [];
    }
};

export function MoviesList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const moviesData = await fetch();
            console.log("moviesData: ", moviesData);
            setMovies(moviesData);
        };
        fetchData();
    }, []);

    return (
        <div className={styles.moviesContainer}>
            {movies.map((movie) => {
                return <MovieCard movie={movie} key={movie.id} />;
            })}
        </div>
    );
}
