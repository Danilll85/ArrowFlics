import styles from "./Filters.module.css";
import { MultiSelect, NumberInput, Select } from "@mantine/core";

//Переименовать
export function Filters() {
    return (
        <div className={styles.filtersContainer}>
            <div className={styles.filterItems}>
                <MultiSelect
                    classNames={{
                        root: styles.rootParams,
                        input: styles.inputParams,
                        label: styles.choicelabel,
                    }}
                    label="Genres"
                    placeholder="Select genre"
                    data={["React", "Angular", "Vue", "Svelte"]}
                />
                <MultiSelect
                    classNames={{
                        root: styles.rootParams,
                        input: styles.inputParams,
                        label: styles.choicelabel,
                    }}
                    label="Release year"
                    placeholder="Select release year"
                    data={["React", "Angular", "Vue", "Svelte"]}
                />
                <div className={styles.ratingFilters}>
                    <NumberInput
                        classNames={{
                            root: styles.rootNumber,
                            label: styles.Intlabel,
                        }}
                        label="Ratings"
                        placeholder="From"
                        min={0}
                        max={10}
                    />
                    <NumberInput
                        classNames={{
                            root: styles.rootNumber,
                            label: styles.Intlabel,
                        }}
                        label=" "
                        placeholder="To"
                        min={0}
                        max={10}
                    />
                </div>
                <button className={styles.resetFilter}>Reset filters</button>
            </div>
            <div className={styles.sorting}>
                <Select
                    label="Sort by"
                    data={["Most popular"]}
                    defaultValue={"Most popular"}
                    classNames={{
                        label: styles.inputLabel,
                        root: styles.rootParams,
                    }}
                />
            </div>
        </div>
    );
}
