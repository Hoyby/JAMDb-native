import React from 'react'
import { View, ScrollView } from 'react-native'
import { MovieCard } from './MovieCard'
import tailwind from 'tailwind-rn'
import { Button } from 'react-native-elements'
import { SearchMoviesPage_searchMoviesPage } from '../services/movieService/__generated__/SearchMoviesPage'


export interface IPageState {
  hasNextPage: boolean // weather or not there may be a next page
  page: number // current page number
}

interface IMovieListProps {
  searchResult: SearchMoviesPage_searchMoviesPage[]
  pageState: IPageState,
  setPageState: React.Dispatch<React.SetStateAction<IPageState>>
}

export default function MovieList({ searchResult, pageState, setPageState }: IMovieListProps) {

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tailwind(
        'max-w-screen-xl w-full justify-between flex-wrap mb-10',
      )}
    >
      <View style={tailwind('w-full flex flex-row justify-around flex-wrap mb-10')}>
        {searchResult &&
          searchResult.map((movie, i) => (
            <MovieCard
              title={movie?.title}
              description={movie?.description}
              _id={movie?._id}
              key={movie._id + i}
            />
          ))}
      </View>

      {pageState.hasNextPage && (
        <View style={tailwind('h-24')}>
          <Button
            onPress={() =>
              setPageState({
                ...pageState,
                page: pageState.page + 1,
              })
            }
            title="Load More"
          ></Button>
        </View>
      )}
    </ScrollView>)
}