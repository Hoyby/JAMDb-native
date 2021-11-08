/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindMovie
// ====================================================

export interface FindMovie_findMovie {
  __typename: "MovieDto";
  title: string;
  description: string;
  published: number;
  updatedAt: any;
  createdAt: any;
}

export interface FindMovie {
  findMovie: FindMovie_findMovie;
}

export interface FindMovieVariables {
  _id: string;
}
