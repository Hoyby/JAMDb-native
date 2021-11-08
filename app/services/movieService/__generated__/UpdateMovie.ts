/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMovie
// ====================================================

export interface UpdateMovie_updateMovie {
  __typename: "MovieDto";
  title: string;
  description: string;
  published: number;
  updatedAt: any;
}

export interface UpdateMovie {
  updateMovie: UpdateMovie_updateMovie;
}

export interface UpdateMovieVariables {
  _id: string;
  title: string;
  description: string;
  published: number;
}
