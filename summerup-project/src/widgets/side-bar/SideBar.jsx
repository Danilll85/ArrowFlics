import styles from "./SideBar.module.css";
import { CompanyTitle } from "../../shared/ui/company-title/CompanyTitle";
import { SwitchMovies } from "../switch-movies/SwitchMovies";
//import Logo from "../../public/purpleFlower.png";

export function SideBar() {
    return (
        <>
            <div className={styles.sideBarContainer}>
                <CompanyTitle />
                <SwitchMovies />
            </div>
        </>
    );
}
