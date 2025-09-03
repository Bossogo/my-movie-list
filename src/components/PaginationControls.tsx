interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
  startIndex: number;
  moviesPerPage: number;
  moviesLength: number;
  hideShowingMessage?: boolean;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  goToPage,
  startIndex,
  moviesPerPage,
  moviesLength,
  hideShowingMessage
}: PaginationControlsProps) => {
  return (
    <>
        {!hideShowingMessage && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4 mt-4">
            <span>
                Showing {startIndex + 1}-{Math.min(startIndex + moviesPerPage, moviesLength)} of {moviesLength} movies
            </span>
            </div>
        )}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors"
        >
          ← Previous
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = currentPage < 3 ? i : currentPage - 2 + i;
            if (pageNum >= totalPages) return null;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-2 py-1 rounded text-sm transition-colors ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {pageNum + 1}
              </button>
            );
          })}
        </div>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors"
        >
          Next →
        </button>
      </div>
      
    </>
  );
};

export default PaginationControls;
