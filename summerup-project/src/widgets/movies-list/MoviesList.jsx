import styles from "./MoviesList.module.css";
//import fetch from "node-fetch";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MovieCard } from "../../shared/ui/movie-card/MovieCard";
import { Pagination, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { RatingModal } from "../../shared/ui/rating-model/RatingModal";

function changeFetch(options, activePage) {
    console.log("options in changeFetch: ", options);
    let sortParam, genreParam, yearParam, fromParam, toParam;

    if (options.sortBy != null) {
        sortParam = convertSortForReq(options.sortBy);
        console.log("sortParam: ", sortParam);
    }

    if (options.genre != null) {
        genreParam = convertGenresIdForReq(options.genre);
    }

    if (options.year != null) {
        yearParam = convertYearForReq(options.year);
    }

    if (options.ratingFrom != null) {
        fromParam = Number(options.ratingFrom);
    }

    if (options.ratingTo != null) {
        toParam = Number(options.ratingTo);
    }

    //let outputStr = `/api/discover/movie?include_adult=false&include_video=false&language=en-US&page=${activePage}9&with_genres=${genreParam}&primary_release_year=${yearParam}&vote_count.gte=${fromParam}&vote_count.lte=${toParam}&sort_by=${sortParam}`;
    let outputStr = `/api/discover/movie?include_adult=false&include_video=false&language=en-US&page=${activePage}&`;
    if (fromParam != null) {
        outputStr += `&vote_average.gte=${fromParam}`;
    }
    if (toParam != null) {
        outputStr += `&vote_average.lte=${toParam}`;
    }

    if (genreParam != null) {
        outputStr += `&with_genres=${genreParam}`;
    }
    if (yearParam != null) {
        outputStr += `&primary_release_year=${yearParam}`;
    }
    if (sortParam != null) {
        outputStr += `&sort_by=${sortParam}`;
    }

    console.log("fetchstr: ", outputStr);

    return outputStr;
}

function convertSortForReq(options) {
    const data = {
        "Most Popular": "popularity.desc",
        "Least Popular": "popularity.asc",
        "Most Rated": "vote_average.desc",
        "Least Rated": "vote_average.asc",
        "Most Voted": "vote_count.desc",
        "Least Voted": "vote_count.asc",
    };

    return data[options];
}

function convertGenresIdForReq(options) {
    let ids_str = "";

    options.map((element) => {
        ids_str += element;
        ids_str += ",";
    });

    return ids_str;
}

function convertYearForReq(options) {
    return Number(options);
}

export function MoviesList({ options }) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activePage, setPage] = useState(1);
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const [modalMovie, setModalMovie] = useState("");
    console.log("options: ", options);

    const onCardClick = (event, movie) => {
        if (!event.target?.closest("button")) navigate(`/movies/${movie.id}`);
        else setModalMovie(movie.title);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activePage]);

    useEffect(() => {
        setIsLoading(true);
        console.log("тут");
        // console.log(genreListSelected);
        const fetchMoviesData = async (activePage = 1) => {
            let moviesData, searchstr;

            console.log("typeof options: ", typeof options);
            if (options) {
                searchstr = changeFetch(options, activePage);
            } else {
                searchstr = `/api/discover/movie?include_adult=false&include_video=false&language=en-US&page=${activePage}&sort_by=popularity.desc`;
            }

            moviesData = await fetch(searchstr).then(
                (data) => (data = data.json())
            );
            console.log("moviesData: ", moviesData);
            setIsLoading(false);
            console.log(moviesData.results);
            setMovies(moviesData.results);
        };
        fetchMoviesData(activePage);
    }, [activePage, options]);

    const onStarClick = (event, movie_id) => {
        if (event.target?.closest("button")) {
            console.log(`yay${movie_id}`);
        } else {
            navigate(`/movies/${movie_id}`);
        }
        setClickedCard(movie_id);
    };

    if (isLoading) {
        return (
            <div className={styles.loaderContainer}>
                <Loader color="#9854f6" size="xl" />
                <p>Loading...</p>
            </div>
        );
    }

    // console.log("movies: ", movies);

    return (
        <>
            <div className={styles.moviesContainer}>
                {movies.map((movie) => {
                    return (
                        <MovieCard
                            movie={movie}
                            key={movie.id}
                            onCardClick={onCardClick}
                            onStarClick={open}
                        />
                    );
                })}
                <div className={styles.paginationBox}>
                    <Pagination
                        total={500}
                        value={activePage}
                        onChange={setPage}
                        color="#9854f6"
                    />
                </div>
            </div>
            <RatingModal opened={opened} close={close} movie={modalMovie} />
        </>
    );
}
