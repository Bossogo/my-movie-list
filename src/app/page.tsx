'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MovieList from "../components/MovieListPaginated";
import GenreList, { Genre } from "../components/GenreList";
import { Interest, Movie } from "@/types";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const genreId = searchParams.get('genreId');
        let apiUrl;
        if (genreId) {
          apiUrl = `/api/titles/${genreId}`;
        } else {
          apiUrl = "/api/titles";
        }
        
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`Request failed with ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        //alert(JSON.stringify(data, null, 2)); 
        setMovies(data.titles || []);
      } catch (error) {
        setError(`Failed to fetch movies: ${error}`);
      }
    }
    fetchMovies();
  }, [searchParams]);

  useEffect(() => {
    async function fetchInterests() {
      try {
        const res = await fetch("/api/interests");
        if (!res.ok) {
          throw new Error(`Request failed with ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        const genres = data.categories.map((obj: any) => ({
          id: obj.interests[0].id,
          name: obj.category
        }));
        //alert(JSON.stringify(genres, null, 2));
        setInterests(data.categories || []);
        setGenres(genres);
      } catch (error) {
        setError(`Failed to fetch interests: ${error}`);
      }
    }
    fetchInterests();
  }, []);

  return (
    <main className="max-w-7xl mx-auto my-8 px-15">
      <h1 className="text-4xl font-bold mb-6">Movie List</h1>
      {error && <div className="text-red-500">{error}</div>}
      <GenreList genres={genres} />
      <MovieList movies={movies} />
    </main>
  );
}
