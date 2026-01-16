import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5 text-white/70"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⌨️ SEARCH SAAT ENTER SAJA
  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/?q=${encodeURIComponent(search.trim())}`);
      setShowSearch(false);
    }
  };

  // ❌ CLEAR SEARCH
  const clearSearch = () => {
    setSearch("");
    navigate("/");
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-300
          ${
            isScrolled
              ? "backdrop-blur-md bg-black/60 shadow-lg"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 py-4">
          {/* LEFT */}
          <div className="flex items-center gap-24">
            <img src="/assets/home/logo-movie.svg" alt="Logo Movie" />

            <ul className="hidden md:flex items-center gap-10 text-white/80">
              <li>
                <Link to="/" className="hover:text-red-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favorite" className="hover:text-red-500">
                  Favorite
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* DESKTOP SEARCH */}
            <div className="relative hidden md:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </span>

              <input
                type="text"
                placeholder="Search Movie"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleEnterSearch}
                className="
                  rounded-xl bg-black/40
                  pl-10 pr-10 py-3
                  text-sm text-white placeholder:text-white/50
                  outline-none
                "
              />

              {search && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* MOBILE SEARCH ICON */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden text-white"
            >
              <SearchIcon />
            </button>

            {/* BURGER */}
            <button
              onClick={() => setShowMenu(true)}
              className="md:hidden text-white text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH INPUT */}
        <div
          className={`
            md:hidden px-5
            transition-all duration-300 overflow-hidden
            ${showSearch ? "max-h-20 py-3" : "max-h-0"}
          `}
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </span>

            <input
              type="text"
              placeholder="Search Movie"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleEnterSearch}
              className="
                w-full rounded-xl
                bg-black/60
                pl-10 pr-10 py-3
                text-sm text-white placeholder:text-white/50
                outline-none
              "
            />

            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      {showMenu && (
        <div className="fixed inset-0 z-999 bg-black text-white md:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <img src="/assets/home/logo-movie.svg" alt="Logo" />
            <button onClick={() => setShowMenu(false)} className="text-2xl">
              ✕
            </button>
          </div>

          <ul className="flex flex-col gap-8 px-5 py-10 text-lg">
            <li onClick={() => setShowMenu(false)}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => setShowMenu(false)}>
              <Link to="/favorite">Favorite</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
