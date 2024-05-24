import { useState } from "react";
import { Filters } from "../../shared/ui/filters/Filters";
import { MoviesList } from "../movies-list/MoviesList";
import styles from "./MoviesBox.module.css";

export function MoviesBox() {
    const [movieFilters, setMovieFilters] = useState();

    let params = (value) => {
        setMovieFilters(value);
    };

    return (
        <>
            <div className={styles["movies-container"]}>
                <div className={styles["header"]}>Movies</div>
                <Filters callback={params} />
                <MoviesList options={movieFilters} />
            </div>
        </>
    );
}
