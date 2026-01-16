export interface Genre {
  id: number;
  name: string;
}
export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  backdrop_path: string;
  genres?: Genre[];
  age?: string;
}
