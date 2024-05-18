import styles from "./MoviesList.module.css";
//import fetch from "node-fetch";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MovieCard } from "../../shared/ui/movie-card/MovieCard";

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

export function MoviesList({ options }) {
    const [movies, setMovies] = useState([]);

    console.log("options: ", options);
    console.log("options: ", typeof options);

    useEffect(() => {
        const fetchData = async () => {
            const moviesData = await fetch();
            console.log("moviesData: ", moviesData);
            const sortedData = moviesData.sort((movie_1, movie_2) =>
                movie_1["vote_average"] < movie_2["vote_average"] ? 1 : -1
            );
            setMovies(moviesData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!options) return;
        if (options.sortBy == "Least Popular") {
            const sortedList = movies.sort((movie_1, movie_2) =>
                movie_1["vote_average"] > movie_2["vote_average"] ? 1 : -1
            );

            console.log("sorted list in useeffect(Least): ", sortedList);
            setMovies([...sortedList]);
        }

        if (options.sortBy == "Most Popular") {
            const sortedList = movies.sort((movie_1, movie_2) =>
                movie_1["vote_average"] < movie_2["vote_average"] ? 1 : -1
            );

            console.log("sorted list in useeffect(Most): ", sortedList);
            setMovies([...sortedList]);
        }
    }, [options]);

    console.log("last step to render: ", movies);
    return (
        <div className={styles.moviesContainer}>
            {movies.map((movie) => {
                return (
                    <MovieCard
                        movie={movie}
                        key={movie.id}
                        checkGenres={options.genre}
                        checkYear={options.year}
                        checkRatingFrom={options.ratingFrom}
                        checkRatingTo={options.ratingTo}
                    />
                );
            })}
        </div>
    );
}
