import type { MovieListProps } from "@/types/movie";

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-100 dark:bg-zinc-900 rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow"
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
  );
}
