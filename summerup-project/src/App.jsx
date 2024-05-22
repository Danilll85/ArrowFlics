import { MoviesPage } from "./pages/movies/MoviesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RatedPage } from "./pages/rated/RatedPage";
import { MoviePage } from "./pages/movie/MoviePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MoviesPage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/rated" element={<RatedPage />} />
                <Route path="/movies/:movie_id" element={<MoviePage />} />
                {/* <Route path="/movies/:movie_id" element={<MoviePage />} /> */}
                {
                    //<Route path="*" element={<Page404/>}
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App;
