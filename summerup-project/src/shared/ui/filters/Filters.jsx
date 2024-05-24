import { useEffect, useRef, useState } from "react";
import styles from "./Filters.module.css";
import { MultiSelect, NumberInput, Select } from "@mantine/core";

export function Filters({ callback }) {
    const [filters, setFilters] = useState({
        genre: [],
        year: null,
        ratingFrom: null,
        ratingTo: null,
        sortBy: "Most Popular",
    });
    const [genresChoice, setGenresChoice] = useState([]);
    const [genresIsChoiced, setGenresIsChoiced] = useState(false);
    const [yearIsChoiced, setYearIsChoiced] = useState(false);
    const [fromIsChoiced, setFromIsChoiced] = useState(false);
    const [toIsChoiced, setToIsChoiced] = useState(false);

    const callbackFunc = () => callback(filters);

    useEffect(() => {
        callbackFunc();
    }, [filters]);

    useEffect(() => {
        const fetchGenresList = async () => {
            const genresData = await fetch(
                "/api/genre/movie/list?language=en"
            ).then((data) => (data = data.json()));
            const res = genresData.genres.map((genre) => ({
                value: `${genre.id}`,
                label: genre.name,
            }));
            console.log(res);
            setGenresChoice(res);
        };
        fetchGenresList();
    }, []);

    const changeFilters = async (id, filterValue) => {
        setFilters((oldFilters) => ({ ...oldFilters, [id]: filterValue }));
    };

    const addGenreFilters = (list) => {
        console.log("genres: ", list);
        list.length == 0 ? setGenresIsChoiced(false) : setGenresIsChoiced(true);
        changeFilters("genre", list);
    };

    const addYearFilters = (value) => {
        value == null ? setYearIsChoiced(false) : setYearIsChoiced(true);
        changeFilters("year", value);
    };

    const addFromFilters = (value) => {
        value == null ? setFromIsChoiced(false) : setFromIsChoiced(true);
        changeFilters("ratingFrom", value);
    };

    const addToFilters = (value) => {
        value == null ? setToIsChoiced(false) : setToIsChoiced(true);
        changeFilters("ratingTo", value);
    };

    const addSortFilters = async (value) => {
        await changeFilters("sortBy", value);
    };

    const resetFilters = () => {
        setFilters({
            genre: [],
            year: null,
            ratingFrom: null,
            ratingTo: null,
            sortBy: filters["sortBy"],
        });

        setGenresIsChoiced(false);
        setYearIsChoiced(false);
        setFromIsChoiced(false);
        setToIsChoiced(false);
    };

    let largeData = [];
    let date = new Date();
    for (let i = date.getFullYear(); i >= 1900; i--) {
        largeData.push(i.toString());
    }

    let button;
    if (genresIsChoiced || yearIsChoiced || fromIsChoiced || toIsChoiced) {
        button = (
            <button className={styles["reset-filter"]} onClick={resetFilters}>
                Reset filters
            </button>
        );
    } else {
        button = (
            <button
                className={styles["reset-filter"]}
                onClick={resetFilters}
                disabled
            >
                Reset filters
            </button>
        );
    }

    return (
        <div className={styles["filters-container"]}>
            <div className={styles["filter-items"]}>
                <MultiSelect
                    classNames={{
                        root: styles["root-params"],
                        input: styles["input-params"],
                        label: styles["choice-label"],
                        option: styles["options"],
                    }}
                    label="Genres"
                    value={filters.genre}
                    placeholder="Select genre"
                    data={genresChoice}
                    id={"genre"}
                    onChange={addGenreFilters}
                />
                <Select
                    classNames={{
                        root: styles["root-params"],
                        input: styles["input-params"],
                        label: styles["choice-label"],
                        option: styles["options"],
                    }}
                    label="Release year"
                    placeholder="Select release year"
                    value={filters.year}
                    data={largeData}
                    searchable
                    id={"year"}
                    onChange={addYearFilters}
                />
                <div className={styles["rating-filters"]}>
                    <Select
                        classNames={{
                            root: styles["root-number"],
                            label: styles["Int-label"],
                            option: styles["options"],
                        }}
                        label="Ratings"
                        value={filters.ratingFrom}
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
                            root: styles["root-number"],
                            label: styles["Int-label"],
                            option: styles["options"],
                        }}
                        label=" "
                        placeholder="To"
                        value={filters.ratingTo}
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
                {button}
            </div>
            <div className={styles["sorting"]}>
                <Select
                    label="Sort by"
                    defaultValue={"Most Popular"}
                    data={[
                        "Most Popular",
                        "Least Popular",
                        "Most Rated",
                        "Least Rated",
                        "Most Voted",
                        "Least Voted",
                    ]}
                    classNames={{
                        label: styles["input-label"],
                        root: styles["root-params"],
                        option: styles["options"],
                    }}
                    id={"sortBy"}
                    onChange={addSortFilters}
                />
            </div>
        </div>
    );
}
