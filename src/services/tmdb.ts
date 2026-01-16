import { api } from "../lib/api";
import type { Movie } from "../types/movie";
import type { MovieDetail } from "../types/movieDetail";

export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

// 🔥 TRENDING MOVIES
export const getMovie = async (): Promise<Movie[]> => {
  const response = await api.get<MovieResponse>("/trending/movie/week");
  return response.data.results;
};

// 🆕 NEW RELEASE (NOW PLAYING)
export const getNewRelease = async (): Promise<Movie[]> => {
  const response = await api.get<MovieResponse>("/movie/now_playing");
  return response.data.results;
};

// 🎭 CAST & CREW
export const getMovieCredits = async (id: number) => {
  const response = await api.get(`/movie/${id}/credits`);
  return response.data;
};


// 🔍 SEARCH MOVIES (WITH PAGINATION)
export const searchMovie = async (
  query: string,
  page = 1
): Promise<MovieResponse> => {
  if (!query.trim()) {
    return {
      results: [],
      page: 1,
      total_pages: 0,
    };
  }

  const response = await api.get<MovieResponse>("/search/movie", {
    params: {
      query,
      page,
    },
  });

  return response.data;
};

// 🎬 MOVIE DETAIL
export const getMovieDetail = async (id: number): Promise<MovieDetail> => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

// ▶️ MOVIE TRAILER (YOUTUBE)
export const getMovieTrailer = async (id: number) => {
  const response = await api.get(`/movie/${id}/videos`);

  return response.data.results.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );
};
