import styles from "./SideBar.module.css";
import { CompanyTitle } from "../../shared/ui/company-title/CompanyTitle";
import { SwitchMovies } from "../switch-movies/SwitchMovies";

export function SideBar() {
    return (
        <>
            <div className={styles["side-bar-container"]}>
                <CompanyTitle />
                <SwitchMovies />
            </div>
        </>
    );
}
