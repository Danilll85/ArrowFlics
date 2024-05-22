import { SideBar } from "../../widgets/side-bar/SideBar";
import { MoviesBox } from "../../widgets/movies-box/MoviesBox";
import styles from "./MoviesPage.module.css";
import { MoviesList } from "../../widgets/movies-list/MoviesList";
import { useParams } from "react-router-dom";

export function MoviesPage() {
    return (
        <div className={styles.container}>
            <SideBar />
            <MoviesBox />
        </div>
    );
}
