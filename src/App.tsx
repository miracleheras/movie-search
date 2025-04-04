/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PATH } from "./consts";
import { HomePage, MovieDetailPage } from "./pages";
import { MovieProvider } from "./context/MovieContext";

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.HOME} element={<HomePage />} />
          <Route path={PATH.MOVIE_DETAIL} element={<MovieDetailPage />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
