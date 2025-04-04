/** @format */

import { Movie } from "../../types";
import { useNavigate } from "react-router-dom";

interface MovieWithRating extends Movie {
  ratingValue?: number;
  bestRating?: number;
}

export const MovieItem = ({ movie }: { movie: MovieWithRating }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className="group flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white h-full"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 m-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">
          {movie.ratingValue ? (
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-yellow-400 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {movie.ratingValue}
            </span>
          ) : (
            <span>{movie.rating}</span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
          {movie.title}
        </h2>
        {movie.datePublished && (
          <p className="text-sm text-gray-500 mt-auto">
            {new Date(movie.datePublished).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
};
