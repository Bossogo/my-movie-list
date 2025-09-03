import { useState } from "react";
import { useRouter } from "next/navigation";
import PaginationControls from "./PaginationControls";

export default function MovieList({ movies }: MovieListProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 8;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const startIndex = currentPage * moviesPerPage;
  const visibleMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  const router = useRouter();

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleMovieClick = (id: string) => {
    router.push(`/title/${id}`);
  };

  return (
    <div>
      {/* Pagination controls at top */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          goToPage={goToPage}
          startIndex={startIndex}
          moviesPerPage={moviesPerPage}
          moviesLength={movies.length}
          hideShowingMessage={true}
        />
      )}

      {/* Movie grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-100 dark:bg-zinc-900 rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleMovieClick(movie.id)}
            tabIndex={0}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleMovieClick(movie.id); }}
            aria-label={`View details for ${movie.primaryTitle}`}
          >
            {movie.primaryImage?.url && (
              <img
                src={movie.primaryImage.url}
                alt={movie.primaryTitle}
                className="w-full rounded mb-3 aspect-[2/3] object-cover"
              />
            )}
            <h2 className="text-xl font-semibold">{movie.primaryTitle}</h2>
            <p className="text-gray-500 dark:text-gray-400">{movie.startYear}</p>
            {movie.genres && (
              <div className="text-xs text-gray-400 mb-1">{movie.genres.join(', ')}</div>
            )}
            {movie.rating && (
              <div className="text-sm text-yellow-600">⭐ {movie.rating.aggregateRating} ({movie.rating.voteCount} votes)</div>
            )}
            {movie.plot && (
              <p className="text-xs text-gray-600 mt-2">{movie.plot}</p>
            )}
          </div>
        ))}
      </div>

      {/* Pagination controls at bottom */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          goToPage={goToPage}
          startIndex={startIndex}
          moviesPerPage={moviesPerPage}
          moviesLength={movies.length}
        />
      )}
    </div>
  );
}
