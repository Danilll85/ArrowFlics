import styles from "./CompanyTitle.module.css";

export function CompanyTitle() {
    return (
        <div className={styles.sideBarHeader}>
            <div className={styles.sideBarImage}>
                <img src={`../public/ArrowFlicksImg.svg`} alt="..." />
            </div>
            <div className={styles.sideBarTitle}>ArrowFlicks</div>
        </div>
    );
}
