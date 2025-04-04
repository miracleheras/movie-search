/** @format */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { withMainLayout } from "../layouts";
import { Movie } from "../types";
import { getToken } from "../services/api";
import { API_BASE_URL } from "../consts";

export const MovieDetailPage: React.FC = withMainLayout(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token") || (await getToken());
        if (!token) {
          throw new Error("Failed to get token");
        }

        const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    } else {
      setError("Movie ID not provided");
      setLoading(false);
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatDuration = (duration: string) => {
    const hours = duration.match(/(\d+)H/);
    const minutes = duration.match(/(\d+)M/);

    let result = "";
    if (hours) result += `${hours[1]}h `;
    if (minutes) result += `${minutes[1]}m`;

    return result.trim();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500 p-4">
          <p>Error: {error || "Movie not found"}</p>
          <button
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleGoBack}
        className="mb-6 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Search
      </button>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="relative h-64 md:h-80 bg-gray-900">
          {/* Backdrop image with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${movie.posterUrl})` }}
          ></div>

          <div className="flex flex-col md:flex-row absolute inset-0 p-6">
            <div className="md:w-1/3 flex justify-center z-10">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="h-full object-cover rounded-lg shadow-2xl"
              />
            </div>

            <div className="md:w-2/3 md:pl-8 flex flex-col justify-end z-10 mt-4 md:mt-0 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {movie.title}
              </h1>
              <div className="flex items-center flex-wrap gap-3 mb-3">
                {movie.datePublished && (
                  <span className="text-gray-300">
                    {new Date(movie.datePublished).getFullYear()}
                  </span>
                )}
                {movie.duration && (
                  <span className="text-gray-300">
                    {formatDuration(movie.duration)}
                  </span>
                )}
                {movie.rating && (
                  <span className="bg-yellow-800 text-yellow-200 text-xs px-2 py-1 rounded-md">
                    {movie.rating}
                  </span>
                )}
                {movie.ratingValue && (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">{movie.ratingValue}</span>
                    <span className="text-xs text-gray-300 ml-1">
                      / {movie.bestRating || 10}
                    </span>
                  </div>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-blue-900 bg-opacity-70 text-blue-100 text-xs px-2 py-1 rounded-full"
                    >
                      {genre.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          {movie.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{movie.summary}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(movie.directors || movie.writers) && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Filmmakers
                </h2>

                {movie.directors && movie.directors.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      {movie.directors.length > 1 ? "Directors" : "Director"}
                    </h3>
                    <p className="text-gray-700">
                      {movie.directors.join(", ")}
                    </p>
                  </div>
                )}

                {movie.writers && movie.writers.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                      {movie.writers.length > 1 ? "Writers" : "Writer"}
                    </h3>
                    <p className="text-gray-700">{movie.writers.join(", ")}</p>
                  </div>
                )}
              </div>
            )}

            {movie.mainActors && movie.mainActors.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Cast
                </h2>
                <ul className="text-gray-700 space-y-2">
                  {movie.mainActors.map((actor, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {actor}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
