import { Filters } from "../../shared/ui/filters/Filters";
import { MoviesList } from "../movies-list/MoviesList";
import styles from "./MoviesBox.module.css";

export function MoviesBox() {
    return (
        <>
            <div className={styles.moviesContainer}>
                <div className={styles.header}>Movies</div>
                <Filters />
                <MoviesList />
            </div>
        </>
    );
}
