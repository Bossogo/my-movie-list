import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface GenreListProps {
  genres: Genre[];
}

export type Genre = {
    id: string;
    name: string;
}

const GenreList: React.FC<GenreListProps> = ({ genres }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Responsive items per page
  useEffect(() => {
    function updateItemsPerPage() {
      if (window.innerWidth < 640) setItemsPerPage(3); // mobile
      else if (window.innerWidth < 768) setItemsPerPage(4); // sm
      else if (window.innerWidth < 1024) setItemsPerPage(7); // md
      else setItemsPerPage(11); // lg and up
    }
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const currentGenreId = searchParams.get('genreId');
  const totalPages = Math.ceil(genres.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleGenres = genres.slice(startIndex, startIndex + itemsPerPage);

  const handleGenreClick = (genreId: string) => {
    if (currentGenreId === genreId) {
      // If same genre is clicked, clear the filter
      router.push('/');
    } else {
      // Navigate to the genre
      router.push(`/?genreId=${genreId}`);
    }
    setIsDropdownOpen(false);
  };

  const handleAllClick = () => {
    router.push('/');
    setIsDropdownOpen(false);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Genres</h2>
      <div className="flex flex-wrap items-center gap-2">
        {/* All genres button */}
        <button
          onClick={handleAllClick}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            !currentGenreId 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          All
        </button>
        
        {/* Visible genre buttons */}
        {visibleGenres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              currentGenreId === genre.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {genre.name}
          </button>
        ))}
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              className="px-2 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
            >
              ←
            </button>
            <span className="text-sm text-gray-600">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              className="px-2 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreList;
