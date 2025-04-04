/** @format */

import React from "react";
import { withMainLayout } from "../layouts";
import { MovieSearch, MoviesList } from "../components";

export const HomePage: React.FC = withMainLayout(() => {
  return (
    <>
      <MovieSearch />
      <MoviesList />
    </>
  );
});
