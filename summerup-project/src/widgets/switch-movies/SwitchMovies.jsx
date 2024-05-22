import { useState } from "react";
import styles from "./SwitchMovies.module.css";
import { Link, useLocation } from "react-router-dom";

export function SwitchMovies() {
    const location = useLocation();
    const [choice, setChoice] = useState(`${location.pathname}`);

    // const changeColor = (event) => {
    //     setChoice(event.target.id);
    // };

    const changeRoute = (path) => {
        setChoice(path);
    };

    return (
        <>
            <div className={styles.moviesContainer}>
                <Link
                    to="/"
                    onClick={() => changeRoute("/")}
                    style={{ textDecoration: "none" }}
                >
                    <button
                        className={
                            choice === "/"
                                ? styles.activeColor
                                : styles.defaultColor
                        }
                        id={"1"}
                    >
                        Movies
                    </button>
                </Link>
                <Link
                    to="/rated"
                    onClick={() => changeRoute("/rated")}
                    style={{ textDecoration: "none" }}
                >
                    <button
                        className={
                            choice === "/rated"
                                ? styles.activeColor
                                : styles.defaultColor
                        }
                        id={"2"}
                    >
                        Rated movies
                    </button>
                </Link>
            </div>
        </>
    );
}
