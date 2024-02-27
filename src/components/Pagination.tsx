import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  jokesPerPage: number;
  totalJokes: number;
  next: () => void;
  prev: () => void;
  itemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  jokesPerPage,
  totalJokes,
  next,
  prev,
  itemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalJokes / jokesPerPage);

  return (
    <div className="pagination-container">
      <button className="pagination" onClick={prev} disabled={currentPage === 1}>
        {"<"}
      </button>
      <button className="pagination" onClick={next} disabled={currentPage === totalPages}>
        {">"}
      </button>
      <select id="options" value={jokesPerPage} onChange={itemsPerPageChange}>
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
      </select>
    </div>
  );
};
