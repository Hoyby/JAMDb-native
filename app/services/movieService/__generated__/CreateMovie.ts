/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateMovie
// ====================================================

export interface CreateMovie_createMovie {
  __typename: "MovieDto";
  title: string;
  description: string;
  published: number;
  updatedAt: any;
  createdAt: any;
}

export interface CreateMovie {
  createMovie: CreateMovie_createMovie;
}

export interface CreateMovieVariables {
  title: string;
  description: string;
  published: number;
}
