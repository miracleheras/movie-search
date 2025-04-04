/** @format */

import { API_BASE_URL } from "../consts";
import { getMoviesType } from "../types";
export async function getToken() {
  const response = await fetch(`${API_BASE_URL}/auth/token`);
  const data = await response.json();
  return data.token;
}

export async function getMovies(token: string, params: getMoviesType) {
  const queryParams = new URLSearchParams({
    page: params.page?.toString() || "1",
    limit: params.limit?.toString() || "10",
    search: params.search || "",
    genre: params.genre || "",
  });
  const response = await fetch(`${API_BASE_URL}/movies?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getGenres(token: string) {
  const response = await fetch(`${API_BASE_URL}/genres/movies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
}
