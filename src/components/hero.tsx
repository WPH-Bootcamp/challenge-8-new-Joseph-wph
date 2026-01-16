interface HeroProps {
  data: {
    title: string;
    overview: string;
  };
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="relative">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-40 text-white mt-72">
        {/* TITLE */}
        <h1 className="mb-7 text-5xl font-bold text-left">{data.title}</h1>

        {/* OVERVIEW */}
        <p className="mb-14 max-w-160 text-white/70 text-left leading-8">
          {data.overview}
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* WATCH TRAILER */}
          <button
            className="flex items-center justify-center gap-3
                             bg-black border border-slate-600
                             px-6 md:px-10 py-3
                             rounded-full
                             hover:bg-[#961200]
                             transition"
          >
            <span>Watch Trailer</span>
            <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#961200"
                className="w-5 h-5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>

          {/* SEE DETAIL */}
          <button
            className="bg-black border border-slate-600
                             px-6 md:px-10 py-3
                             rounded-full
                             hover:bg-[#961200]
                             transition"
          >
            See Detail
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
