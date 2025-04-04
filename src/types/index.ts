/** @format */

import { MovieGenre } from "../consts";

export type getMoviesType = {
  page?: number;
  limit?: number;
  search?: string;
  genre?: MovieGenre;
};

export type Movie = {
  id: string;
  title: string;
  rating: string;
  posterUrl: string;
  bestRating?: number;
  datePublished?: string;
  directors?: string[];
  duration?: string;
  genres?: Array<{ title: string }>;
  mainActors?: string[];
  ratingValue?: number;
  summary?: string;
  worstRating?: number;
  writers?: string[];
};
