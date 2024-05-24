import { useState } from "react";
// import styles from "./SwitchMovies.module.css";
import styles from "./SwitchMovies.module.css";
import { Link, useLocation } from "react-router-dom";

export function SwitchMovies() {
    const location = useLocation();
    const [choice, setChoice] = useState(`${location.pathname}`);

    const changeRoute = (path) => {
        setChoice(path);
    };

    return (
        <>
            <div className={styles["movies-container"]}>
                <Link
                    to="/"
                    onClick={() => changeRoute("/")}
                    style={{ textDecoration: "none" }}
                >
                    <button
                        className={
                            choice === "/" || choice.startsWith("/movies")
                                ? styles["active-color"]
                                : styles["default-color"]
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
                                ? styles["active-color"]
                                : styles["default-color"]
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
