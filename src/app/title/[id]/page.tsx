'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Movie } from "@/types/movie";

export default function TitleDetail() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const titleId = params.id as string;

  useEffect(() => {
    async function fetchMovie() {
      if (!titleId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`/api/title/${titleId}`);
        if (!res.ok) {
          throw new Error(`Request failed with ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        setError(`Failed to fetch movie: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    
    fetchMovie();
  }, [titleId]);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto my-8 px-4">
        <div className="text-center text-gray-500">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-4xl mx-auto my-8 px-4">
        <div className="text-red-500">{error}</div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="max-w-4xl mx-auto my-8 px-4">
        <div className="text-gray-500">Movie not found</div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-12 lg:px-0 h-screen flex-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Movie poster */}
        <div className="md:col-span-1">
          {movie.primaryImage?.url && (
            <img
              src={movie.primaryImage.url}
              alt={movie.primaryTitle}
              className="w-full rounded-lg shadow-lg"
            />
          )}
        </div>
        
        {/* Movie details */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{movie.primaryTitle}</h1>
          
          {movie.originalTitle !== movie.primaryTitle && (
            <p className="text-gray-500 text-lg mb-4">
              Original Title: {movie.originalTitle}
            </p>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="font-semibold">Year:</span> {movie.startYear}
            </div>
            <div>
              <span className="font-semibold">Type:</span> {movie.type}
            </div>
            {movie.runtimeSeconds && (
              <div>
                <span className="font-semibold">Runtime:</span> {Math.floor(movie.runtimeSeconds / 60)} minutes
              </div>
            )}
            {movie.rating && (
              <div>
                <span className="font-semibold">Rating:</span> ⭐ {movie.rating.aggregateRating} ({movie.rating.voteCount} votes)
              </div>
            )}
          </div>
          
          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Genres:</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {movie.plot && (
            <div>
              <h3 className="font-semibold mb-2">Plot:</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {movie.plot}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
