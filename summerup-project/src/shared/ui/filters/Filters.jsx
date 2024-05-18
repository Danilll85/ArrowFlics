import { useState } from "react";
import styles from "./Filters.module.css";
import { MultiSelect, NumberInput, Select } from "@mantine/core";

export function Filters({ callback }) {
    const [filters, setFilters] = useState({
        genre: null,
        year: null,
        ratingFrom: null,
        ratingTo: null,
        sortBy: "Most Popular",
    });

    const callbackFunc = () => callback(filters);

    callbackFunc();

    const changeFilters = async (id, filterValue) => {
        setFilters((oldFilters) => ({ ...oldFilters, [id]: filterValue }));
    };

    const addGenreFilters = (list) => {
        changeFilters("genre", list);
    };

    const addYearFilters = (value) => {
        changeFilters("year", value);
    };

    const addFromFilters = (value) => {
        changeFilters("ratingFrom", value);
    };

    const addToFilters = (value) => {
        changeFilters("ratingTo", value);
    };

    const addSortFilters = async (value) => {
        await changeFilters("sortBy", value);
    };

    const resetFilters = () => {
        setFilters({
            genre: null,
            year: null,
            ratingFrom: null,
            ratingTo: null,
            sortBy: "Most Popular",
        });
    };

    let largeData = [];
    let date = new Date();
    for (let i = date.getFullYear(); i >= 1900; i--) {
        largeData.push(i.toString());
    }
    //console.log("largeData: ", largeData);

    //console.log("allfilters: ", filters);
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
                    data={["Action", "Fantasy", "Crime", "Drama"]}
                    id={"genre"}
                    onChange={addGenreFilters}
                />
                <Select
                    classNames={{
                        root: styles.rootParams,
                        input: styles.inputParams,
                        label: styles.choicelabel,
                    }}
                    label="Release year"
                    placeholder="Select release year"
                    data={largeData}
                    searchable
                    id={"year"}
                    onChange={addYearFilters}
                />
                <div className={styles.ratingFilters}>
                    <Select
                        classNames={{
                            root: styles.rootNumber,
                            label: styles.Intlabel,
                        }}
                        label="Ratings"
                        placeholder="From"
                        data={[
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                        ]}
                        min={0}
                        max={10}
                        id={"ratingFrom"}
                        onChange={addFromFilters}
                    />
                    <Select
                        classNames={{
                            root: styles.rootNumber,
                            label: styles.Intlabel,
                        }}
                        label=" "
                        placeholder="To"
                        data={[
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                        ]}
                        min={0}
                        max={10}
                        id={"ratingTwo"}
                        onChange={addToFilters}
                    />
                </div>
                <button className={styles.resetFilter} onClick={resetFilters}>
                    Reset filters
                </button>
            </div>
            <div className={styles.sorting}>
                <Select
                    label="Sort by"
                    data={[
                        "Most Popular",
                        "Least Popular",
                        "Most Rated",
                        "Least Rated",
                    ]}
                    defaultValue={"Most Popular"}
                    classNames={{
                        label: styles.inputLabel,
                        root: styles.rootParams,
                    }}
                    id={"sortBy"}
                    onChange={addSortFilters}
                />
            </div>
        </div>
    );
}
