import { useState } from "react";
import styles from "./SwitchMovies.module.css";

export function SwitchMovies() {
    const [choice, setChoice] = useState("1");

    const changeColor = (event) => {
        setChoice(event.target.id);
    };

    return (
        <>
            <div className={styles.moviesContainer}>
                <button
                    className={
                        choice === "1"
                            ? styles.activeColor
                            : styles.defaultColor
                    }
                    id={"1"}
                    onClick={changeColor}
                >
                    Movies
                </button>
                <button
                    className={
                        choice === "2"
                            ? styles.activeColor
                            : styles.defaultColor
                    }
                    id={"2"}
                    onClick={changeColor}
                >
                    Rated movies
                </button>
            </div>
        </>
    );
}
