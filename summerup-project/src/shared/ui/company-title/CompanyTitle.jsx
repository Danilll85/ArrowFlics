import styles from "./CompanyTitle.module.css";

export function CompanyTitle() {
    return (
        <div className={styles["side-bar-header"]}>
            <div className={styles["side-bar-image"]}>
                <img src={`../public/ArrowFlicksImg.svg`} alt="..." />
            </div>
            <div className={styles["side-bar-title"]}>ArrowFlicks</div>
        </div>
    );
}
