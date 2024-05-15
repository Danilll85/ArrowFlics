import styles from "./CompanyTitle.module.css";

export function CompanyTitle() {
    return (
        <div className={styles.sideBarHeader}>
            <div className={styles.sideBarImage}>
                <img
                    src={`${process.env.PUBLIC_URL}/ArrowFlicksImg.svg`}
                    alt="..."
                />
            </div>
            <div className={styles.sideBarTitle}>ArrowFlicks</div>
        </div>
    );
}
