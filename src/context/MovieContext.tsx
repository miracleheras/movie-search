/** @format */

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MovieGenre } from "../consts";
import { getMovies, getToken } from "../services/api";
import { Movie } from "../types";

interface MovieContextType {
  search: string;
  setSearch: (search: string) => void;
  selectedGenre: MovieGenre | "";
  setSelectedGenre: (genre: MovieGenre | "") => void;
  movies: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  setCurrentPage: (page: number) => void;
  fetchMovies: () => Promise<void>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<MovieGenre | "">("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedGenre]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token") || (await getToken());
      if (!token) {
        throw new Error("Failed to get token");
      }
      const response1 = await getMovies(token, {
        search: search,
        genre: selectedGenre as MovieGenre,
        page: currentPage,
        limit: 10,
      });
      setMovies(response1.data);
      setTotalPages(response1.totalPages);

      const response2 = await getMovies(token, {
        search: search,
        genre: selectedGenre as MovieGenre,
        page: currentPage,
        limit: 1,
      });
      setTotalResults(response2.totalPages);
      console.log("currentPage: ", currentPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        search,
        setSearch,
        selectedGenre,
        setSelectedGenre,
        movies,
        loading,
        error,
        currentPage,
        totalPages,
        totalResults,
        setCurrentPage,
        fetchMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
