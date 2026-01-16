import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMovieDetail, getMovieCredits } from "../services/tmdb";
import Navbar from "../components/navbar";
import HeroBackground from "../components/heroBackground";
import Footer from "../components/footer";
import type { MovieDetail as MovieDetailType } from "../types/movieDetail";
import type { MovieCredits } from "../types/movieCredit";

const STORAGE_KEY = "favorite_movies";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

  // State toast custom
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { data, isLoading, isError } = useQuery<MovieDetailType>({
    queryKey: ["movie-detail", id],
    queryFn: () => getMovieDetail(Number(id)),
    enabled: !!id,
  });

  const { data: credits } = useQuery<MovieCredits>({
    queryKey: ["movie-credits", id],
    queryFn: () => getMovieCredits(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (!data) return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    const favorites = JSON.parse(stored);
    setIsFavorite(favorites.some((m: any) => m.id === data.id));
  }, [data]);

  const showCustomToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const toggleFavorite = () => {
    if (!data) return;
    const stored = localStorage.getItem(STORAGE_KEY);
    const favorites = stored ? JSON.parse(stored) : [];

    let updated;
    if (isFavorite) {
      updated = favorites.filter((m: any) => m.id !== data.id);
      showCustomToast("Delete From Favorites");
    } else {
      updated = [...favorites, data];
      showCustomToast("Success Add to Favorites");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (isLoading)
    return <p className="text-white pt-32 text-center">Loading...</p>;

  if (isError || !data)
    return <p className="text-white pt-32 text-center">Movie not found</p>;

  const releaseDate = new Date(data.release_date);
  const day = releaseDate.getDate();
  const month = releaseDate.toLocaleString("default", { month: "long" });
  const year = releaseDate.getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* TOAST */}
      {showToast && (
        <div
          className="absolute top-30 left-1/2 transform -translate-x-1/2 max-w-xs md:max-w-md w-full
                backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-lg 
                flex items-center justify-center gap-3 z-50"
        >
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
            <span className="text-black font-bold text-sm">✔</span>
          </div>
          <span className="text-center">{toastMessage}</span>
        </div>
      )}

      <Navbar />
      <HeroBackground data={data} />

      {/* HERO SECTION */}
      <section className="w-full mt-96 z-10">
        <div className="relative max-w-6xl mx-auto px-6 pt-32 md:pt-40 flex flex-col md:flex-row gap-10">
          {/* POSTER */}
          <img
            src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
            alt={data.title}
            className="rounded-xl w-65 h-auto shadow-lg shrink-0"
          />

          {/* CONTENT */}
          <div className="space-y-4 md:space-y-5 flex-1">
            {/* TITLE */}
            <h1 className="text-3xl font-bold text-left">{data.title}</h1>

            {/* RELEASE DATE */}
            <p className="text-sm text-white text-left">
              <span>📅</span> {day} {month} {year}
            </p>

            {/* BUTTONS */}
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm flex items-center gap-2">
                Watch Trailer
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#991b1b"
                    className="w-4 h-4"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>

              <button onClick={toggleFavorite} className="w-10 h-10">
                <img
                  src={
                    isFavorite
                      ? "/assets/favorite/heart-filled.svg"
                      : "/assets/favorite/heart-outline.svg"
                  }
                  alt="favorite"
                  className="w-full h-full"
                />
              </button>
            </div>

            {/* INFO BOX */}
            <div className="grid grid-cols-3 gap-6 mt-6">
              {/* RATING */}
              <div className="bg-black border-slate-800 border-2 w-full h-36 p-4 rounded-xl text-center flex flex-col items-center justify-center gap-2">
                <span className="text-xl mb-1">⭐</span>
                <p className="text-sm text-white/70 mb-1">Rating</p>
                <p className="font-semibold">
                  {data.vote_average.toFixed(1)} / 10
                </p>
              </div>

              {/* GENRE */}
              <div className="bg-black border-slate-800 border-2 w-full h-36 p-4 rounded-xl text-center flex flex-col items-center justify-center gap-2">
                <img src="/assets/movieDetail/genre-symbol.svg" alt="Genre" />
                <p className="text-sm text-white/70 mb-1">Genre</p>
                <p className="font-semibold">
                  {data.genres && data.genres.length > 0
                    ? data.genres[0].name
                    : "N/A"}
                </p>
              </div>

              {/* AGE */}
              <div className="bg-black border-slate-800 border-2 w-full h-36 p-4 rounded-xl text-center flex flex-col items-center justify-center gap-2">
                <img src="/assets/movieDetail/age-symbol.svg" alt="Age" />
                <p className="text-sm text-white/70 mb-1">Age Limit</p>
                <p className="font-semibold">{data.age || "13+"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-[32px] font-semibold mb-4 text-left">Overview</h2>
        <p className="text-white/70 leading-7 line-clamp-none md:line-clamp-2 text-left">
          {data.overview}
        </p>
      </main>

      {/* CAST & CREW */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-[32px] font-semibold mb-6 text-left">
          Cast & Crew
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-20 justify-items-start">
          {credits?.cast?.slice(0, 5).map((actor) => (
            <div key={actor.id} className="flex flex-row text-left gap-5">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "/assets/avatar-placeholder.png"
                }
                alt={actor.name}
                className="w-24 h-35 rounded-lg object-cover mb-3"
              />
              <div className="flex flex-col justify-center">
                <p className="text-[16px] font-semibold">{actor.name}</p>
                <p className="text-[16px] text-white/60">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MovieDetail;
