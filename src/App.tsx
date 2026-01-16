import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Favorite from "./pages/favorite";
import MovieDetail from "./pages/movieDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
