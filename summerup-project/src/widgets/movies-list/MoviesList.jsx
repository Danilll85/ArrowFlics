import styles from "./MoviesList.module.css";
//import fetch from "node-fetch";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MovieCard } from "../../shared/ui/movie-card/MovieCard";
import { Pagination, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { RatingModal } from "../../shared/ui/rating-modal/RatingModal";
import notFoundMovies from "../../assets/notFoundMovies.svg";
import { changeFetch } from "./correctValues";

export function MoviesList({ options }) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activePage, setPage] = useState(1);
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const [modalMovie, setModalMovie] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const onCardClick = (event, movie) => {
        if (!event.target?.closest("button")) navigate(`/movies/${movie.id}`);
        else setModalMovie(movie);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activePage]);

    useEffect(() => {
        setIsLoading(true);
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
            setTotalPages(
                moviesData.total_pages > 500 ? 500 : moviesData.total_pages
            );
        };
        fetchMoviesData(activePage);
    }, [activePage, options]);

    if (isLoading) {
        return (
            <div className={styles["loader-container"]}>
                <Loader color="#9854f6" size="xl" />
                <p>Loading...</p>
            </div>
        );
    }

    if (!movies.length) {
        return (
            <div className={styles["not-found"]}>
                <img src={notFoundMovies} />
                <p>We don't have such movies, look for another one</p>
            </div>
        );
    }

    return (
        <>
            <div className={styles["movies-container"]}>
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
                <div className={styles["pagination-box"]}>
                    <Pagination
                        total={totalPages}
                        value={activePage}
                        onChange={setPage}
                        color="#9854f6"
                        getItemProps={(page) => {
                            if (
                                page === activePage - 1 ||
                                page === activePage ||
                                page === activePage + 1 ||
                                (activePage === 1 && page === activePage + 2) ||
                                (activePage === totalPages &&
                                    page === activePage - 2)
                            ) {
                                return {};
                            }

                            return { style: { display: "none" } };
                        }}
                        styles={(theme) => ({
                            dots: { display: "none" },
                        })}
                    />
                </div>
            </div>
            <RatingModal opened={opened} close={close} movie={modalMovie} />
        </>
    );
}
