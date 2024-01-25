import { useSelector } from "react-redux";
import { useCallback } from "react";
import { setSearchKey, movieAsyncSearch } from "@/redux/movieSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";

export default function Movie() {
  const { movie, loading, error, searchKey } = useSelector(
    (state) => state.omdbapi
  );
  const dispatch = useDispatch();

  const handleInput = useCallback((e) => {
    const movieName = e.target.value;
    dispatch(setSearchKey(movieName));
  }, []);

  const handleSearch = useCallback(() => {
    dispatch(movieAsyncSearch(searchKey));
  }, [searchKey]);

  return (
    <div className="container mx-auto p-4 text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Movie Poster Finder</h1>
      <h2 className="text-xl mb-8 mt-8">
        <i>Search for a movie by name</i>
      </h2>
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded-md max-w-80"
        type="text"
        placeholder="Search Movie"
        onChange={handleInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        class="ms-2 mb-1 select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans 
        text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all 
        hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none 
        active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
        disabled:opacity-50 disabled:shadow-none"
        onClick={handleSearch}
      >
        Search
      </button>

      {loading ? (
        <div className="flex justify-center items-center">
          <Image src={"/loading spinner.gif"} width={250} height={250} />
        </div>
      ) : null}

      {error ? <p className="text-red-500 mt-4">{error}</p> : null}

      {movie?.Error ? (
        <h1 className="text-red-500 mt-4">
          <strong>{movie.Error}</strong>{" "}
        </h1>
      ) : (
        <div>
          {movie?.Title && (
            <div className="mt-4 mx-auto text-center">
              <h1 className="text-3xl font-bold">{movie.Title}</h1>
              <a href={movie.Poster} target="_blank">
                <img
                  className="mt-4 mx-auto"
                  src={movie.Poster}
                  alt="Movie Poster"
                  width={300}
                  height={450}
                />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
